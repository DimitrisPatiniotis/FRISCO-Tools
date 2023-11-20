from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Response
from .serializers import ResponseSerializer

class AllResponsesViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_all_responses(self):
        url = reverse("all-responses")
        response = self.client.get(url)
        responses = Response.objects.all()
        serializer = ResponseSerializer(responses, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)