<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick" >
          <el-tab-pane v-for="item in  tabMapOptions" :key="item.key" :label="item.label" :name="item.key"></el-tab-pane>
        </el-tabs>
        <dashboard v-if="activeName == 'tabs-dashboard'"></dashboard>
        <corvus v-if="activeName == 'tab-corvus'"></corvus>
        <candy v-if="activeName == 'tab-candy'"></candy>
        <redkv v-if="activeName == 'tab-redkv'"></redkv>
      </el-card>
    </template>
   </BasicLayout>
</template>

<script>
import Candy from "./components/Candy"
import Corvus from "./components/Corvus"
import RedKV from "./components/RedKV"
import Dashboard from "./components/Dashboard"

export default {
  name: 'Tab',
  components: {
    candy: Candy,
    corvus: Corvus,
    dashboard: Dashboard,
    redkv: RedKV
  },
  data() {
    return {
      tabMapOptions: [
        { label: "Corvus报警", key: 'corvus', name: 'tab-corvus'},
        { label: "RedKV集群", key: 'redkv', name: 'tab-redkv'},
        { label: "探针报警", key: 'candy', name: 'tab-candy'},
        { label: "报警大盘", key: 'dashboard', name: 'tabs-dashboard'}
      ],
      activeName: "tab-dashboard" // activeName 设置默认tab 对应name
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.activeName)
    }
  }
}
</script>

<style>
</style>
