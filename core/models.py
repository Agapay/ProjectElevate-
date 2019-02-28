from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from . import gateway_updated


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

    def createBusiness(self, info):
        # info is a type dict with all the info
        id              = info['id']
        email           = info['email']
        username        = info['username']
        phone_number    = info['phone_number']
        business_name   = info['business_name']
        user_api_key    = info['user_api_key']
        nmi_login       = info['nmi_login']
        expiration_date = info['expiration_date']

        ## add address stuff

        business = Business(id=id, email=email, username=username, phone_number=phone_number,
                            business_name=business_name, user_api_key=user_api_key, nmi_login=nmi_login,
                            expiration_date=expiration_date)
        business.save()

        return business


    def createCustomer(self, info):
        id                      = info['id']
        business                = Business.objects.filter(id=info['business'])[0] #business_FK
        username                = info['username']
        first_name              = info['first_name']
        last_name               = info['last_name']
        phone_number            = info['phone_number']
        email                   = info['email']
        user_api_key            = info['user_api_key']
        active                  = info['active']
        street_home_address     = info['street_home_address']
        apt_home_address        = info['apt_home_address']
        city_home_address       = info['city_home_address']
        state_home_address      = info['state_home_address']
        country_home_address    = info['country_home_address']
        zip_home_address        = info['zip_home_address']





        customer = Customer(id=id, business=business, username=username,
                            first_name=first_name, last_name=last_name,
                            phone_number=phone_number, email=email, user_api_key=user_api_key,
                            active=active, street_home_address=street_home_address,
                            apt_home_address=apt_home_address, city_home_address=city_home_address,
                            state_home_address=state_home_address, country_home_address=country_home_address,
                            zip_home_address=zip_home_address)


        customer.save()

        return customer





    def deactivate_account(self):
        # TODO:
        pass

    def create_superuser(self, username, password):
        phone_number = 1
        email = "test2@gmail.com"
        user_obj = self.create_user(email, username, password, phone_number)
        user_obj.admin = True
        user_obj.staff = True
        return user_obj

    def get_all_businesses(self):
        return User.objects.filter(business=True)

    def set_business_vault(self, user_id, ccnumber="", ccexp="", api_key=""):
        # TODO: Add to Customer Vault: (api key)
        user_obj = User.object.filter(id=user_id)
        # business_obj = Business.object.filter(id=user_id)
        if api_key != "":
            user_obj.business_api_key = api_key
            print("Updated user api key")
        else:
            if ccnumber == "" or ccexp == "":
                print("Error: please input billing information (credit card number / expiry")
                return
            gw = gateway_updated.Gateway()
            # TODO: update to use given nmi login and password from user
            gw.set_login(username="agapaydemo1", password="demo1234")
            gw.add_customer_vault()
            # gw.set_shipping()
            gw.set_billing(first_name=user_obj.name, last_name=user_obj.last_name,
                           address1=user_obj.street_home_address,
                           city=user_obj.city_home_address, state=user_obj.state_home_address,
                           zip=user_obj.zip_home_address,
                           country=user_obj.country_home_address)
            response = gw.do_customer_vault(ccnumber=ccnumber, ccexp=ccexp)
            print(gw.responses['response'])

            if (int(gw.responses['response']) == 1):
                print("Approved")
            elif (int(gw.responses['response']) == 2):
                print("Declined")
            elif (int(gw.responses['response']) == 3):
                print("Error")

    def set_customer_vault(self, user_id, ccnumber="", ccexp="", api_key=""):
        # TODO: Add to Customer Vault: (api key)
        user_obj = User.object.filter(id=user_id)
        # customer_obj = Customer.object.filter(id=customer_id)
        if api_key != "":
            user_obj.business_api_key = api_key
            print("Updated user api key")
        else:
            if ccnumber == "" or ccexp == "":
                print("Error: please input billing information (credit card number / expiry")
                return
            gw = gateway_updated.Gateway()
            # TODO: update to use given nmi login and password from user
            gw.set_login(username="standupp", password="Elevate123")
            gw.add_customer_vault()
            # gw.set_shipping()
            gw.set_billing(first_name=user_obj.name, last_name=user_obj.last_name, address1=user_obj.street_home_address,
                           city=user_obj.city_home_address, state=user_obj.state_home_address, zip=user_obj.zip_home_address,
                           country=user_obj.country_home_address)
            gw.do_customer_vault(ccnumber=ccnumber, ccexp=ccexp)
            print("Gateway HTTP POST response = ", gw.responses['response'])

            if int(gw.responses['response']) == 1:
                print("Approved")
            elif int(gw.responses['response']) == 2:
                print("Declined")
            elif int(gw.responses['response']) == 3:
                print("Error")


