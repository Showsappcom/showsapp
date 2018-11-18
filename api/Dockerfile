FROM python:3.6

# set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set work directory
WORKDIR /usr/src/api

# install dependencies
RUN pip install --upgrade pip
RUN pip install pipenv
COPY ./Pipfile /usr/src/api/Pipfile
RUN pipenv install --skip-lock --system --dev

# copy project
COPY . /usr/src/api/
