from rest_framework import serializers
from .models import *


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'


class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ['title', 'description', 'outro_title', 'outro_text']


class QuestionCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionCategory
        fields = ['id', 'name', 'active']


class QuestionSerializer(serializers.ModelSerializer):
    question_position = serializers.IntegerField(source='position')
    questionnaire_id = serializers.IntegerField(source='questionnaire.id')
    id = serializers.IntegerField()
    active = serializers.BooleanField()
    question_category_title = serializers.CharField(source='question_category.name', read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question_position', 'text', 'type', 'weight', 'description', 'questionnaire_id', 'active',
                  'question_category_title']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.type == 'multiple_choice' or instance.type == 'multiple_select':
            options = instance.option_set.all()
            representation['options'] = [{'title': option.text, 'goto': option.goto, 'weight': option.weight} for option
                                         in options]
        else:
            representation['options'] = []

        return representation


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['question', 'text', 'id']


class ResponseSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    user_email = serializers.SerializerMethodField()
    q_answered = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    last_edited = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()

    class Meta:
        model = Response
        fields = ['id', 'user_name', 'score', 'q_answered', 'user_email', 'status', 'last_edited', 'questionnaire',
                  'submission_date']

    def get_user_name(self, obj):
        return obj.get_answer_name

    def get_user_email(self, obj):
        return obj.get_user_email

    def get_status(self, obj):
        return obj.get_status

    def get_last_edited(self, obj):
        return obj.last_edited.strftime("%H:%M %d/%m/%Y")

    def get_q_answered(self, obj):
        return len(obj.answer_set.all())

    def get_score(self, obj):
        return obj.get_score
