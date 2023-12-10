from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated

from .models import PasswordStoreModel
from .serializers import PasswordStoreModelSerializer
from global_utils.encryption_utils import encrypt, decrypt

# Create your views here.

class StorePasswordView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        title = request.POST.get('title')
        description = request.POST.get('description')
        raw_password_to_store = request.POST.get('raw_password_to_store')
        user_password = request.POST.get('user_password')

        user_email = request.user.email
        user_found = authenticate(username=user_email, password=user_password)

        resp = {}
        status_code = None
        #valid user creds - get encryption key and store password
        if user_found and user_found.id == request.user.id:
            encryption_key=request.user.get_user_encryption_key(user_password)
            encrypted_password = encrypt(raw_password_to_store, encryption_key)
            password_store_obj = PasswordStoreModel.objects.create(
                title=title,
                description=description,
                encrypted_password=encrypted_password,
                user=request.user
            )
            serializer = PasswordStoreModelSerializer(password_store_obj)
            resp['instace'] = serializer.data
            resp['message'] = 'Data saved successfully..!'
            status_code = status.HTTP_201_CREATED
        else:
            #invalid user creds - can not store
            resp['message'] = 'User Password is invalid.'
            status_code = status.HTTP_401_UNAUTHORIZED
        return Response(resp, status=status_code)
    

    def get(self, request, *args, **kwargs):
        resp = {}
        status_code = 400
    
        all_pass_store_objs = PasswordStoreModel.objects.filter(user=request.user)
        serializer = PasswordStoreModelSerializer(all_pass_store_objs, many=True)
        resp=serializer.data
        status_code = status.HTTP_200_OK

        return Response(resp, status=status_code)


class StoreDecryptedPasswordView(APIView):
    def post(self, request, *args, **kwargs):
        password_store_id = request.POST.get('password_store_id')
        user_password = request.POST.get('user_password')
    
        resp = {}
        status_code = status.HTTP_200_OK
        
        user_email = request.user.email
        user_found = authenticate(username=user_email, password=user_password)
        # if valid user creds - get encryption key and dycrypt password
        if user_found and user_found.id == request.user.id:
            pas_store_obj = PasswordStoreModel.objects.get(id=password_store_id)
            encrypted_password = bytes(pas_store_obj.encrypted_password)
            encryption_key=request.user.get_user_encryption_key(user_password)
            resp['dycrypted_password'] = decrypt(encrypted_password, encryption_key)
            status_code = status.HTTP_200_OK
        else:
            #invalid user creds : can not store
            resp['message'] = 'User Password is invalid.'
            status_code = status.HTTP_403_FORBIDDEN
        return Response(resp, status=status_code)
