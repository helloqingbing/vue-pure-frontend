# go-admin

  <img align="right" width="320" src="https://gitee.com/mydearzwj/image/raw/master/img/go-admin.svg">


[![Build Status](https://github.com/wenjianzhang/go-admin/workflows/build/badge.svg)](https://github.com/go-admin-team/go-admin)
[![Release](https://img.shields.io/github/release/go-admin-team/go-admin.svg?style=flat-square)](https://github.com/go-admin-team/go-admin/releases)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/go-admin-team/go-admin)

English | [简体中文](https://github.com/go-admin-team/go-admin/blob/master/README.Zh-cn.md)

The front-end and back-end separation authority management system based on Gin + Vue + Element UI is extremely simple to initialize the system. You only need to modify the database connection in the configuration file. The system supports multi-instruction operations. Migration instructions can make it easier to initialize database information. Service instructions It's easy to start the api service.

[documentation](https://doc.go-admin.dev)

[Backend project](https://github.com/go-admin-team/go-admin)

[Video tutorial](https://space.bilibili.com/565616721/channel/detail?cid=125737)

## ✨ Feature

- Follow RESTful API design specifications

- Based on the GIN WEB API framework, it provides rich middleware support (user authentication, cross-domain, access log, tracking ID, etc.)

- RBAC access control model based on Casbin

- JWT authentication

- Support Swagger documents (based on swaggo)

- Database storage based on GORM, which can expand multiple types of databases

- Simple model mapping of configuration files to quickly get the desired configuration

- Code generation tool

- Form builder

- Multi-command mode

- TODO: unit test


## 🎁 Internal

1. User management: The user is the system operator, this function mainly completes the system user configuration.
2. Department management: configure the system organization (company, department, group), and display the tree structure to support data permissions.
3. Position management: configure the positions of system users.
4. Menu management: configure the system menu, operation authority, button authority identification, interface authority, etc.
5. Role management: Role menu permission assignment and role setting are divided into data scope permissions by organization.
6. Dictionary management: Maintain some relatively fixed data frequently used in the system.
7. Parameter management: dynamically configure common parameters for the system.
8. Operation log: system normal operation log record and query; system abnormal information log record and query.
9. Login log: The system login log record query contains login exceptions.
1. Interface documentation: Automatically generate related api interface documents according to the business code.
1. Code generation: According to the data table structure, generate the corresponding addition, deletion, modification, and check corresponding business, and the whole process of visual operation, so that the basic business can be implemented with zero code.
1. Form construction: Customize the page style, drag and drop to realize the page layout.
1. Service monitoring: View the basic information of some servers.
1. Content management: demo function, including classification management and content management. You can refer to the easy to use quick start.

## Ready to work

You need to install locally [go] [gin] [node](http://nodejs.org/) 和 [git](https://git-scm.com/)

At the same time, a series of tutorials including videos and documents are provided. How to complete the downloading to the proficient use, it is strongly recommended that you read these tutorials before you practice this project! ! !

### Easily implement go-admin to write the first application-documentation tutorial

[Step 1 - basic content introduction](http://doc.zhangwj.com/go-admin-site/guide/intro/tutorial01.html)

[Step 2 - Practical application - writing database operations](http://doc.zhangwj.com/go-admin-site/guide/intro/tutorial02.html)

### Teach you from getting started to giving up-video tutorial

[How to start go-admin](https://www.bilibili.com/video/BV1z5411x7JG)

[Easily implement business using build tools](https://www.bilibili.com/video/BV1Dg4y1i79D)

[v1.1.0 version code generation tool-free your hands](https://www.bilibili.com/video/BV1N54y1i71P) [Advanced]

[Explanation of multi-command startup mode and IDE configuration](https://www.bilibili.com/video/BV1Fg4y1q7ph)

[Configuration instructions for go-admin menu](https://www.bilibili.com/video/BV1Wp4y1D715) [Must see]

[How to configure menu information and interface information](https://www.bilibili.com/video/BV1zv411B7nG) [Must see]

[go-admin permission configuration instructions](https://www.bilibili.com/video/BV1rt4y197d3) [Must see]

[Instructions for use of go-admin data permissions](https://www.bilibili.com/video/BV1LK4y1s71e) [Must see]

**If you have any questions, please read the above-mentioned usage documents and articles first. If you are not satisfied, welcome to issue and pr. Video tutorials and documents are being updated continuously.**

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
git clone https://github.com/go-admin-team/go-admin.git

# Get the front-end code
git clone https://github.com/go-admin-team/go-admin-ui.git

```

### Startup instructions

#### Server startup instructions

```bash
# Enter the go-admin backend project
cd ./go-admin

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
E:\go-admin>go build
# github.com/mattn/go-sqlite3
cgo: exec /missing-cc: exec: "/missing-cc": file does not exist
```

or

```bash
D:\Code\go-admin>go build
# github.com/mattn/go-sqlite3
cgo: exec gcc: exec: "gcc": executable file not found in %PATH%
```

[Solve the cgo problem and enter](https://doc.go-admin.dev/guide/other/faq.html#_5-cgo-exec-missing-cc-exec-missing-cc-file-does-not-exist)

:::

#### Initialize the database, and start the service

``` bash
# The first configuration needs to initialize the database resource information
# Use under macOS or linux
$ ./go-admin migrate -c=config/settings.dev.yml

# ⚠️Note: Use under windows
$ go-admin.exe migrate -c=config/settings.dev.yml

# Start the project, you can also use the IDE for debugging
# Use under macOS or linux
$ ./go-admin server -c config/settings.yml

# ⚠️Note: Use under windows
$ go-admin.exe server -c config/settings.yml
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


