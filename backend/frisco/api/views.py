from rest_framework.views import APIView
from rest_framework.response import Response as RestResponse
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models import Count, Avg, Sum
from django.db.models.functions import ExtractDay
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from datetime import datetime, timedelta
from django.core.files.base import ContentFile
from django.http import FileResponse
from rest_framework import status
from django.utils import timezone
from .models import *
from .serializers import *
from .utils import *
import numpy as np


class QuestionnaireByTitleView(APIView):
    def get(self, request, questionnaire_id):
        questionnaire = Questionnaire.objects.filter(id=questionnaire_id).first()
        if questionnaire:
            serializer = QuestionnaireSerializer(questionnaire)
            return JsonResponse(serializer.data)
        return RestResponse(status=status.HTTP_404_NOT_FOUND)


class QuestionDetailView(APIView):
    def get(self, request, questionnaire_id, responseId):

        print(responseId)
        try:
            response = Response.objects.get(questionnaire_id=questionnaire_id, cookie_id=responseId)
        except Response.DoesNotExist:
            response = Response.objects.create(questionnaire_id=questionnaire_id, old_cookie_id=responseId,
                                               cookie_id=responseId)
        answers = Answer.objects.filter(response=response)

        response_data = {}

        if answers:
            response_data["last_answer_id"] = answers.last().id

        unanswered_question = Question.objects.filter(questionnaire_id=questionnaire_id, active=True).exclude(
            answer__response=response).order_by('position').first()

        if unanswered_question:
            response_data.update({
                "question_id": unanswered_question.id,
                "question_text": unanswered_question.text,
                "question_type": unanswered_question.type,
                "question_position": unanswered_question.position,
                "total_questions_in_questionnaire": unanswered_question.total_questions_in_questionnaire,
                "question_category": unanswered_question.question_category.name if unanswered_question.question_category else None,
                "description": unanswered_question.description if unanswered_question.description else "",
                "options": [],
            })

            if unanswered_question.type == 'multiple_choice' or unanswered_question.type == 'multiple_select':
                options = unanswered_question.option_set.all()
                response_data["options"] = [{"id": option.id, "text": option.text} for option in options]

            return JsonResponse(response_data, status=status.HTTP_200_OK)
        else:
            return JsonResponse({"end": "true"}, status=status.HTTP_200_OK)


class AnswerCreateView(APIView):
    def post(self, request, cookie_id, question_id):
        try:
            response = Response.objects.get(cookie_id=cookie_id)
        except Response.DoesNotExist:
            return JsonResponse({"message": "Response not found"}, status=status.HTTP_404_NOT_FOUND)

        question = get_object_or_404(Question, id=question_id, questionnaire=response.questionnaire)
        answer, created = Answer.objects.get_or_create(response=response, question=question)

        if question.type == 'multiple_choice':
            option_id = request.data.get('option_id')
            if option_id is not None:
                option = get_object_or_404(Option, id=option_id, question=question)
                answered_option_goto = option.goto
                answer.option = option
                answer.save_with_update()

                if answered_option_goto != -1:
                    skipped_questions = Question.objects.filter(
                        questionnaire=response.questionnaire,
                        active=True,
                        position__gte=question.position,
                        position__lt=answered_option_goto
                    )
                    if skipped_questions.exists():
                        skipped_answers = []
                        existing_skipped_answers = Answer.objects.filter(response=response,
                                                                         question__in=skipped_questions)
                        existing_skipped_questions = set(
                            existing_skipped_answer.question for existing_skipped_answer in existing_skipped_answers)

                        for skipped_question in skipped_questions:
                            if skipped_question not in existing_skipped_questions:
                                skipped_answers.append(
                                    Answer(response=response, question=skipped_question, skipped=True))

                        Answer.objects.bulk_create(skipped_answers)

                        for existing_skipped_answer in existing_skipped_answers:
                            existing_skipped_answer.skipped = True
                        Answer.objects.bulk_update(existing_skipped_answers, ['skipped'])

        elif question.type == 'multiple_select':
            selected_options = request.data.get('selected_options')
            if selected_options is not None:
                option_ids = [int(option_id) for option_id in selected_options.split(',')]
                options = Option.objects.filter(id__in=option_ids, question=question)
                answer.save_with_update(options=options)
        elif question.type == 'open_ended':
            text = request.data.get('text')
            if text is not None:
                answer.text = text
                answer.save_with_update()
        elif question.type == 'email':
            email = request.data.get('email')
            if email is not None:
                answer.email_answer = email
                answer.save_with_update()
        elif question.type == 'file':
            ans_file = request.data.get('file')
            if ans_file is not None:
                content_file = ContentFile(ans_file.read())
                answer.file_upload.save(ans_file.name, content_file, save=True)
                answer.save_with_update()
        elif question.type == 'phone':
            phone = request.data.get('phone')
            if phone is not None:
                answer.phone_answer = phone
                answer.save_with_update()
        elif question.type == 'text':
            small_text = request.data.get('small_text')
            if small_text is not None:
                answer.small_text = small_text
                answer.save_with_update()
        serialized_answer = AnswerSerializer(answer)
        return JsonResponse({"message": "Answer created/updated successfully", "answer": serialized_answer.data},
                            status=status.HTTP_201_CREATED)


