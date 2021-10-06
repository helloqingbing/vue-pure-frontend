<template>
  <div class="devops-uicmd">
    <BasicLayout>
      <template #wrapper>
        <el-card>
          <el-form label-width="80px" :model="uiForm" :rules="rules" ref="uiForm">
            <el-form-item label="服务名称" inline="true">
              <el-select v-model="uiForm.clusterName" style="width: 50%;" filterable placeholder="服务名称" @focus="handleCluster" @change="clusterSelect">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="执行命令" inline="true">
              <el-select v-model="uiForm.cmdSelected" style="width: 50%;" placeholder="请选择" @change="handleCmdSelect" clearable filterable>
                <el-option label="INFO" value="info"></el-option>
                <el-option label="GET" value="get"></el-option>
                <el-option label="TTL" value="ttl"></el-option>
                <el-option label="SCAN" value="scan"></el-option>
                <el-option label="HGET" value="hget"></el-option>
                <el-option label="HGETALL" value="hgetall"></el-option>
                <el-option v-if="role == 'admin'" label="REBALANCE" value="rebalance"></el-option>
                <el-option v-if="role == 'admin'" label="USER-DEFINE" value="userdefine"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="参数列表" inline="true" >
              <el-input v-model="uiForm.cmdParams" style="width: 50%;" placeholder="请输入参数列表" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="handleExecCommand">执行</el-button>
            </el-form-item>
            <el-divider><i class="el-icon-mobile-phone"></i>执行结果</el-divider>
            <codemirror v-loading="loading" v-model="uiForm.output" class="code-mirror-out"
              ref="cmEditor"
              :value="uiForm.output"
              :options="cmOptions"
            />
          </el-form>
        </el-card>
      </template>
    </BasicLayout>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import waves from '@/directive/waves' // waves directive
// import base style
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

export default {
  components: {
    codemirror
  },
  data() {
    return {
      uiForm: {
        clusterName: '',
        cmdSelected: '',
        cmdParams: '',
        output: ''
      },
      cmOptions: {
        tabSize: 4,
        styleActiveLine: false,
        lineNumbers: true,
        styleSelectedText: true ,
        readOnly: true,
        line: true,
        mode: 'text/javascript',
        matchBrackets: true,
        theme: "monokai",
        lineWrapping: true,
        extraKeys: { "Ctrl": "autocomplete" }
      },
      options:[],
      role: this.$store.state.user.role
    }
  },
  created(){
    //this.getRole()
  },
  methods: {
    getRole(){
      var user = this.$store.state.user.email.replace("@xiaohongshu.com", "")
      var roleParams = {
        appName: 'redkvops',
        userName: user,
      }
      /*hasProperty(roleParams).then(response => {
        if(response.data.length > 0){
          this.role = 'admin'
        }else{
          this.role = ''
        }
      })*/
    },
    handleCluster(){
      getCluster().then(response =>{
        this.options = JSON.parse(response.data.name)
      })
    },
    handleExecCommand() {
      this.loading = true
      var cmdParam = {
        'cmd_type': this.cmdSelected,
        'cmd_to_run': this.cmdToRun
      }
      exeCmd(cmdParam).then(response => {
        this.form.output = response.data.result
        if (!this.form.output) {
          this.form.output = "<Empty>"
        }
        this.loading = false
      })
    },
    clusterSelect() {
      if(this.options.length == 0) handleCluster();
      this.cmdSelected = ''
      this.cmdToRun = ''
      this.form.output = ''
      this.finalCmd = ''
      this.getMKey = ''
      this.getKey = ''
    },
    handleCmdSelect(data) {
      this.cmdSelected = data;
      if (data == 'userdefine')
        return
      if (!this.clusterName) {
        this.$message({showClose: true, message: "请先选择集群的名称!", type: 'error'})
        return ;
      }
      if(this.cmdSelected == 'info') {
        this.getMKey = ''
        this.getKey = ''
        this.getCmd = ''
        this.infoFunction()

      } else if (this.cmdSelected == 'get' || this.cmdSelected == 'hget' || this.cmdSelected == 'ttl' || this.cmdSelected == 'hgetall' || this.cmdSelected == 'scan') {
        this.cmdToRun = ""
      }else if (this.cmdSelected == 'rebalance'){
        this.cmdToRun = ""
      }
      this.getMKey = ''
      this.getKey = ''
      this.cmdToRun = ''
      this.finalCmd = ''
      this.form.output = ''
    },
    getFunction(queryParams) {
      this.finalCmd = ''
      var that = this
      if (!this.getKey || (this.cmdSelected == 'hget' && (!this.getKey || !this.getMKey)) || (this.cmdSelected == 'scan' && (!this.getKey))) {
        this.$message({showClose: true, message: "请先输入要查询的Key!", type: 'error'})
        return ;
      }
      this.getDialog = true
      var queryParams = {
        'name': this.clusterName,
        'cmd': this.cmdSelected
      }
      getHostInfo(queryParams).then(response =>{
        if (queryParams.cmd == 'hget') {
          that.cmdToRun = response.data.cmd_to_run + that.getKey + " " + that.getMKey
        } else if (queryParams.cmd == 'scan') {
          if (that.getKey) that.cmdToRun = response.data.cmd_to_run + " " + that.getKey
          if (that.getMKey) that.cmdToRun += " match " + that.getMKey
          if (that.getCount) that.cmdToRun += " count " + that.getCount
        } else {
          that.cmdToRun = response.data.cmd_to_run + that.getKey
        }
        //this.cmdToRun = "redis-cli -h "+this.clusterInfo.host +" -p "+this.clusterInfo.port+" -c get " + this.getKey
      })
    },
    cmdFunction() {
      this.finalCmd = ''
      if (!this.getCmd) {
        this.$message({showClose: true, message: "请先输入要执行的命令!", type: 'error'})
        return ;
      }
      this.getDialog = true
      this.cmdToRun = this.finalCmd = this.getCmd
    },
    infoFunction(queryParams) {
      this.finalCmd = ""
      if (!this.clusterName) {
        this.$message({showClose: true, message: "请先选择集群的名称!", type: 'error'})
        return ;
      }
      var queryParams = {
        'name': this.clusterName,
        'cmd': this.cmdSelected
      }
      this.infoDialog = true
      getHostInfo(queryParams).then(response => {
        this.cmdToRun = response.data.cmd_to_run
      })

    },
    rebalanceFunction(){
      this.finalCmd = ""
      this.finalCmd = ""
      if (!this.clusterName) {
        this.$message({showClose: true, message: "请先选择集群的名称!", type: 'error'})
        return ;
      }
      this.infoDialog = true
      var queryParams = {
        'name': this.clusterName,
        'cmd': this.cmdSelected
      }
      getHostInfo(queryParams).then(response =>{
        if(this.checked == false){
          this.cmdToRun = response.data.cmd_to_run
        }else if(this.checked == true){
          this.cmdToRun = response.data.cmd_to_run + " do_balance"
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.devops-uicmd {
  .el-card {
    height: calc(100vh - 113px);
  }
  .code-mirror-out {
    font-size : 16px;
    overflow: scroll !important;
    .CodeMirror {
      height: calc(100vh - 100px);
    }
  }
}
</style>
