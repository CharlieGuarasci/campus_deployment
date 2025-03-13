import os
import django
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from chat_messages.routing import websocket_urlpatterns
from appuser.middleware import TokenAuthMiddleware  # ✅ Add custom middleware

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "campus_backend.settings")
django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(  # ✅ Ensures only allowed hosts can connect
        AuthMiddlewareStack(  # ✅ Ensures authentication is passed through
            TokenAuthMiddleware(  # ✅ Our custom middleware for JWT WebSocket auth
                URLRouter(websocket_urlpatterns)
            )
        )
    ),
})