class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, unique=True, blank=False, default="")  # REQUIRED
    username = models.CharField(max_length=30, blank=False, unique=True, default="")  # REQUIRED
  #  password = models.CharField(max_length=30)
    active = models.BooleanField(blank=False, default=False)  # can login
    admin = models.BooleanField(blank=False, default=False)  # superuser
    staff = models.BooleanField(blank=False, default=False)  # staff
    customer = models.BooleanField(blank=False, default=False)  # customer
    business = models.BooleanField(blank=False, default=False)  # core
    business_name = models.CharField(max_length=255, blank=True, null=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=False, null=False, default="")  # REQUIRED
    business_api_key = models.CharField(max_length=1000, blank=True, null=True)
    expiration_date = models.DateTimeField(blank=True, null=True)

    # for customers only foreign key
    business_FK = models.IntegerField(blank=True, null=True)

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
            return self.first_name + " " + self.last_name + " " + str(self.id)

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


class Business(models.Model):
    id                  = models.AutoField(primary_key=True)
    email               = models.EmailField(max_length=255, unique=True, blank=False, default="example@email.com")  # REQUIRED
    username            = models.CharField(max_length=30, blank=False, unique=True, default="username")  # REQUIRED
    phone_number        = models.CharField(max_length=15, blank=False, null=False)  # REQUIRED
    business_name       = models.CharField(max_length=255, blank=True, null=True)
    user_api_key        = models.CharField(max_length=1000, blank=True, null=True)

    nmi_login           = models.CharField(max_length=30, blank=False, default="nmi")  # REQUIRED
    nmi_password        = models.CharField(max_length=30, blank=False, default="nmi")
    expiration_date     = models.DateTimeField(blank=True, null=True)

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

    def __str__(self):
        return str(self.id)


class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    username = models.CharField(max_length=30, blank=False, unique=True, default="")  # REQUIRED
    # password                = forms.CharField(widget=forms.PasswordInput())
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=False, null=False, default="")  # REQUIRED
    email = models.EmailField(max_length=255, unique=True, blank=False, default="")  # REQUIRED
    user_api_key = models.CharField(max_length=1000, blank=True, null=True)
    active = models.BooleanField(blank=False, default=False)  # can login
    street_home_address = models.CharField(max_length=100, blank=True, null=True)
    apt_home_address = models.CharField(max_length=100, blank=True, null=True)
    city_home_address = models.CharField(max_length=100, blank=True, null=True)
    state_home_address = models.CharField(max_length=100, blank=True, null=True)
    country_home_address = models.CharField(max_length=100, blank=True, null=True)
    zip_home_address = models.CharField(max_length=15, blank=True, null=True)



    # subscriptions = models.ManyToManyField(Subscription)

    def __str__(self):
        return str(self.id)

    def create_new_customer_vault(self):
        # TODO: make new call to customer vault, and update model
        # check user customer_vault function
        pass


# class Subscription(models.Model):
#     id              = models.AutoField(primary_key=True)
#     business        = models.ForeignKey(Business, on_delete=models.CASCADE)
#     title           = models.CharField(max_length=255, blank=False)
#     description     = models.CharField(max_length=2550, blank=False)
#     cost            = models.IntegerField(blank=False)
#     start_date      = models.DateTimeField(blank=True)
#     end_date        = models.DateTimeField(blank=True)
#
#     def __str__(self):
#         return self.title


class SubscriptionPlan(models.Model):
    id                          = models.AutoField(primary_key=True)
    business                    = models.ForeignKey(Business, on_delete=models.CASCADE)
    title                       = models.CharField(blank=False, max_length=255, default="")
    description                 = models.CharField(blank=False, max_length=2550, default="")
    amount                      = models.IntegerField(blank=False, default=1)
    #recurring                   = models.BooleanField(blank=False, default=False)
    monthly_recurring           = models.BooleanField(blank=False, default=False)
    #yearly_recurring            = models.BooleanField(blank=False, default=False)
    benefits                    = models.ManyToManyField('Benefit', related_name='subscriptions')

    def __str__(self):
        return self.title



class Benefit(models.Model):
    id      = models.AutoField(primary_key=True)
    business     = models.ForeignKey(Business, on_delete=models.CASCADE)
    title           = models.CharField(blank=False, max_length=255)
    description     = models.CharField(blank=False, max_length=2550)
    quantity        = models.IntegerField(blank=False, default=1)

    def __str__(self):
        return self.title


#class Benefit_Routing(models.Model):
#    id                     = models.AutoField(primary_key=True)
#    subscription           = models.ForeignKey(Subscription,  on_delete=models.CASCADE)
#    benefit                = models.ForeignKey(Benefit,  on_delete=models.CASCADE)
#    quantity               = models.IntegerField()


class ActiveRedeemables(models.Model):
    id                       = models.AutoField(primary_key=True)
    benefit                  = models.ForeignKey(Benefit, on_delete=models.CASCADE)
    subscription_plan        = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE)
    customer                 = models.ForeignKey(Customer, on_delete=models.CASCADE)
    expiration                  = models.DateTimeField()


class HistoryRedeemables(models.Model):
    id                      = models.AutoField(primary_key= True)
    benefit                 = models.ForeignKey(Benefit, on_delete=models.CASCADE)
    subscription            = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE)
    customer                = models.ForeignKey(Customer, on_delete=models.CASCADE)
    set_expiration          = models.DateTimeField(blank=True, null=True)
    method_redeemed         = models.BooleanField(blank=False, default=False)