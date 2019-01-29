from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


# Creating Models Here

class UserManager(BaseUserManager):
    def create_user(self, user_email, user_username, user_password, user_phone_number):
        if not user_email:
            raise ValueError('Users must have an email address')

        #TODO:: refactor
        user = self.model(
            email=self.normalize_email(user_email),
            username=user_username,
            phone_number=user_phone_number,
        )

        user.set_password(user_password)
        user.save(using=self._db)
        return user

    def create_business(self, email, username, password, phone_number, business_name=None, business_api_key=None,
                        expiration_date=None, street_branch_address=None, apt_branch_address=None,
                        city_branch_address=None, state_branch_address=None, country_branch_address=None,
                        zip_branch_address=None, street_hq_address=None, apt_hq_address=None, city_hq_address=None,
                        state_hq_address=None,country_hq_address=None, zip_hq_address=None,):

        user_obj = self.create_user(email, username, password, phone_number)

        user_obj.business = True

        # details about business
        user_obj.business_name = business_name
        user_obj.business_api_key = business_api_key
        user_obj.expiration_date = expiration_date

        # active
        user_obj.active = True

        # branch address
        user_obj.street_branch_address = street_branch_address
        user_obj.apt_branch_address = apt_branch_address
        user_obj.city_branch_address = city_branch_address
        user_obj.state_branch_address = state_branch_address
        user_obj.country_branch_address = country_branch_address
        user_obj.zip_branch_address = zip_branch_address

        # hq address
        user_obj.street_hq_address = street_hq_address
        user_obj.apt_hq_address = apt_hq_address
        user_obj.city_hq_address = city_hq_address
        user_obj.state_hq_address = state_hq_address
        user_obj.country_hq_address = country_hq_address
        user_obj.zip_hq_address = zip_hq_address

    def create_customer(self, email, username, password, phone_number, customer_name=None, customer_last_name=None,
                        street_home_address=None, apt_home_address=None, city_home_address=None, state_home_address=None,
                        country_home_address=None, zip_home_address=None):

        user_obj = self.create_user(email, username, password, phone_number)


        # details about customer
        user_obj.customer = True
        user_obj.customer_name = customer_name
        user_obj.customer_last_name = customer_last_name

        # active
        user_obj.active = True

        # home address
        user_obj.street_home_address = street_home_address
        user_obj.apt_home_address = apt_home_address
        user_obj.city_home_address = city_home_address
        user_obj.state_home_address = state_home_address
        user_obj.country_home_address = country_home_address
        user_obj.zip_home_address = zip_home_address



    def deactivate_account(self):
        # TODO:
        pass

    def create_superuser(self, username, password):
        phone_number = 1
        email = "test1@gmail.com"
        user_obj = self.create_user(email, username, password, phone_number)
        user_obj.admin = True
        user_obj.staff = True
        return user_obj



    def


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True, blank=False)  # REQUIRED
    username = models.CharField(max_length=30, blank=False, unique=True)  # REQUIRED
    active = models.BooleanField(default=False)  # can login
    admin = models.BooleanField(default=False)  # superuser
    staff = models.BooleanField(default=False)  # staff
    customer = models.BooleanField(default=False)  # customer
    business = models.BooleanField(default=False)  # core
    business_name = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=False, null=False)  # REQUIRED
    business_api_key = models.CharField(max_length=1000, blank=True, null=True)
    expiration_date = models.DateTimeField(blank=True, null=True)

    # Branch Address
    street_branch_address = models.CharField(max_length=100, blank=True, null=True)
    apt_branch_address = models.CharField(max_length=100, blank=True, null=True)
    city_branch_address = models.CharField(max_length=100, blank=True, null=True)
    state_branch_address = models.CharField(max_length=100, blank=True, null=True)
    country_branch_address = models.CharField(max_length=100, blank=True, null=True)
    zip_branch_address = models.CharField(max_length=15, blank=True, null=True)

    # HQ Address
    street_hq_address = models.CharField(max_length=100, blank=True, null=True)
    apt_hq_address = models.CharField(max_length=100, blank=True, null=True)
    city_hq_address = models.CharField(max_length=100, blank=True, null=True)
    state_hq_address = models.CharField(max_length=100, blank=True, null=True)
    country_hq_address = models.CharField(max_length=100, blank=True, null=True)
    zip_hq_address = models.CharField(max_length=15, blank=True, null=True)

    # Home Address
    street_home_address = models.CharField(max_length=100, blank=True, null=True)
    apt_home_address = models.CharField(max_length=100, blank=True, null=True)
    city_home_address = models.CharField(max_length=100, blank=True, null=True)
    state_home_address = models.CharField(max_length=100, blank=True, null=True)
    country_home_address = models.CharField(max_length=100, blank=True, null=True)
    zip_home_address = models.CharField(max_length=15, blank=True, null=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):

        if self.business:
            return self.business_name + " " + str(self.id)

        if self.customer:
            return self.name + " " + self.last_name + " " + str(self.id)

        else:
            return self.username + " " + str(self.id)

    def is_admin(self):
        return self.admin

    def is_staff(self):
        return self.staff

    def is_business(self):
        return self.business

    def is_customer(self):
        return self.customer

    def is_active(self):
        return self.active

    def is_superuser(self):
        return self.admin

    def get_customer_fullname(self):
        pass

    def get_email(self):
        return self.email




class Subscription(models.Model):
    username    = models.CharField(max_length=30, blank=False) # business username
    title       = models.CharField(max_length=30, blank=False)
    description = models.CharField(max_length=255, blank=False)

    def __str__(self):
        return self.title

class Customer(models.Model):
    username      = models.CharField(max_length=30, blank=False)
    subscriptions = models.ManyToManyField(Subscription)

    def __str__(self):
        return self.username


class Business(models.Model):
    username  = models.CharField(max_length=30, blank=False)
    customers = models.ManyToManyField(Customer)

    def __str__(self):
        return self.username





