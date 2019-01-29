# Interpreters


UCI Informatics 191A - AGAPAY project

### Prerequisites
install [node](https://nodejs.org/en/)
install [python 3](https://www.python.org/download/releases/3.0/)

### Setup Backend
```
at root folder "./"
virtualenv env
source env/bin/activate  # On Windows use env\Scripts\activate
pip install django
pip install djangorestframework
pip install djangorestframework-jwt
pip install django-cors-headers
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

```

### Setup Frontend
```
run "npm install" from root directory "./"
```

### Run Backend Server
```
virtualenv env
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

login url: http://127.0.0.1:8000/frontend/admin-login
username: gg
password: 123

If you are changing reactjs files and the frontend is not updating
1. make sure you are running "npm run dev"
2. delete your cache. Example [delete cache on chorme](https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DDesktop&hl=en)
you only need to select "cached images and file"
