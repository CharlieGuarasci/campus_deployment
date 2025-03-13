from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from appuser.models import AppUser  # Ensure your user model is correctly imported



class TokenAuthMiddleware(BaseMiddleware):
    """Middleware to authenticate WebSockets using JWT tokens."""

    async def __call__(self, scope, receive, send):
        query_string = parse_qs(scope["query_string"].decode())

        token = query_string.get("token", [None])[0]  # Get token from query params
        if token:
            try:
                access_token = AccessToken(token)
                user = await self.get_user(access_token)
                scope["user"] = user
                print(f"✅ Authenticated WebSocket user: {user.username}")  # Debugging log
            except Exception as e:
                print(f"❌ Invalid token: {e}")
                scope["user"] = AnonymousUser()

        return await super().__call__(scope, receive, send)

    @database_sync_to_async
    def get_user(self, access_token):
        """Retrieve user from token."""
        return AppUser.objects.get(id=access_token["user_id"])
