import secrets
from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import ExtendedUser
from .serializers import ExtendedUserSerializer


# Create your views here.

class SignupView(APIView):
    permission_classes = [AllowAny]

    def generate_unique_salt_bytecode(self):
        salt_byte = secrets.token_bytes(16)
        return salt_byte
    

    def post(self, request, *args, **kwargs):
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        password = request.POST.get('password')
        try:
            user = ExtendedUser.objects.create(first_name=first_name, last_name=last_name, email=email, phone=phone)
            user.user_salt_bytecode = self.generate_unique_salt_bytecode()
            user.set_password(password)
            user.save()
        except:
            return Response({'message': 'Mobile number and email should be unique.'}, status=status.HTTP_409_CONFLICT)
        return Response({'message': 'Account created successfully..!'}, status=status.HTTP_200_OK)


class LoginView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            username = request.POST['email']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            response.data.update({
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'phone': str(user.phone)
            })
        return response


#Not in use currently
class ProfileDataView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self, request, *args, **kwargs):
        serializer = ExtendedUserSerializer(request.user)
        user_data = serializer.data
        return Response({'data': user_data}, status=status.HTTP_200_OK)
