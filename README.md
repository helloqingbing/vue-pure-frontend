# vue-pure-frontend pure version for frontend design based on go-admin-ui 

The front-end and back-end separation authority management system based on Gin + Vue + Element UI is extremely simple to initialize the system. You only need to modify the database connection in the configuration file. The system supports multi-instruction operations. Migration instructions can make it easier to initialize database information. Service instructions It's easy to start the api service.


## ✨ Feature

- Based on go-admin-ui features and remove role based control

## ✨ New Feature

- Add SSO login
- Fix column collapse issue when sider toggled
- Expand tree component feature, add pop dialog for node edit/add
- Add split panal drag feature


You need to install locally [go] [gin] [node](http://nodejs.org/) 和 [git](https://git-scm.com/)

At the same time, a series of tutorials including videos and documents are provided. How to complete the downloading to the proficient use, it is strongly recommended that you read these tutorials before you practice this project! ! !

## 📦 Local development

### Development directory creation

```bash

# Create a development directory
mkdir vue-pure-frontend
cd vue-pure-frontend
```

### Get the code

> Important note: the two projects must be placed in the same folder;

```bash
# Get backend code
git clone https://github.com/helloqingbing/vue-pure-frontend.git

# Get the front-end code
git clone https://github.com/helloqingbing/vue-pure-frontend.git

```

### Startup instructions

#### Server startup instructions

```bash
# Enter the go-admin backend project
cd ./vue-pure-frontend

# Compile the project
go build

# Change setting 
# File path go-admin/config/settings.yml
vi ./config/setting.yml 

# 1. Modify the database information in the configuration file
# Note: The corresponding configuration data under settings.database
# 2. Confirm the log path
```

:::tip ⚠️Note that this problem will occur if CGO is not installed in the windows environment;

```bash
go build

#### Use docker to compile and start

```shell
# Compile the image
docker build -t kvops .


# Start the container, the first go-admin is the container name, and the second go-admin is the image name
# -v Mapping configuration file Local path: container path
docker run --name go-admin -p 8000:8000 -v /config/settings.yml:/config/settings.yml -d go-admin-server
```

## 🎬 Online Demo
> admin  /  123456

演示地址：[http://www.go-admin.dev](http://www.go-admin.dev/#/login)


