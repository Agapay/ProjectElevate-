# from pycurl import *
# from urllib.parse import parse_qs, quote
# from io import StringIO
#
#
# class Gateway:
#     def __init__(self):
#         self.login = dict()
#         self.order = dict()
#         self.vault = dict()
#         self.billing = dict()
#         self.shipping = dict()
#         self.responses = dict()
#
#     def set_login(self, username, password):
#         self.login['password'] = password
#         self.login['username'] = username
#
#     def add_customer_vault(self):
#         self.vault['customer_vault'] = 'add_customer'
#
#     def update_customer_vault(self):
#         self.vault['customer_vault'] = 'update_customer'
#
#     def set_order(self, orderid, orderdescription, tax, shipping, ponumber, ipadress):
#         self.order['orderid'] = orderid
#         self.order['orderdescription'] = orderdescription
#         self.order['shipping'] = '{0:.2f}'.format(float(shipping))
#         self.order['ipaddress'] = ipadress
#         self.order['tax'] = '{0:.2f}'.format(float(tax))
#         self.order['ponumber'] = ponumber
#
#     def set_billing(self, first_name="", last_name="", company="", address1="", address2="",
#                     city="", state="", zip="", country="", phone="", fax="", email=""):
#         self.billing['first_name'] = first_name
#         self.billing['last_name']  = last_name
#         self.billing['company']   = company
#         self.billing['address1']  = address1
#         self.billing['address2']  = address2
#         self.billing['city']      = city
#         self.billing['state']     = state
#         self.billing['zip']       = zip
#         self.billing['country']   = country
#         self.billing['phone']     = phone
#         self.billing['fax']       = fax
#         self.billing['email']     = email
#         # self.billing['website']   = website
#
#     def set_shipping(self, first_name="", last_name="", company="", address1="", address2="",
#                      city="", state="", zipcode="", country="", email=""):
#         self.shipping['first_name'] = first_name
#         self.shipping['last_name']  = last_name
#         self.shipping['company']   = company
#         self.shipping['address1']  = address1
#         self.shipping['address2']  = address2
#         self.shipping['city']      = city
#         self.shipping['state']     = state
#         self.shipping['zip']       = zipcode
#         self.shipping['country']   = country
#         self.shipping['email']     = email
#
#     def do_sale(self, amount, ccnumber, ccexp, cvv=''):
#
#         query = ""
#
#         # Login Information
#         query = query + "username=" + quote(self.login['username']) + "&"
#         query += "password=" + quote(self.login['password']) + "&"
#
#         # Sales Information
#         query += "ccnumber=" + quote(ccnumber) + "&"
#         query += "ccexp=" + quote(ccexp) + "&"
#         query += "amount=" + quote('{0:.2f}'.format(float(amount))) + "&"
#         if cvv != '':
#             query += "cvv=" + quote(cvv) + "&"
#
#         # Order Information
#         for key, value in self.order.items():
#             query += quote(key) + "=" + quote(str(value)) + "&"
#
#         # Billing Information
#         for key, value in self.billing.items():
#             query += quote(key) + "=" + quote(str(value)) + "&"
#
#         # Shipping Information
#         for key, value in self.shipping.items():
#             query += quote(key) + "=" + quote(str(value)) + "&"
#
#         query += "type=sale"
#         return self.do_post(query)
#
#     def do_customer_vault(self, ccnumber, ccexp):
#         query = ""
#
#         # Customer Vault Information
#         query += "customer_vault=" + quote(self.vault['customer_vault']) + "&"
#
#         # Login Information
#         for key, value in self.login.items():
#             query += quote(key) + "=" + quote(str(value)) + "&"
#
#         # Sales Information
#         query += "ccnumber=" + quote(ccnumber) + "&"
#         query += "ccexp=" + quote(ccexp) + "&"
#
#         # Billing Information
#         for key, value in self.billing.items():
#             if value != '':
#                 query += key + "=" + quote(str(value)) + "&"
#
#         # Shipping Information
#         for key, value in self.shipping.items():
#             if value != '':
#                 query += key + "=" + quote(str(value)) + "&"
#
#         return self.do_post(query)
#
#     def do_post(self, query):
#         response_io = StringIO()
#         curlObj = pycurl.Curl()
#         curlObj.setopt(pycurl.POST, 1)
#         curlObj.setopt(pycurl.CONNECTTIMEOUT, 30)
#         curlObj.setopt(pycurl.TIMEOUT, 30)
#         curlObj.setopt(pycurl.HEADER, 0)
#         curlObj.setopt(pycurl.SSL_VERIFYPEER, 0)
#         curlObj.setopt(pycurl.WRITEFUNCTION, response_io.write)
#
#         curlObj.setopt(pycurl.URL, "https://secure.networkmerchants.com/api/transact.php")
#
#         curlObj.setopt(pycurl.POSTFIELDS, query)
#
#         curlObj.perform()
#
#         data = response_io.getvalue()
#         temp = parse_qs(data)
#         for key, value in temp.iteritems():
#             self.responses[key] = value[0]
#         return self.responses['response']
#

"""
# NOTE: your username and password should replace the ones below
gw = gwapi()
gw.setLogin("demo", "password");

gw.setBilling("John","Smith","Acme, Inc.","123 Main St","Suite 200", "Beverly Hills",
        "CA","90210","US","555-555-5555","555-555-5556","support@example.com",
        "www.example.com")
gw.setShipping("Mary","Smith","na","124 Shipping Main St","Suite Ship", "Beverly Hills",
        "CA","90210","US","support@example.com")
gw.setOrder("1234","Big Order",1, 2, "PO1234","65.192.14.10")

r = gw.doSale("5.00","4111111111111111","1212",'999')
print(gw.responses['response'])

if (int(gw.responses['response']) == 1) :
    print("Approved")
elif (int(gw.responses['response']) == 2) :
    print("Declined")
elif (int(gw.responses['response']) == 3) :
    print("Error")
"""