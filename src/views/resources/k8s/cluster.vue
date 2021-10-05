<template>
  <div class="resource-k8s-cluster">
    <BasicLayout>
      <template #wrapper>
        <el-card>
          <el-row :gutter="10" class="action">
            <el-col :span="1.5">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="handleAdd"
              >新增</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="warning"
                icon="el-icon-download"
                size="small"
                @click="handleExport"
              >导出</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <draggable v-model="myArray" draggable=".item">
                <div v-for="element in myArray" :key="element.id" class="item">
                    <el-col :sm="24" :md="8">
                      <el-card shadow="never">
                        <div slot="header" class="clearfix">
                          <span>{{element.title}}</span>
                        </div>
                        <div class="monitor">
                          <div class="monitor-header" style="text-align: center;">
                            <el-progress :color="element.c" type="circle" :percentage="element.data" />&nbsp;&nbsp;
                            <el-progress :color="element.c" type="circle" :percentage="element.data" />
                          </div>
                          <div class="monitor-footer">
                            <Cell label="机器台数" :value="element.l1" border/>
                            <Cell label="服务总数" :value="element.l2" border/>
                            <Cell label="厂商" :value="element.l2" border/>
                            <Cell label="AZone" :value="element.l2" border/>
                            <Cell label="NameSpace" :value="element.l2" border/>
                            <Cell label="Env" :value="element.l2" border/>
                            <Cell label="CBS" :value="element.l2" border/>
                          </div>
                        </div>
                      </el-card>
                    </el-col>
                </div>
            </draggable>
          </el-row>
        </el-card>
      </template>
    </BasicLayout>
  </div>
</template>

<script>
import Cell from '@/components/Cell/index'
import waves from '@/directive/waves' // waves directive
import draggable from 'vuedraggable'
export default {
  name: 'Monitor',
  components: {
    draggable,
    Cell
  },
  data() {
    return {
      myArray:[{
        id: 1,
        title: 'cls-hbsmzlul-2905526316-context-default',
        data: 34,
        l1: '200',
        l2: '100',
        c: '#453234'
      },{
        id: 2,
        title: 'cls-cbrnj8b9-2905526316-context-default',
        data: 54,
        l1: '150',
        l2: '66',
        c: '#433234'
      },{
        id: 3,
        title: 'sh_prod_redis',
        data: 74,
        l1: '456',
        c: '#233234',
        l2: '234'
      }]
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

<style lang="scss">
.resource-k8s-cluster {
  .action {
    margin-bottom: 15px;
  }
  .clearfix:before, .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
}
</style>
