<template>
  <div class="devops-build">
    <BasicLayout>
      <template #wrapper>
        <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick" >
          <el-tab-pane v-for="item in  tabMapOptions" :key="item.label" :label="item.label" :name="item.key">
          </el-tab-pane>
        </el-tabs>
        <tabregister v-if="activeName == 'register-project'"></tabregister>
        <tabbuild v-if="activeName == 'build-history'"></tabbuild>
        <tabimage v-if="activeName == 'image-history'"></tabimage>
        </el-card>
      </template>
    </BasicLayout>
  </div>
</template>

<script>

import Build from "./components/build"
import Register from "./components/register"
import Image from "./components/image"
import waves from '@/directive/waves' // waves directive

export default {
  name: 'Build',
  components: {
    tabbuild: Build,
    tabregister: Register,
    tagImage: Image
  },
  directives: { waves },
  data() {
    return {
      tabMapOptions: [
        { label: "注册分支", key: 'register-project'},
        { label: "构建历史", key: 'build-history'},
        { label: "构建镜像", key: 'build-image'},
      ],
      activeName: "register-project" // activeName 设置默认tab 对应name
    }
  },
  methods: {
    handleClick() {

    },
    updateActiveName(newName){
      this.activeName = newName
    }
  },
  provide(){
    return{
      updateActiveName:this.updateActiveName
    }
  }
}
</script>

<style>

</style>