class AnswerDeleteView(APIView):
    def delete(self, request, answer_id):
        answer = get_object_or_404(Answer, pk=answer_id)
        was_skipped = answer.skipped
        answer.delete()
        if was_skipped:
            while True:
                last_answer = Answer.objects.filter(response=answer.response).last()
                if last_answer and last_answer.skipped:
                    last_answer.delete()
                else:
                    break

        return JsonResponse({"message": "Answer deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class AllResponsesView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        from_date = kwargs.get('from_date')
        to_date = kwargs.get('to_date')
        if from_date is None or to_date is None:
            responses = Response.objects.all().order_by('-start_date')
        else:
            from datetime import datetime
            date_format = "%d-%m-%Y"
            from_date = datetime.strptime(from_date, date_format)
            to_date = datetime.strptime(to_date, date_format)
            to_date += timedelta(days=1)
            responses = Response.objects.filter(
                last_edited__gte=from_date,
                last_edited__lte=to_date
            ).order_by('-start_date')
        # responses = [response for response in responses if not (response.get_answer_name == 'unknown' and response.get_user_email == 'unknown')]
        serializer = ResponseSerializer(responses, many=True)
        return RestResponse(serializer.data, status=status.HTTP_200_OK)


class QuestionListByQuestionnaireView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, questionnaire_id):
        try:
            questionnaire = Questionnaire.objects.all().first()
        except Questionnaire.DoesNotExist:
            return Response({"message": "Questionnaire not found"}, status=status.HTTP_404_NOT_FOUND)

        questions = Question.objects.filter(questionnaire=questionnaire, active=True).order_by('position')
        serializer = QuestionSerializer(questions, many=True)
        return RestResponse(serializer.data, status=status.HTTP_200_OK)


class DeactivateQuestionView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, question_id):
        question = get_object_or_404(Question, pk=question_id)
        question.active = False
        question.save()

        return RestResponse({'message': 'Question deactivated successfully'}, status=status.HTTP_200_OK)


class CreateQuestionView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            quesitonnaire = Questionnaire.objects.all().first()
            if request.data.get('category') == '':
                qcat = None
            else:
                qcat = QuestionCategory.objects.get(id=int(request.data.get('category')))
            new_question = Question.objects.create(questionnaire=quesitonnaire, question_category=qcat,
                                                   text=request.data.get('text'),
                                                   description=request.data.get('description'),
                                                   weight=float(request.data.get('weight')),
                                                   type=request.data.get('type'), position=request.data.get('position'))
            new_question.save()
            if request.data['options'] and (
                    request.data.get('type') == 'multiple_choice' or request.data.get('type') == 'multiple_select'):
                for option in request.data['options']:
                    op = Option.objects.create(question=new_question, text=option['title'], goto=int(option['goto']),
                                               weight=float(option['weight']))
                    op.save()
            return RestResponse(status=status.HTTP_201_CREATED)
        except:
            return RestResponse(status=status.HTTP_400_BAD_REQUEST)


