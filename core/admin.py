from django.contrib import admin
from .models import User, Business, Customer, Subscription


# Register your models here.
# superuser => gg, 123


class UserAdmin(admin.ModelAdmin):
    search_fields = ['email']

    class Meta:
        model = User


admin.site.register(Business)
admin.site.register(Customer)
admin.site.register(User, UserAdmin)
admin.site.register(Subscription)
