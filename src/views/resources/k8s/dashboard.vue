<template>
  <div class="resource-k8s-dashboard">
    <BasicLayout>
      <template #wrapper>
        <el-row :gutter="10" class="mb10">
          <el-col :sm="24" :md="8">
            <el-card v-if="info.cpu" class="box-card">
              <div slot="header" class="clearfix">
                <span>CPU使用率</span>
              </div>
              <div class="monitor">
                <div class="monitor-header">
                  <el-progress :color="$store.state.settings.theme" type="circle" :percentage="info.cpu.Percent" />
                </div>
                <div class="monitor-footer">
                  <Cell label="CPU主频" :value="info.cpu.cpuInfo[0].modelName.split('@ ')[1]" border />
                  <Cell label="核心数" :value="`${info.cpu.cpuInfo[0].cores}`" />
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :sm="24" :md="8">
            <el-card v-if="info.mem" class="box-card">
              <div slot="header" class="clearfix">
                <span>内存使用率</span>
              </div>
              <div class="monitor">
                <div class="monitor-header">
                  <el-progress :color="$store.state.settings.theme" type="circle" :percentage="info.mem.usage" />
                </div>
                <div class="monitor-footer">
                  <Cell label="总内存" :value="info.mem.total+'G'" border />
                  <Cell label="已用内存" :value="info.mem.used+'G'" />
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :sm="24" :md="8">
            <el-card v-if="info.disk" class="box-card">
              <div slot="header" class="clearfix">
                <span>磁盘信息</span>
              </div>
              <div class="monitor">
                <div class="monitor-header">
                  <el-progress :color="$store.state.settings.theme" type="circle" :percentage=" Number(( (info.disk.total-info.disk.free) / info.disk.total * 100).toFixed(2))" />
                </div>
                <div class="monitor-footer">
                  <Cell label="总磁盘" :value="info.disk.total+'G'" border />
                  <Cell label="已用磁盘" :value="info.disk.total-info.disk.free+'G'" />
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </template>
    </BasicLayout>
  </div>
</template>

<script>

import waves from '@/directive/waves' // waves directive

export default {
  name: "Dashboard",
  directives: { waves },
  data () {
    return {

    }
  },
  computed: {

  },
  mounted() {

  },
  created() {

  },
  methods: {

  }
}
</script>

<style>

</style>
