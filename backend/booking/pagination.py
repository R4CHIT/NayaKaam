from rest_framework.pagination import CursorPagination

class CustomPagination(CursorPagination):
    default_limit = 2
    page_size = 7
    ordering = '-id'
