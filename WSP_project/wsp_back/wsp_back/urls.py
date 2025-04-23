"""
URL configuration for wsp_back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from users.views import (
    getUsers,
    getUser,
    current_user,
    update_email,
    update_phone,
    update_pic,
    CreateNewsView,
    GetNewsView,
    DeleteNewsView,
    GetNewsById,
    UpdateNews,
    create_user,
    delete_user,
    get_student,
    get_students,
    get_teacher
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/users/', getUsers, name='users_list'),
    path('api/users/<int:pk>', getUser, name='user_data'),
    path('api/current-user/', current_user, name='current-user'),
    path('api/update_email/', update_email, name='update_email'),
    path('api/update_phone/', update_phone, name='update_phone'),
    path('api/update_pic/', update_pic, name='update_pic'),
    path('api/create_news', CreateNewsView.as_view(), name='create_news'),
    path('api/get_news', GetNewsView.as_view(), name='get_news'),
    path('api/news/<int:pk>/delete', DeleteNewsView.as_view(), name='delete_news'),
    path('api/news/<int:pk>', GetNewsById.as_view(), name='get_news_by_id'),
    path('api/news/<int:pk>/update', UpdateNews.as_view(), name='update_news'),
    path('api/create_user', create_user, name='create_user'),
    path('api/users/<int:pk>/delete', delete_user, name='delete_user'),
    path('api/users/students', get_students, name='get_students'),
    path('api/users/students/<int:pk>', get_student, name='get_student'),
    path('api/users/teachers/<int:pk>', get_teacher, name='get_teacher'),
]   
