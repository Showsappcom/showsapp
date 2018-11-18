# Showsapp Platform


## Technology stack
 * [Django](https://www.djangoproject.com/)
 * [Django Rest Framework](http://www.django-rest-framework.org/)
 * [Django Rest Auth](http://django-rest-auth.readthedocs.io/en/latest/index.html)
 * AngularJS
 * Docker

### Set it up: 

1. Clone the [code](https://github.com/ShowsAppCo/showsapp):
```bash
> git clone git@github.com:ShowsAppCom/showsapp.git
```

2. Let docker do the job:
```bash
> cd ./showsapp
> docker-compose build
> doker-compose up
```
3. Run the migrations to setup the DB:
```
> docker-compose run api /usr/src/api/manage.py migrate
```

4. Create a django super user:
```bash
> docker-compose run api /usr/src/api/manage.py createsuperuser
```


Hola, Done!
