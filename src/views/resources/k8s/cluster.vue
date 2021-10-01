<template>
  <div class="resource-k8s-cluster">
    <BasicLayout>
      <template #wrapper>
        <el-card>
          <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button

                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
              >新增</el-button>
            </el-col>

            <el-col :span="1.5">
              <el-button

                type="warning"
                icon="el-icon-download"
                size="mini"
                @click="handleExport"
              >导出</el-button>
            </el-col>
          </el-row>
        </el-card>
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
                  <Cell label="CPU主频" :value="info.cpu.cpuInfo[0].modelName" border />
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
import Cell from '@/components/Cell/index'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'Monitor',
  components: {
    Cell
  },
  data() {
    return {
      info: {
        cpu: {
        Percent:4.58,
        cpuInfo:[{
          cpu:0,
          vendorId:"GenuineIntel",
          family:"6",
          model:"85",
          stepping:4,
         }],
         cpuNum:1,
        },
        disk:{free:27,total:39},
        mem:{free:0,total:0,usage:85,used:0},
        os:{arch:"amd64",compiler:"gc"}
      }
    }
  },
  created() {
    //this.getServerInfo()
  },
  methods: {
    getServerInfo() {
      /*getServer().then(ret => {
        if (ret.code === 200) {
          this.info = ret
        }
      })*/
    },
    handleAdd() {

    },
    handleExport() {

    }
  }
}
</script>

<style>

</style>
