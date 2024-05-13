from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from datetime import datetime, timedelta
from .utils import *
import threading
import pandas as pd
from django.db import transaction
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Paragraph
from textwrap import wrap


class Questionnaire(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

    outro_title = models.CharField(max_length=255, null=True, blank=True)
    outro_text = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title

    def export_responses_to_csv(self, from_date, to_date, response_status):
        responses = Response.objects.filter(questionnaire=self)
        if response_status != 'all':
            responses = responses.filter(status=response_status)

        from_date = datetime.strptime(
            from_date, '%d-%m-%Y').strftime("%Y-%m-%d %H:%M:%S%z")
        to_date = datetime.strptime(to_date, '%d-%m-%Y')
        to_date += timedelta(days=1)
        to_date = to_date.strftime("%Y-%m-%d %H:%M:%S%z")
        responses = responses.filter(submission_date__range=[
            from_date, to_date]).order_by('-submission_date')
        if not responses:
            return None

        active_questions = (
            Question.objects.filter(questionnaire=self, active=True)
                .order_by('position')
                .values_list('text', flat=True)
        )
        active_questions = [
                               'Last Edited (UTC)', 'Status'] + list(active_questions)
        response_data = []
        response_data.append(active_questions + ['Total Score'])

        for response in responses:
            response_row = []
            response_row.append(
                response.last_edited.strftime('%Y-%m-%d %H:%M'))
            response_row.append(response.status.capitalize())
            # Skip 'last_edited' and 'status' for other questions
            for question in active_questions[2:]:
                answer = (Answer.objects.filter(
                    response=response, question__text=question).first())
                response_row.append(answer.get_value if answer else 'NaN')
            response_row.append(response.get_score)
            response_data.append(response_row)

        df = pd.DataFrame(response_data)
        export_filename = f'{self.title}_responses.csv'
        df.to_csv(export_filename, index=False, header=False)
        return export_filename

    def get_responses_stats(self):
        responses = Response.objects.filter(questionnaire=self)
        questions = Question.objects.filter(questionnaire=self, active=True, type__in=[
            'multiple_choice', 'multiple_select']).order_by('position')
        question_categories = QuestionCategory.objects.filter(active=True)

        response_stats = []

        for question in questions:
            if question.type in ['multiple_choice', 'multiple_select']:
                question_category_name = question.question_category.name if question.question_category else ''
                question_data = {
                    'question_type': question.type,
                    'question_category': question_category_name,
                    'question_id': question.id,
                    'question_text': question.text,
                    'response_counts': {},
                }
                response_stats.append(question_data)

        for response in responses:
            for question_data in response_stats:
                question_id = question_data['question_id']
                question = Question.objects.get(pk=question_id)
                options = Option.objects.filter(question=question)
                for option in options:
                    option_text = option.text
                    question_data['response_counts'][option_text] = 0

        for response in responses:
            for question_data in response_stats:
                question_id = question_data['question_id']
                answer = Answer.objects.filter(
                    response=response, question_id=question_id).first()
                if answer and answer.option and answer.question.type == 'multiple_choice':
                    option_text = answer.option.text
                    question_data['response_counts'][option_text] += 1
                elif answer and answer.options and answer.question.type == 'multiple_select':
                    for option in answer.options.all():
                        option_text = option.text
                        question_data['response_counts'][option_text] += 1

        return response_stats


class QuestionCategory(models.Model):
    name = models.CharField(max_length=255)
    active = models.BooleanField(default=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

    @property
    def total_questions_in_category(self):
        return Question.objects.filter(questionnaire=self.questionnaire, active=True).count()


class Question(models.Model):
    TYPE_CHOICES = [
        ('multiple_choice', 'multiple_choice'),
        ('multiple_select', 'multiple_select'),
        ('open_ended', 'open_ended'),
        ('file', 'file'),
        ('email', 'email'),
        ('phone', 'phone'),
        ('text', 'text'),
    ]

    text = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE)
    question_category = models.ForeignKey(
        QuestionCategory, on_delete=models.CASCADE, null=True, blank=True)
    position = models.IntegerField(blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    active = models.BooleanField(default=True)

    weight = models.FloatField(
        validators=[
            MinValueValidator(
                0.0, message='Value must be greater than or equal to 0.0'),
            MaxValueValidator(
                100.0, message='Value must be less than or equal to 100.0')
        ],
        default=0.0
    )

    def __str__(self):
        return str(self.questionnaire) + ' --- ' + str(self.position) + '. ' + self.text

    @property
    def total_questions_in_questionnaire(self):
        return Question.objects.filter(questionnaire=self.questionnaire, active=True).count()


class Option(models.Model):
    text = models.CharField(max_length=255)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    weight = models.FloatField(
        validators=[
            MinValueValidator(
                0.0, message='Value must be greater than or equal to 0.0'),
            MaxValueValidator(
                100.0, message='Value must be less than or equal to 100.0')
        ],
        default=0.0
    )
    goto = models.IntegerField(
        validators=[MinValueValidator(-1)],
        help_text="Enter a value of -1 or greater.",
        default=-1
    )

    def __str__(self):
        return str(self.question) + ' --- ' + self.text


class Response(models.Model):
    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('pending', 'Pending'),
        ('abandoned', 'Abandoned'),
    ]

    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE)
    submission_date = models.DateTimeField(auto_now_add=True)
    cookie_id = models.CharField(max_length=50, unique=True, blank=True, null=True)
    # To be used after the cookie_id is deprecated for retrieving responses only
    old_cookie_id = models.CharField(max_length=50, unique=True, blank=True, null=True)
    last_edited = models.DateTimeField(default=timezone.now)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='pending')
    start_date = models.DateTimeField(default=timezone.now)
    email = models.EmailField(null=True, blank=True)
    completion_mail_sent = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id) + '  ' + str(self.questionnaire)

    @property
    def is_complete(self):
        questionnaire_questions = [
            q.id for q in self.questionnaire.question_set.filter(active=True)]
        answered_questions = [
            i for i in self.answer_set.values_list('question', flat=True)]
        return set(answered_questions) == set(questionnaire_questions)

    @property
    def is_abandoned(self):
        if self.is_complete:
            return False
        time_difference = timezone.now() - self.start_date
        days_passed = time_difference.days
        return days_passed >= 7

    @property
    def get_answer_name(self):
        answer = self.answer_set.all().first()
        if answer and answer.small_text != None:
            return answer.get_value
        return 'unknown'

    @property
    def get_user_email(self):
        if self.email:
            return self.email
        answer = self.answer_set.filter(question__type='email').first()
        if answer and answer.email_answer != None:
            answer = [answer for answer in self.answer_set.filter(
                question__type='email')][0]
            return answer.email_answer
        return 'unknown'

    @property
    def get_status(self):
        self.update_status()
        return self.status

    def send_completion_email(self):
        try:
            if self.completion_mail_sent != True:
                send_form_completion_email(
                    recipient_email=self.get_user_email, subject='FRISCO Demo Form Completion')
                self.completion_mail_sent = True
                self.save()
            else:
                print('completion email has already been sent')
        except:
            print('no email given')

    def update_status(self):
        if self.is_complete or self.status == 'completed':
            self.status = 'completed'
            if not self.completion_mail_sent:
                email_thread = threading.Thread(
                    target=self.send_completion_email)
                email_thread.start()

        elif self.is_abandoned:
            self.status = 'abandoned'
        else:
            self.status = 'pending'
        self.save()

    @property
    def get_score(self):
        answers = self.answer_set.filter(skipped=False)
        score = 0
        for i in answers:
            if i.question.type != 'multiple_choice' and i.question.type != 'multiple_select':
                score += i.question.weight
            elif i.question.type == 'multiple_choice':
                score += i.option.weight
            elif i.question.type == 'multiple_select':
                score += sum([o.weight for o in i.options.all()])

        return score

    def get_csv(self):
        question_answers = (
            Answer.objects.filter(response=self, skipped=False)
                .select_related('question')
                .order_by('question__position')
        )
        response_data = []
        for answer in question_answers:
            if answer.question.type == 'multiple_choice':
                response_data.append(
                    [answer.question.question_category, answer.question.text, answer.get_value, answer.option.weight])
            elif answer.question.type == 'multiple_select':
                response_data.append([answer.question.question_category, answer.question.text, answer.get_value,
                                      sum([o.weight for o in answer.options.all()])])
            else:
                # TO BE ADDED: handle other question types
                pass

        columns = ["Category", "Question", "Answer", "Score"]
        df = pd.DataFrame(response_data, columns=columns)
        last_row = pd.DataFrame([["", "", "Total Score", self.get_score]], columns=columns)
        df = pd.concat([df, last_row], ignore_index=True)

        export_filename = f'{self.id}_response_data.csv'
        df.to_csv(export_filename, index=False)
        return export_filename

    def get_pdf(self):
        from io import BytesIO

        # Create a BytesIO buffer to store the PDF content
        buffer = BytesIO()

        # Create a PDF document with letter size and portrait orientation
        pdf = canvas.Canvas(buffer, pagesize=letter)

        y_position = 750
        available_space = 700
        max_width = 405

        # Add content to the PDF using Paragraph for better text wrapping
        styles = getSampleStyleSheet()
        normal_style = styles['Normal']
        question_style = ParagraphStyle(
            'QuestionStyle',
            parent=normal_style,
            spaceAfter=10,
            fontSize=12,
        )

        # Add questions and answers to the PDF in order
        question_answers = (
            Answer.objects.filter(response=self, skipped=False)
                .select_related('question')
                .order_by('question__position')
        )
        last_question_height, last_answer_height = 0, 0

        for answer in question_answers:

            # Truncate the text to fit within the maximum width
            question_text = answer.question.text
            answer_text = answer.get_value

            # Wrap the text to avoid overflow
            wrapped_question_text = "\n".join(wrap(question_text, 80))
            wrapped_answer_text = "\n".join(wrap(answer_text, 80))

            # Add the wrapped text to the PDF using Paragraph
            question_paragraph = Paragraph(f"Question: {wrapped_question_text}", question_style)
            answer_paragraph = Paragraph(f"Answer: {wrapped_answer_text}", normal_style)

            # Draw the paragraphs to the canvas
            question_paragraph.wrapOn(pdf, max_width, available_space)
            answer_paragraph.wrapOn(pdf, max_width, available_space)

            # Check if there's enough space for the current question-answer pair
            if y_position <= question_paragraph.height + answer_paragraph.height + 20:
                pdf.showPage()  # Start a new page
                y_position = 720
                # Reset Y position for the new page

            question_paragraph.drawOn(pdf, 100, y_position)
            answer_paragraph.drawOn(pdf, 100, y_position - 10 - answer_paragraph.height)

            y_position -= (question_paragraph.height + answer_paragraph.height) * 2

        # Add more content based on your requirements

        # Save the PDF to the buffer
        pdf.save()

        # Set the buffer position to the beginning
        buffer.seek(0)

        # Save the PDF to a file
        export_filename = f'{self.id}_response_data.pdf'
        with open(export_filename, 'wb') as pdf_file:
            pdf_file.write(buffer.read())

        return export_filename


