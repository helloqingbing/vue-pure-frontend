<template>
  <div class="resource-k8s-cluster">
    <BasicLayout>
      <template #wrapper>
        <el-card>
          <el-row :gutter="10" class="action">
            <el-col :span="1.5">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">新增</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button type="warning" icon="el-icon-download" size="small" @click="handleExport">导出</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-dialog v-dialogDrag :title="'新增K8S集群'" :visible.sync="k8sDialogVisible" :fullscreen="false" width="500px">
              <el-form :model="k8sCluster" :rules="rules" ref="k8sClusterForm" label-position="right" label-width="80px">
                <el-form-item label="集群名称" prop="clusterName">
                  <el-input v-model="k8sCluster.clusterName"></el-input>
                </el-form-item>
                <el-form-item label="AZone">
                  <el-input v-model="k8sCluster.azone"/>
                </el-form-item>
                <el-form-item label="厂商">
                  <el-select v-model="k8sCluster.producer" placeholder="请选择" clearable filterable allow-create>
                    <el-option v-for="item in producerOptions"
                      :icon="item.icon" :key="item.value" :label="item.label" :value="item.value">
                      <span style="float: left"><svg-icon :icon-class="item.icon"></svg-icon>&nbsp;{{ item.label }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="ENV">
                  <el-input v-model="k8sCluster.env"/>
                </el-form-item>
                <el-form-item label="CBS">
                  <el-input v-model="k8sCluster.cbs"/>
                </el-form-item>
              </el-form>
              <span slot="footer">
                <el-button size="small" @click="k8sDialogVisible = false">取 消</el-button>
                <el-button type="primary" size="small" @click="handleAddK8SCluster('k8sClusterForm')">保存</el-button>
              </span>
            </el-dialog>
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
      k8sDialogVisible: false,
      k8sCluster: {
        clusterName: "",
        azone: ""
      },
      producerOptions: [
        {label: "腾讯云", value: "TecentCloud", icon: "tecentcloud"},
        {label: "华为云", value: "HuaweiCloud", icon: "huaweicloud"},
        {label: "阿里云", value: "Aliyun", icon: "aliyun"}
      ],
      rules: {
        name: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
      },
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
      this.k8sDialogVisible = true
    },
    handleAddK8SCluster() {

    },
    handleExport() {

    }
  }
}
</script>

<style lang="scss" scoped>
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
  .el-dialog__wrapper {
    ::v-deep .el-dialog__header {
      padding: 10px;
      background-color: #304156;
      color: white;
      .el-dialog__headerbtn, .el-icon-close {
        margin-top: -5px;
        color: white;
      }
      .el-dialog__title {
        color: white;
      }
    }
    ::v-deep .el-dialog__footer {
      padding: 10px;
      border-top: 1px solid #D1DBE5;
    }
    ::v-deep .el-dialog__body {
      padding: 20px 40px;
    }
  }
}
</style>
