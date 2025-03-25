from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.urls import reverse

def send_verification_email(user):
    """Send email verification link to user"""
    print("\n=== Sending Verification Email ===")
    verification_url = f"{settings.FRONTEND_URL}/verify-email/{user.email_verification_token}"
    print(f"Verification URL: {verification_url}")
    
    subject = 'Verify your Campus account'
    html_message = f"""
    <h1>Welcome to Campus!</h1>
    <p>Hi {user.name},</p>
    <p>Please click the link below to verify your email address:</p>
    <p><a href="{verification_url}">{verification_url}</a></p>
    <p>This link will expire in 24 hours.</p>
    <p>If you did not create this account, please ignore this email.</p>
    """
    plain_message = strip_tags(html_message)
    
    print(f"Sending email to: {user.email}")
    print(f"From email: {settings.DEFAULT_FROM_EMAIL}")
    print(f"Subject: {subject}")
    print(f"Message: {plain_message}")
    
    try:
        send_mail(
            subject,
            plain_message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            html_message=html_message,
            fail_silently=False,
        )
        print("✅ Email sent successfully")
    except Exception as e:
        print(f"❌ Error sending email: {str(e)}")
        raise

def send_password_reset_email(user):
    """Send password reset link to user"""
    reset_url = f"{settings.FRONTEND_URL}/reset-password/{user.password_reset_token}"
    
    subject = 'Reset your Campus password'
    html_message = f"""
    <h1>Password Reset Request</h1>
    <p>Hi {user.name},</p>
    <p>Please click the link below to reset your password:</p>
    <p><a href="{reset_url}">{reset_url}</a></p>
    <p>This link will expire in 1 hour.</p>
    <p>If you did not request this password reset, please ignore this email.</p>
    """
    plain_message = strip_tags(html_message)
    
    send_mail(
        subject,
        plain_message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        html_message=html_message,
        fail_silently=False,
    ) 