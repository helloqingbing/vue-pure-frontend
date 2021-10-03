<template>
  <div style="margin:20px">
    <div class='user-panel'>
      <el-dialog title="要执行的命令" :visible.sync="infoDialog" customClass="cmd-dialog">
        <div class="cmddiv">
          <span class="cmd">{{cmdToRun}} </span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="infoDialog = false">取 消</el-button>
          <el-button type="primary" @click="finalCmd = cmdToRun; infoDialog = false">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="要执行的命令" :visible.sync="getDialog" customClass="cmd-dialog">
        <div class="cmddiv">
          <span class="cmd">{{cmdToRun}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="getDialog = false">取 消</el-button>
          <el-button type="primary" @click="finalCmd = cmdToRun; getDialog = false">确 认</el-button>
        </span>
      </el-dialog>

      <el-card class="box-card">
        <el-form>
          <el-form-item v-if="cmdSelected != 'userdefine'" label="服务名称">
            <el-select v-model="clusterName" filterable placeholder="服务名称"  style="width:400px" @focus="handleCluster" @change="clusterSelect">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执行命令">
            <el-select v-model="cmdSelected" placeholder="请选择" style="width:400px" @change="handleCmdSelect" clearable filterable>
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
          <el-form-item label="参数列表" inline="true">
            <el-input v-model="getKey" placeholder="请输入要查询的Key" style="width:80%" clearable></el-input>

          </el-form-item>
          <el-divider></el-divider>
          <el-form-item>
            <el-button class="filter-item" type="primary" @click="handleExecCommand">执行</el-button>
          </el-form-item>
          <el-form-item v-loading="loading">
            <codemirror  v-loading="loading" v-model="form.output" class="code-mirror-out"
              ref="cmEditor"
              :value="form.output"
              :options="cmOptions"
            />
          </el-form-item>
        </el-form>
        <el-drawer
          title="命令列表"
          :with-header="false"
          :visible.sync="drawer"
          direction="rtl">
            <div class="drawer-item">
              <el-input placeholder="请搜索命令" prefix-icon="el-icon-search"> </el-input>
            </div>
        </el-drawer>
      </el-card>
    </div>
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
      checked: false,
      loading: false,
      checked:false,
      drawer: false,
      clusterName: '',
      form: {
        cmd: '',
        output: ''
      },
      cmOptions: {
        tabSize: 4,
        styleActiveLine: false,
        lineNumbers: true,
        styleSelectedText: false,
        readOnly: true,
        line: true,
        mode: 'text/javascript',
        theme: "monokai",
        lineWrapping: true,
        extraKeys: { "Ctrl": "autocomplete" }
      },
      infoDialog: false,
      getDialog: false,
      getKey:'',
      getMKey: '',
      getCount: 100,
      getCmd:'',
      cmdSelected:'',
      cmdToRun:'',
      finalCmd:'',
      options:[],
      role: this.$store.state.user.role
    }
  },
  created(){
    this.getRole()
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

<style>
.text {
  font-size: 14px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.el-button{
  height: auto;
}
.grid-content {
  border-radius: 4px;
  border: 1px solid #CCC;
  text-align: center;
  min-height: 36px;
  padding: 10px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.user-panel {
  margin-top: 10px
}
.drawer-item {
  margin: 30px 10px 0 10px;
}

.el-row-item {
  padding: 5px;
}
.code-mirror-out{
  font-size : 16px;
  line-height : 110%;
}
.cmddiv {
  max-height:400px;
  width:100%;
  background-color: #333;
  border: 1px solid black;
  border-redius: 15px;
  padding: 5px;
}
.cmd {
  font: 16px/20px Monospace;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  color:#FFF;
  margin: 5px;
  background-color: #333;
}
.el-card__header {
  padding:0 10px;
  background-color:#304156;
  height: 40px;
  line-height: 40px;
  color: white;
}
.cmd-dialog {
  width:800px;
}
.cmd-dialog-get {
  width:400px;
}
</style>
