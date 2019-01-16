from business.serializer import BusinessSerializer


def my_jwt_response_handler(token, business=None, request=None):
    return {
        'token': token,
        'user': BusinessSerializer(business, context={'request': request}).data
    }