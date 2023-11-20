from django.contrib import admin
from .models import *

admin.site.register(Questionnaire)
admin.site.register(QuestionCategory)
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(Response)
admin.site.register(Answer)
