from django.urls import path
from . import views

urlpatterns = [
    path('add-to-store/', views.StorePasswordView.as_view()),
    path('get-decrypt-password/', views.StoreDecryptedPasswordView.as_view()),
    path('get-all-pass-store-objs/', views.StorePasswordView.as_view())
]