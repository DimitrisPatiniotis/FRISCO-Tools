from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    
    # POST
    path('answer/<str:cookie_id>/<int:question_id>/', AnswerCreateView.as_view(), name='answer_create'),
    path('answer/<int:answer_id>/', AnswerDeleteView.as_view(), name='answer_delete'),
    path('question/deactivate/<int:question_id>/', DeactivateQuestionView.as_view(), name='deactivate_question'),
    path('questions/create/', CreateQuestionView.as_view(), name='create_question'),
    path('question_category/deactivate/<int:category_id>/', deactivateQuestionCategory.as_view(), name='deactivate_question_category'),
    path('question_categories/create/', CreateQuestionCategory.as_view(), name='create_question_category'),
    path('update_question/', UpdateQuestion.as_view(), name='update_question'),
    path('update_questionnaire_title/', UpdateQuestionnaireTitle.as_view(), name='update_questionnaire_title'),
    path('update_questionnaire_outro_title/', UpdateQuestionnaireOutroTitle.as_view(), name='update_questionnaire_title'),
    path('update_questionnaire_desc/', UpdateQuestionnaireDesc.as_view(), name='update_questionnaire_desc'),
    path('update_questionnaire_outro_desc/', UpdateQuestionnaireOutroDesc.as_view(), name='update_questionnaire_desc'),
    path('set_response_email/<str:cookie_id>/email/', SetQuestionnaireEmail.as_view(), name='post_questionnaire_email'),

    # GET
    path('questionnaire/<int:questionnaire_id>/', QuestionnaireByTitleView.as_view(), name='questionnaire_by_title'),
    path('questionnaire/<int:questionnaire_id>/<path:responseId>/questions/', QuestionDetailView.as_view(), name='question_detail'),
    path('questionnaire/<int:questionnaire_id>/questions/', QuestionListByQuestionnaireView.as_view(), name='question_list_by_questionnaire'),
    path('all_responses/', AllResponsesView.as_view(), name='all_responses'),
    path('all_responses/<str:from_date>/<str:to_date>/', AllResponsesView.as_view(), name='all_responses_date_range'),
    path('get_all_question_categories/', getAllQuestionCategories.as_view(), name='all_question_categories'),
    path('get_questionnaire_info/', GetQuestionnaireInfo.as_view(), name='get_questionnaire_info'),
    path('get_user_info/', GetUserInfo.as_view(), name='get_user_info'),
    path('export_responses/<str:from_date>/<str:to_date>/<str:response_status>/', ExportResponsesAPIView.as_view(), name='export_responses'),
    path('get_questionnaire_answer_stats/', GetQuestionnaireAnswerStats.as_view(), name='get_questionnaire_answer_stats'),
    path('get_basic_admin_stats/', GetBasicStats.as_view(), name='get_basic_admin_stats'),
    path('download_response/<int:res_id>/', DownloadResponse.as_view(), name='download_response'),
    path('user_download_response/<str:cookie_id>/', ResponderDownloadResponse.as_view(), name='user_download_response'),
    path('user_download_pdf/<str:cookie_id>/', ResponderDownloadPdf.as_view(), name='user_download_response'),
    path('response/<str:response_id>/get_score/', ResponderResponseScore.as_view(), name='response_view'),
    
    # Authentication
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/test_login/', CheckLoginStatus.as_view(), name='check_login_status'),
]