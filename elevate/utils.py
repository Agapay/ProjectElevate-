from business.serializer import BusinessSerializer


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': BusinessSerializer(user, context={'request': request}).data
    }