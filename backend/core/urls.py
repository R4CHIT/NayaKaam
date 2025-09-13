"""
URL configuration for core project.

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
from authentication.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static
from userprofile.views import *
from category.views import *
from booking.views import *
from notification.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/register/', RegisterView.as_view(), name='auth_register_'),
    path('api/auth/login/', loginView.as_view(), name='auth_login_'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("api/auth/user/", UserView.as_view(),name="user_view"), 
    path('api/auth/changepassword/',changePassword.as_view(),name='change_password'),
    path("api/changeuserinfo/", ChangeUserInfo.as_view(), name=""),

    #delete account very critical
    path("api/deleteaccount/", DeleteAccount.as_view(), name="delete_account"),

     #Email veryfy
    path('api/reset-password/', SendResetEmail.as_view(), name='password_reset'),
    path('api/password-reset-confirm/', Changeresetpassword.as_view(), name='password_reset_confirm'),

    #userprofile
    path('api/userprofile/',ProviderDetailView.as_view(),name='Providerprofilecreation'),
    path('api/get/userprofile/',ProviderDetailGetView.as_view(),name='getproviderprofile'),
    path('api/get/provider/',GetALLUserView.as_view(),name='getProvider'),
    path('api/get/categoryprovider/<int:CategoryId>/',GetProviderThroughCategory.as_view(),name='getProvider'),
    
     
    #category
    path('api/getcategory/',Get_Category.as_view(),name="GetCategory"),
    path('api/getcategoryDetails/',Get_AllCtegory.as_view(),name="GetCategory"),

    #profile update
    path('api/updateprofile/<int:userId>/', UpdateApiView.as_view(), name="UpdateProfile"),
    path("api/updateproviderrating/<int:pk>/", UpdateProviderRating.as_view(), name="Updaterating"),
    
    #Booking
    path('api/booking/',MakeBooking.as_view()),
    path('api/getbooking/',GetBooking.as_view()),
    path("api/getcompletedbooking/", getCompletedBooking.as_view(), name="history"),

    #booking Summary
    path("api/getBookingSummary", getBookingSummary.as_view(), name=""),

    #GetMontlyEarning
    path("api/getMonthlyEarning", GetMontlyEarning.as_view(), name=""),

    #GetMonthlyBooking
    path("api/getMonthlyBooking/", GetMonthlyBooking.as_view(), name=""),

    #notification
    path("api/getnotification/", GetNotifications.as_view(), name=""),
    path("api/getunreadnotification", GetUnreadNotification.as_view(), name=""),
    path("api/readallnotification", ReadAllNotification.as_view(), name=""),
    path("api/readnotification/<int:pk>/", ReadNotification.as_view(), name=""),
    path("api/updatestatus/<int:pk>/", UpdateOrderStatus.as_view(), name="")


]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
