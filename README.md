# ops frontend based on go-admin-ui

  <img align="right" width="320" src="https://gitee.com/mydearzwj/image/raw/master/img/go-admin.svg">


[![Build Status](https://github.com/wenjianzhang/go-admin/workflows/build/badge.svg)](https://github.com/go-admin-team/go-admin)
[![Release](https://img.shields.io/github/release/go-admin-team/go-admin.svg?style=flat-square)](https://github.com/go-admin-team/go-admin/releases)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/go-admin-team/go-admin)

English | [简体中文](https://github.com/go-admin-team/go-admin/blob/master/README.Zh-cn.md)

The front-end and back-end separation authority management system based on Gin + Vue + Element UI is extremely simple to initialize the system. You only need to modify the database connection in the configuration file. The system supports multi-instruction operations. Migration instructions can make it easier to initialize database information. Service instructions It's easy to start the api service.


## ✨ Feature

- Follow RESTful API design specifications

- Based on the GIN WEB API framework, it provides rich middleware support (user authentication, cross-domain, access log, tracking ID, etc.)

- RBAC access control model based on Casbin

- Database storage based on GORM, which can expand multiple types of databases

- Simple model mapping of configuration files to quickly get the desired configuration

- Code generation tool

- Form builder

- Multi-command mode

- TODO: unit test


You need to install locally [go] [gin] [node](http://nodejs.org/) 和 [git](https://git-scm.com/)

At the same time, a series of tutorials including videos and documents are provided. How to complete the downloading to the proficient use, it is strongly recommended that you read these tutorials before you practice this project! ! !

## 📦 Local development

### Development directory creation

```bash

# Create a development directory
mkdir goadmin
cd goadmin
```

### Get the code

> Important note: the two projects must be placed in the same folder;

```bash
# Get backend code
git clone https://github.com/helloqingbing/vue-pure-backend.git

# Get the front-end code
git clone https://github.com/helloqingbing/vue-pure-backend.git

```

### Startup instructions

#### Server startup instructions

```bash
# Enter the go-admin backend project
cd ./vue-pure-backend

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
E:\vue-pure-backend>go build
# github.com/mattn/go-sqlite3
cgo: exec /missing-cc: exec: "/missing-cc": file does not exist
```

or

```bash
D:\Code\vue-pure-backend>go build
# github.com/mattn/go-sqlite3
cgo: exec gcc: exec: "gcc": executable file not found in %PATH%
```

#### Use docker to compile and start

```shell
# Compile the image
docker build -t go-admin .


# Start the container, the first go-admin is the container name, and the second go-admin is the image name
# -v Mapping configuration file Local path: container path
docker run --name go-admin -p 8000:8000 -v /config/settings.yml:/config/settings.yml -d go-admin-server
```



#### Generation Document

```bash
go generate
```

#### Cross compile
```bash
# windows
env GOOS=windows GOARCH=amd64 go build main.go

# or
# linux
env GOOS=linux GOARCH=amd64 go build main.go
```

### UI interactive terminal startup instructions

```bash
# Installation dependencies
npm install   # or cnpm install

# Start service
npm run dev
```

## 🎬 Online Demo
> admin  /  123456

演示地址：[http://www.go-admin.dev](http://www.go-admin.dev/#/login)


