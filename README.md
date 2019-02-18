# Interpreters


UCI Informatics 191A - AGAPAY project

### Prerequisites
install [node](https://nodejs.org/en/)

install [python 3](https://www.python.org/download/releases/3.0/)

install [postgres](https://postgresapp.com/) follow steps 1-3

### Setup Database
In your terminal run
```
psql
```
Now that you are in the postgres command-line, run the following including the semi-colon
```
CREATE USER elevate WITH PASSWORD ‘123’;
CREATE DATABASE elevate_db WITH OWNER elevate;
GRANT ALL PRIVILEGES ON DATABASE elevate_db to elevate;
```

### Setup Backend
```
at root folder "./"
virtualenv env
source env/bin/activate  # On Windows use env\Scripts\activate
pip install django
pip install djangorestframework
pip install djangorestframework-jwt
pip install django-cors-headers
pip install psycopg2
```

Using pipenv
```
at root folder "./"
pipenv install 
pipenv shell
pipenv install django
pipenv install djangorestframework
pipenv install djangorestframework-jwt
pipenv install django-cors-headers
pipenv install psycopg2
```

If you have not updated migrations run
```
python manage.py makemigrations
python manage.py migrate
```

run the following to create an admin
```
python manage.py createsuperuser	
```


### Setup Frontend
```
run "npm install" from root directory "./"
```

### Run Backend Server
```
source env/bin/activate  # On Windows use env\Scripts\activate
python manage.py runserver
```

using pipenv
```
pipenv shell
python manage.py runserver
```

### Run Frontend Reactjs Compiler
```
run "npm run dev" from root directory "./" (watches and compiles react files to the main.js file)
```

### Important for Frontend
react files are located in: ./elevate/frontend/src

css file is located in ./elevate/frontend/static/css

login url: http://127.0.0.1:8000/frontend/login

username: gg
password: 123

Username and password depends on the superuser you have created

Make sure you log into http://127.0.0.1:8000/admin/ using the superuser. 
Then go to users. 
Find the superuser you created and select it. 
Then find and select the admin checkbox. 
Save it and now you should be able to login through the login url.

If you are changing reactjs files and the frontend is not updating
1. make sure you are running "npm run dev"
2. delete your cache. Example [delete cache on chorme](https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DDesktop&hl=en)
you only need to select "cached images and file"