class getAllQuestionCategories(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        categories = QuestionCategory.objects.filter(active=True)
        serializer = QuestionCategorySerializer(categories, many=True)
        return RestResponse(serializer.data, status=status.HTTP_200_OK)


class deactivateQuestionCategory(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, category_id):
        category = get_object_or_404(QuestionCategory, pk=category_id)
        category.active = False
        category.save()
        return RestResponse({'message': 'Question category deactivated successfully'}, status=status.HTTP_200_OK)


class CreateQuestionCategory(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            new_category = QuestionCategory.objects.create(name=request.data.get('title'),
                                                           description=request.data.get('description'))
            new_category.save()
            return RestResponse(status=status.HTTP_201_CREATED)
        except:
            return RestResponse(status=status.HTTP_400_BAD_REQUEST)


class UpdateQuestion(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # try:

        question = Question.objects.get(id=int(request.data.get('question_id')))
        if request.data.get('category'):
            question.question_category = QuestionCategory.objects.get(name=request.data.get('category'), active=True)
        question.position = int(request.data.get('position'))
        question.text = request.data.get('text')
        question.weight = float(request.data.get('weight'))
        question.description = request.data.get('description')

        if question.type != request.data.get(
                'type') or question.type == 'multiple_choice' or question.type == 'multiple_select':
            question.type = request.data.get('type')
            question.option_set.all().delete()
            if request.data['options']:
                for option in request.data['options']:
                    op = Option.objects.create(question=question, text=option['title'], goto=int(option['goto']),
                                               weight=float(option['weight']))
                    op.save()
        question.save()

        return RestResponse(status=status.HTTP_201_CREATED)
        # except:
        #     return RestResponse(status=status.HTTP_400_BAD_REQUEST)


class GetQuestionnaireInfo(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        questionnaire = Questionnaire.objects.all().first()
        serializer = QuestionnaireSerializer(questionnaire)
        return RestResponse(serializer.data, status=status.HTTP_200_OK)


class UpdateQuestionnaireTitle(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            questionnaire = Questionnaire.objects.all().first()
            questionnaire.title = request.data.get('title')
            questionnaire.save()
            return RestResponse(status=status.HTTP_201_CREATED)
        except:
            return RestResponse(status=status.HTTP_400_BAD_REQUEST)


class UpdateQuestionnaireOutroTitle(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            questionnaire = Questionnaire.objects.all().first()
            questionnaire.outro_title = request.data.get('title')
            questionnaire.save()
            return RestResponse(status=status.HTTP_201_CREATED)
        except:
            return RestResponse(status=status.HTTP_400_BAD_REQUEST)


class UpdateQuestionnaireDesc(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            questionnaire = Questionnaire.objects.all().first()
            questionnaire.description = request.data.get('desc')
            questionnaire.save()
            return RestResponse(status=status.HTTP_201_CREATED)
        except:
            return RestResponse(status=status.HTTP_400_BAD_REQUEST)


class UpdateQuestionnaireOutroDesc(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            questionnaire = Questionnaire.objects.all().first()
            questionnaire.outro_text = request.data.get('desc')
            questionnaire.save()
            return RestResponse(status=status.HTTP_201_CREATED)
        except:
            return RestResponse(status=status.HTTP_400_BAD_REQUEST)


class ExportResponsesAPIView(APIView):
    """
        Exports all responses in date range
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, from_date, to_date, response_status):

        try:
            questionnaire = Questionnaire.objects.all().first()
        except Questionnaire.DoesNotExist:
            return Response(
                {"error": "Questionnaire not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        export_filename = questionnaire.export_responses_to_csv(from_date, to_date, response_status)

        if export_filename:
            response = FileResponse(open(export_filename, 'rb'))
            response['Content-Disposition'] = f'attachment; filename="{export_filename}"'
            return response

        return RestResponse({"error": "No responses to export"}, status=status.HTTP_404_NOT_FOUND)


class DownloadResponse(APIView):
    """
        Exports a single response
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, res_id):
        try:
            response = Response.objects.get(id=int(res_id))
            export_filename = response.get_csv()
            if export_filename:
                response = FileResponse(open(export_filename, 'rb'))
                response['Content-Disposition'] = f'attachment; filename="{export_filename}"'
                return response
        except Response.DoesNotExist:
            return RestResponse({"error": "Response not found"}, status=status.HTTP_404_NOT_FOUND)


class GetUserInfo(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user:
            user_data = {
                "id": user.id,
                "username": user.username,
                "fullname": user.first_name + ' ' + user.last_name,
                "email": user.email,
                "status": "Admin" if user.is_superuser else ("Staff" if user.is_staff else "Active"),
            }
            return JsonResponse(user_data, status=status.HTTP_200_OK)
        return RestResponse(status=status.HTTP_404_NOT_FOUND)


class GetQuestionnaireAnswerStats(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        questionnaire = Questionnaire.objects.all().first()
        if questionnaire:
            stats = questionnaire.get_responses_stats()
            return RestResponse(stats, status=status.HTTP_200_OK)
        return RestResponse(status=status.HTTP_404_NOT_FOUND)


class CheckLoginStatus(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return RestResponse(status=status.HTTP_200_OK)


class GetBasicStats(APIView):
    """
        Returns
            - Total number of responses per day in this month
            - Average score
        Requires
            - JWT token
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            current_month = datetime.now().month
            current_year = datetime.now().year
            all_days = get_days_in_month(current_year, current_month)

            relevant_responses = Response.objects.filter(
                submission_date__month=current_month,
                submission_date__year=current_year
            )

            grouped_responses_by_day = relevant_responses.values('submission_date__day').annotate(count=Count('id'))

            response_counts = {day: 0 for day in all_days}

            for response in grouped_responses_by_day:
                day = response['submission_date__day']
                count = response['count']
                response_counts[day] = count

            total_responses = relevant_responses.count()

            try:
                average_score = round(np.average([response.get_score for response in relevant_responses]), 2)
            except:
                average_score = 0
            data = {
                'current_year': current_year,
                'current_month': get_month_name(current_month),
                'total_responses': total_responses,
                'responses_per_day': response_counts,
                'average_score': average_score,
            }
            return RestResponse(data, status=status.HTTP_200_OK)

        except:
            return RestResponse(status=status.HTTP_404_NOT_FOUND)


class SetQuestionnaireEmail(APIView):
    def post(self, request, cookie_id, *args, **kwargs):
        try:
            response = Response.objects.get(old_cookie_id=cookie_id)
            response.email = request.data.get('email')
            response.save()
            return RestResponse(status=status.HTTP_201_CREATED)
        except:
            return RestResponse(status=status.HTTP_400_BAD_REQUEST)


class ResponderDownloadResponse(APIView):
    def get(self, request, cookie_id):
        try:
            response = Response.objects.get(old_cookie_id=cookie_id)
            export_filename = response.get_csv()
            if export_filename:
                response = FileResponse(open(export_filename, 'rb'))
                response['Content-Disposition'] = f'attachment; filename="{export_filename}"'
                return response
        except Response.DoesNotExist:
            return RestResponse({"error": "Response not found"}, status=status.HTTP_404_NOT_FOUND)


class ResponderDownloadPdf(APIView):
    def get(self, request, cookie_id):
        try:
            response = Response.objects.get(old_cookie_id=cookie_id)
            export_filename = response.get_pdf()
            if export_filename:
                response = FileResponse(open(export_filename, 'rb'))
                response['Content-Disposition'] = f'attachment; filename="{export_filename}"'
                return response
        except Response.DoesNotExist:
            return RestResponse({"error": "Response not found"}, status=status.HTTP_404_NOT_FOUND)


class ResponderResponseScore(APIView):
    def get(self, request, response_id):
        try:
            response = Response.objects.get(old_cookie_id=response_id)
            return RestResponse({"score": response.get_score}, status=status.HTTP_200_OK)
        except Response.DoesNotExist:
            return RestResponse({"error": "Response not found"}, status=status.HTTP_404_NOT_FOUND)
