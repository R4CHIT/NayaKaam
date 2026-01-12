from rest_framework.pagination import CursorPagination

class CustomPagination(CursorPagination):
    default_limit = 2
    page_size = 10
    ordering = '-id'
    def get_paginated_response(self, data):
        response = super().get_paginated_response(data)
        if response.data.get('next'):
            response.data['next'] = response.data['next'].replace('http://', 'https://')
        if response.data.get('previous'):
            response.data['previous'] = response.data['previous'].replace('http://', 'https://')
        return response