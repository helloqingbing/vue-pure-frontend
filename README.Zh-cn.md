# go-admin

  <img align="right" width="320" src="https://gitee.com/mydearzwj/image/raw/master/img/go-admin.svg">


[![Build Status](https://github.com/wenjianzhang/go-admin/workflows/build/badge.svg)](https://github.com/go-admin-team/go-admin)
[![Release](https://img.shields.io/github/release/go-admin-team/go-admin.svg?style=flat-square)](https://github.com/go-admin-team/go-admin/releases)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/go-admin-team/go-admin)

[English](https://github.com/go-admin-team/go-admin/blob/master/README.md) | 简体中文


基于Gin + Vue + Element UI的前后端分离权限管理系统,系统初始化极度简单，只需要配置文件中，修改数据库连接，系统支持多指令操作，迁移指令可以让初始化数据库信息变得更简单，服务指令可以很简单的启动api服务

[在线文档](https://doc.go-admin.dev)

[github在线文档](https://wenjianzhang.github.io)

[gitee在线文档](http://mydearzwj.gitee.io/go-admin-doc/)

[后端项目](https://github.com/go-admin-team/go-admin)

[视频教程](https://space.bilibili.com/565616721/channel/detail?cid=125737)

## ✨ 特性

- 遵循 RESTful API 设计规范

- 基于 GIN WEB API 框架，提供了丰富的中间件支持（用户认证、跨域、访问日志、追踪ID等）

- 基于Casbin的 RBAC 访问控制模型

- JWT 认证

- 支持 Swagger 文档(基于swaggo)

- 基于 GORM 的数据库存储，可扩展多种类型数据库 

- 配置文件简单的模型映射，快速能够得到想要的配置

- 代码生成工具

- 表单构建工具

- 多指令模式

- TODO: 单元测试


## 🎁 内置

1. 用户管理：用户是系统操作者，该功能主要完成系统用户配置。
2. 部门管理：配置系统组织机构（公司、部门、小组），树结构展现支持数据权限。
3. 岗位管理：配置系统用户所属担任职务。
4. 菜单管理：配置系统菜单，操作权限，按钮权限标识，接口权限等。
5. 角色管理：角色菜单权限分配、设置角色按机构进行数据范围权限划分。
6. 字典管理：对系统中经常使用的一些较为固定的数据进行维护。
7. 参数管理：对系统动态配置常用参数。
8. 操作日志：系统正常操作日志记录和查询；系统异常信息日志记录和查询。
9. 登录日志：系统登录日志记录查询包含登录异常。
1. 接口文档：根据业务代码自动生成相关的api接口文档。
1. 代码生成：根据数据表结构生成对应的增删改查相对应业务，全程可视化操作，让基本业务可以零代码实现。
1. 表单构建：自定义页面样式，拖拉拽实现页面布局。
1. 服务监控：查看一些服务器的基本信息。
1. 内容管理：demo功能，下设分类管理、内容管理。可以参考使用方便快速入门。

## 准备工作

你需要在本地安装 [go] [gin] [node](http://nodejs.org/) 和 [git](https://git-scm.com/) 

同时配套了系列教程包含视频和文档，如何从下载完成到熟练使用，强烈建议大家先看完这些教程再来实践本项目！！！

### 轻松实现go-admin写出第一个应用 - 文档教程

[步骤一 - 基础内容介绍](http://doc.zhangwj.com/go-admin-site/guide/intro/tutorial01.html)

[步骤二 - 实际应用 - 编写增删改查](http://doc.zhangwj.com/go-admin-site/guide/intro/tutorial02.html) 

### 手把手教你从入门到放弃 - 视频教程 

[如何启动go-admin](https://www.bilibili.com/video/BV1z5411x7JG)

[使用生成工具轻松实现业务](https://www.bilibili.com/video/BV1Dg4y1i79D)

[v1.1.0版本代码生成工具-释放双手](https://www.bilibili.com/video/BV1N54y1i71P) [进阶]

[多命令启动方式讲解以及IDE配置](https://www.bilibili.com/video/BV1Fg4y1q7ph)

[go-admin菜单的配置说明](https://www.bilibili.com/video/BV1Wp4y1D715) [必看]

[如何配置菜单信息以及接口信息](https://www.bilibili.com/video/BV1zv411B7nG) [必看]

[go-admin权限配置使用说明](https://www.bilibili.com/video/BV1rt4y197d3) [必看]

[go-admin数据权限使用说明](https://www.bilibili.com/video/BV1LK4y1s71e) [必看]


**如有问题请先看上述使用文档和文章，若不能满足，欢迎 issue 和 pr ，视频教程和文档持续更新中**

## 📦 本地开发

### 开发目录创建

```bash

# 创建开发目录
mkdir goadmin
cd goadmin
```

### 获取代码

> 重点注意：两个项目必须放在同一文件夹下；

```bash
# 获取后端代码
git clone https://github.com/go-admin-team/go-admin.git

# 获取前端代码
git clone https://github.com/go-admin-team/go-admin-ui.git

```


### 启动说明

#### 服务端启动说明

```bash
# 进入 go-admin 后端项目
cd ./go-admin

# 编译项目
go build

# 修改配置 
# 文件路径  go-admin/config/settings.yml
vi ./config/setting.yml 

# 1. 配置文件中修改数据库信息 
# 注意: settings.database 下对应的配置数据
# 2. 确认log路径
```

:::tip ⚠️注意 在windows环境如果没有安装中CGO，会出现这个问题；

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

[解决cgo问题进入](https://doc.go-admin.dev/guide/other/faq.html#_5-cgo-exec-missing-cc-exec-missing-cc-file-does-not-exist)

:::

#### 初始化数据库，以及服务启动

``` bash
# 首次配置需要初始化数据库资源信息
# macOS or linux 下使用
$ ./go-admin migrate -c=config/settings.dev.yml

# ⚠️注意:windows 下使用
$ go-admin.exe migrate -c=config/settings.dev.yml


# 启动项目，也可以用IDE进行调试
# macOS or linux 下使用
$ ./go-admin server -c config/settings.yml


# ⚠️注意:windows 下使用
$ go-admin.exe server -c config/settings.yml
```

#### 使用docker 编译启动

```shell
# 编译镜像
docker build -t go-admin .

# 启动容器，第一个go-admin是容器名字，第二个go-admin是镜像名称
# -v 映射配置文件 本地路径：容器路径
docker run --name go-admin -p 8000:8000 -v /config/settings.yml:/config/settings.yml -d go-admin-server
```



#### 文档生成

```bash
go generate
```

#### 交叉编译
```bash
# windows
env GOOS=windows GOARCH=amd64 go build main.go

# or
# linux
env GOOS=linux GOARCH=amd64 go build main.go
```

### UI交互端启动说明

```bash
# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

## 🎬 在线体验
> admin  /  123456

演示地址：[http://www.go-admin.dev](http://www.go-admin.dev/#/login)

