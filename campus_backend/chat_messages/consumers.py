import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser
from asgiref.sync import sync_to_async
from .models import Message
from chats.models import Chat

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """Handle new WebSocket connection and add user to a chat group."""
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.room_group_name = f"chat_{self.chat_id}"

        user = self.scope.get("user", None)

        is_authenticated = user and getattr(user, "id", None) is not None

        if not is_authenticated:
            print("❌ WebSocket rejected: User not authenticated")  # Debugging log
            await self.close()  # Reject unauthenticated users
            return
        # Add user to a chat room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        print(f"🟢 WebSocket connected: {self.channel_name}")

    async def disconnect(self, close_code):
        """Remove user from the chat group when they disconnect."""
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        print(f"🔴 WebSocket disconnected: {self.channel_name}")

    async def receive(self, text_data):
        """Handle incoming messages and save them to the database."""
        print(f"📨 WebSocket message received: {text_data}")
        data = json.loads(text_data)
        message = data.get("message", "")
        sender = self.scope["user"]

        if isinstance(sender, AnonymousUser):
            print("❌ Unauthenticated user, ignoring message.")
            return  # Ignore unauthenticated users

        # Save message to database
        chat_message = await self.save_message(sender, message)

        print(f"📤 Sending message to group {self.room_group_name}: {message}")

        # Send message to chat group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "sender": sender.username,
                "timestamp": chat_message.timestamp.strftime("%H:%M"),
            }
        )

    async def chat_message(self, event):
        """Send message data to WebSocket clients."""
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "sender": event["sender"],
            "timestamp": event["timestamp"],
        }))

    @sync_to_async
    def save_message(self, sender, message):
        """Store the message in the database."""
        try:
            chat = Chat.objects.get(id=self.chat_id)
        except Chat.DoesNotExist:
            print(f"❌ Chat with ID {self.chat_id} does not exist.")
            return None  # Return None instead of raising an error

        return Message.objects.create(chat=chat, sender=sender, content=message)
