from rest_framework.permissions import BasePermission

class HasRole(BasePermission):
    def has_permission(self, request, view):
        required_role = getattr(view, "required_role", None)
        if not required_role:
            return True 

        if not request.user or not request.user.is_authenticated:
            return False

        return request.user.has_role(required_role)
