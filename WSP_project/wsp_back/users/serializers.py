from django.contrib.auth.models import User  # or from your custom model
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import News, Student, Teacher

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 
            'username', 
            'email', 
            'first_name', 
            'last_name', 
            'picture', 
            'gender', 
            'phone', 
            'is_staff',
            'is_student',
            'is_teacher'
            ]

class NewsSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = News
        fields = ['id', 'title', 'description', 'image', 'content', 'author']
        read_only_fields = ['author']
        

class StudentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    gender = serializers.BooleanField(source='user.gender', read_only=True)
    gpa = serializers.FloatField()
    major = serializers.CharField(max_length=100)
    user = UserSerializer()


class TeacherSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    gender = serializers.BooleanField(source='user.gender', read_only=True)
    salary = serializers.FloatField()
    user = UserSerializer()