# notification/routing.py


from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/message/(?P<sender_id>\d+)/(?P<receiver_id>\d+)/$",consumers.MessageConsumers.as_asgi(),),
]
