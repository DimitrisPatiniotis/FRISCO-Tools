# Demo Migration to mySQL

## Table of contents
* [Backup Data](#backup-data)
* [Initialize mySQL database](#initialize-mysql-database)
* [Load Data](#load-data)

## Backup Data

1. Save data in json

```
$ python manage.py dumpdata > data.json
```

## Initialize mySQL database and change settings


1. Install sqlclient
```
$ pip install mysqlclient
```

2. Change the settings file

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # Set the database engine to MySQL
        'NAME': 'your_database_name', # Set to the database name
        'USER': 'your_mysql_user', # Set to the mysql user
        'PASSWORD': 'your_mysql_password', # Set to the mysql password
        'HOST': 'localhost',  # Change if your MySQL server is on a different host
        'PORT': '3306',  # Default MySQL port
    }
}
```

3. Make migrations
```
$ python manage.py makemigrations
$ python manage.py migrate
```

## Load Data

1. Load Data
```
$ python manage.py loaddata data.json
```