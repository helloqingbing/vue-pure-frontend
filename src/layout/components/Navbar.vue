<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb v-if="!topNav" id="breadcrumb-container" class="breadcrumb-container" />
    <top-nav v-if="topNav" id="topmenu-container" class="breadcrumb-container" />

    <div class="right-menu">
      <div class="right-menu-item duty">
        <svg-icon icon-class='duty'/>
        <span class="content">今日值班：{{onduty}}</span>
		<span class="content">BACKUP：{{backupOne}}</span>
        <svg-icon icon-class='wechat'/>
        <span class="content">RedKV服务号</span>
      </div>
      <template v-if="device!=='mobile'">
        <!--search id="header-search" class="right-menu-item" /-->
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover">
        <div class="avatar-wrapper">
          <img src="@/assets/logo/avatar.jpeg" class="user-avatar">
		  <span class="user-avatar-title">{{this.$store.state.user.name}}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/dashboard">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import {getDutyData} from '@/api/xhst'
//import Search from '@/components/HeaderSearch'

export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull
    //Search
  },

  data() {
    return {
      onduty: "云哲（李清炳）",
      backupOne: "烦了（刘军）"
    }
  },
  created() {
    this.getDuty()
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    }

  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    getDuty() {
      var that = this;
      getDutyData().then(response => {
        var duty = response.data
        if (duty && duty.length >= 1) {
          that.onduty = duty[0].userName
          that.backupOne = duty[0].backupOne
        } else {
          that.onduty = "云哲（李清炳）"
          that.backupOne = "烦了（刘军）"
        }
      })
    },
    async logout() {
      this.$store.dispatch('user/LogOut').then(() => {
        location.reload()
      })
      /*this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/LogOut').then(() => {
          location.reload()
        })
      })*/
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
    .svg-icon {
      width: 24px;
      height: 24px;
      margin: -5px 5px;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 16px;
      color: #5a5e66;
      vertical-align: text-bottom;

    .content {
      margin-right: 10px;
      font-size: 15px;
    }

      &.duty {
        color: red;
        font-weight:bold;
      }

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 20px;

      .avatar-wrapper {
	    display: flex;
        position: relative;

	    .user-avatar-title {
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 15px;
          margin-left: 5px;
        }
        .user-avatar {
          cursor: pointer;
          margin-top: 5px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #DDD;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 15px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
