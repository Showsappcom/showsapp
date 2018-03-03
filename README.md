# Showsapp Platform


## Back-end Description
 * [Django](https://www.djangoproject.com/)
 * [Django Rest Framework](http://www.django-rest-framework.org/)
 * [Django Rest Auth](http://django-rest-auth.readthedocs.io/en/latest/index.html)


### Set it up: 
1. Install [pipenv](https://pypi.python.org/pypi/pipenv):
```bash
pip install pipenv
```

2. Clone the [code](https://github.com/ShowsAppCo/showsapp):
```bash
git clone git@github.com:ShowsAppCo/showsapp.git
```

3. Install the requirements:
```bash
cd ./showsapp/api/
pipenv install
pipenv shell
```

4. Run the django migrations:
```bash
python3 manage.py migrate
```

5. Run the django development server
```bash
python3 manage.py runserver 0.0.0.0:8000
```

6. Create a superuser for yourself:
```bash
python3 manage.py createsuperuser
```

### To access the django admin site:
Navigate your browser to [localhost:8000/admin/](localhost:8000/admin/)

and provide the superuser credentials you've created the previous step.

Hola!

## Front-end Description

### Set it up

1. Install [yarn](https://yarnpkg.com/lang/en/docs/install/)
```bash
sudo apt-get update && sudo apt-get install yarn
```
Or follow the instructions in the link above

2. Change directory into the app and run it:
```bash
cd app
yarn start
```

React app create by create-react-app tool 