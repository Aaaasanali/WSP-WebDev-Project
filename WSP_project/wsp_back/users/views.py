from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, NewsSerializer, StudentSerializer, TeacherSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from .models import User, News, Student, Teacher
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your views here.  
  
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getUsers(request):
    users = User.objects.all()
    sr = UserSerializer(users, many=True)
    return Response(sr.data)

@api_view(['GET'])
def getUser(request, pk):
    user = User.objects.get(pk=pk)
    sr = UserSerializer(user)
    return Response(sr.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    sr = UserSerializer(request.user)
    return Response(sr.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_email(request):
    new_email = request.data.get('email')
    if not new_email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = request.user
    user.email = new_email
    user.save()

    return Response({'message': 'Email updated'})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_phone(request):
    new_phone = request.data.get('phone')
    if not new_phone:
        return Response({'error': 'Phone number is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = request.user
    user.phone = new_phone
    user.save()

    return Response({'message': 'Phone number updated'})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_pic(request):
    new_url = request.data.get('url')
    if not new_url:
        return Response({'error': 'Url picture is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = request.user
    user.picture = new_url
    user.save()

    return Response({'message': 'Profile picture is updated'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_user(request):
    try:
        data = request.data

        user = User.objects.create_user( 
            username=data.get("username"),
            password=data.get("password"),
            email=data.get("email"),
            phone=data.get("phone"),
            gender=data.get("gender"),
        )
        user.is_student = data.get("is_student")
        user.is_teacher = data.get("is_teacher")
        user.save()

        if user.is_student and "student" in data:
            Student.objects.create(
                user=user,
                gpa=data["student"].get("gpa"),
                major=data["student"].get("major"),
            )

        if user.is_teacher and "teacher" in data:
            Teacher.objects.create(
                user=user,
                salary=data["teacher"].get("salary")
            )
        return Response(data.get("is_student"), status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, pk):
    try:
        user = User.objects.get(id=pk)
        user.delete()
        return Response({'message': 'User deleted successfully.'}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_students(requst):
    students = Student.objects.all()
    sr = StudentSerializer(students, many=True)
    return Response(sr.data)

@api_view(['GET'])
def get_student(request, pk):
    user = User.objects.get(id=pk)
    student = Student.objects.get(user=user)

    serializer = StudentSerializer(student)
    return Response(serializer.data)

@api_view(['GET'])
def get_teacher(request, pk):
    user = User.objects.get(id=pk)
    teacher = Teacher.objects.get(user=user)

    serializer = TeacherSerializer(teacher)
    return Response(serializer.data)

class CreateNewsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = NewsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetNewsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        news = News.objects.all()
        sr = NewsSerializer(news, many=True)
        return Response(sr.data)
    
class DeleteNewsView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            news = News.objects.get(pk=pk)
        except News.DoesNotExist:
            return Response({'error': 'News not found'}, status=status.HTTP_404_NOT_FOUND)
        news.delete()
        return Response({'message' : 'News deleted'})

class GetNewsById(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        news = News.objects.get(pk=pk)
        sr = NewsSerializer(news)
        return Response(sr.data)
    
class UpdateNews(APIView):
    permission_classes = [IsAuthenticated]

    def put(seld, request, pk):
        try:
            news = News.objects.get(pk=pk)
        except News.DoesNotExist:
            return Response({'error': 'News not found'}, status=status.HTTP_404_NOT_FOUND)
        
        sr = NewsSerializer(news, data=request.data)
        if sr.is_valid():
            sr.save(author=request.user) 
            return Response({'message' : 'Updated Succesfully'}, status=status.HTTP_200_OK)
        return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)
