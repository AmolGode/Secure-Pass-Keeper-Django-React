from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny


class TestApiView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return Response({"status": "API working fine."}, status=status.HTTP_200_OK)