class Answer(models.Model):
    response = models.ForeignKey(Response, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    option = models.ForeignKey(
        Option, on_delete=models.CASCADE, null=True, blank=True)
    text = models.TextField(null=True, blank=True)
    file_upload = models.FileField(
        upload_to='question_files/', null=True, blank=True)
    email_answer = models.EmailField(null=True, blank=True)
    small_text = models.TextField(null=True, blank=True, max_length=50)

    options = models.ManyToManyField(
        Option, related_name='options', blank=True)

    phone_answer = models.CharField(
        max_length=15,
        null=True,
        blank=True,
        validators=[
            RegexValidator(
                regex=r'^\+?\d{1,15}$',
                message='Enter a valid phone number.',
            ),
        ],
    )

    skipped = models.BooleanField(default=False)

    def __str__(self):
        return str(self.response) + str(self.question) + ' ' + str(self.question.type)

    def save_with_update(self, options=None, *args, **kwargs, ):
        existing_answer = Answer.objects.filter(
            question=self.question, response=self.response,
            response__questionnaire=self.response.questionnaire, ).first()

        with transaction.atomic():
            if existing_answer:
                existing_answer.delete()

            self.options.clear()
            if options is not None:
                self.options.set(options)

            super(Answer, self).save(*args, **kwargs)

        super(Answer, self).save(*args, **kwargs)
        self.response.last_edited = timezone.now()
        self.response.update_status()

    @property
    def get_value(self):
        if self.question.type == 'multiple_choice':
            return self.option.text
        elif self.text:
            return self.text
        elif self.file_upload:
            return self.file_upload.url
        elif self.email_answer:
            return self.email_answer
        elif self.phone_answer:
            return self.phone_answer
        elif self.small_text:
            return self.small_text
        elif self.question.type == 'multiple_select':
            return ';'.join([option.text for option in self.options.all()])
        return None
