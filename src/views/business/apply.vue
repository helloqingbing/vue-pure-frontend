<template>
  <BasicLayout>
    <template #wrapper>
      <el-collapse v-model="activeNames">
        <el-collapse-item  class='business-panel' name="1">
            <template slot="title">
                <span class="left">业务需求</span>
                <span class="right">
                  <i class="el-icon-view"></i>&nbsp;<el-link :underline="false" href="https://wiki.xiaohongshu.com/pages/viewpage.action?pageId=101320948" type="success" target="_blank">RedKV业务接入参考</el-link>
                  <i class="el-icon-info"></i>&nbsp;<el-link :underline="false" href="https://wiki.xiaohongshu.com/pages/viewpage.action?pageId=101320957" type="danger" target="_blank">RedKV申请规范</el-link>
                </span>
            </template>
            <div class="business-form">
              <el-form :model="businessForm" :rules="rules" ref="business_form" label-position="right" label-width="80px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="所属业务" prop="owner">
                      <el-cascader ref="tree" v-model="businessForm.owner" :options="business" :props="{ expandTrigger: 'hover' }"  placeholder="选择服务树路径" @change="handleCas"></el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="应用等级">
                      <el-select v-model="businessForm.level" filterable default-first-option placeholder="请选择" >
                        <el-option key="S0" label="S0" value="S0"></el-option>
                        <el-option key="S1" label="S1" value="S1"></el-option>
                        <el-option key="S2" label="S2" value="S2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="应用名称" prop="name">
                      <el-input placeholder="业务名称" v-model="businessForm.name" @blur="handleClusterName"><template slot="prepend">redkv-</template></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="紧急程度" prop="emergency">
                        <el-select v-model="businessForm.emergency" filterable allow-create default-first-option placeholder="可以选择，也可以自定义">
                          <el-option v-for="item in urgentlist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="QPS" prop="qps">
                      <el-select v-model="businessForm.qps" filterable allow-create default-first-option placeholder="RedKVQPS非业务QPS">
                        <el-option v-for="item in qpslist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="平均延时" prop="latency">
                        <el-select v-model="businessForm.latency" filterable allow-create default-first-option placeholder="可以选择，也可以自定义">
                          <el-option v-for="item in latlist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="P99" prop="p99">
                      <el-select v-model="businessForm.p99" filterable allow-create default-first-option placeholder="可以选择，也可以自定义">
                        <el-option v-for="item in p99list" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                    <el-col :span="6">
                    <el-form-item label="数据总量" prop="size">
                        <el-select v-model="businessForm.size" filterable allow-create default-first-option placeholder="可以选择，也可以自定义">
                          <el-option v-for="item in datasizelist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="集群命令" prop="cmd">
                      <el-select v-model="businessForm.cmd" multiple allow-create filterable default-first-option  placeholder="请选择">
                        <el-option v-for="item in cmdlist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="配置主从" prop="master_slave">
                      <el-radio-group v-model="businessForm.master_slave">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="TTL" prop="ttl">
                      <el-radio-group  v-model="businessForm.ttl">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="读主写主" prop="rwm">
                      <el-radio-group v-model="businessForm.rwm">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="补充说明" prop="info">
                    <el-input v-model="businessForm.info" type="textarea" placeholder="业务介绍或其他需求补充"></el-input>
                   </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-edit" size="small" @click="submitBusiness('business_form')">提交</el-button>
                    <el-button icon="el-icon-refresh" size="small" @click="resetForm('business_form')">重置</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-card class="business-list-panel">
        <el-input class="b-search" v-model="searchInput" prefix-icon="el-icon-search" clearable  placeholder="输入查询的字符"></el-input>
        <el-table class="b-search-table" :header-cell-style="tableHeaderColor" border>
          <el-table-column prop="create_time" label="任务ID" width="160px">
            <template slot-scope="scope">
              {{scope.row.create_time.replace("T", "").replace(/-/g,"").replace(/:/g,"")}}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" width="280">
            <template slot-scope="scope">
              <el-tag style="font:14px Monospace;padding:2px;word-wrap:break-all;">{{scope.row.name}}
              <el-tooltip style="margin:0" effect="light" placement="right-end">
                <i class="el-icon-info" v-show="scope.row.info!=''"/>
                <p slot="content" style="margin:0" effect="light">{{scope.row.info}}</p>
              </el-tooltip> </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="owner" label="所属业务"> </el-table-column>
          <el-table-column prop="path" label="路径" >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.path" style="font:14px Monospace;padding:2px;word-wrap:break-all;">{{scope.row.path}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="applicant" label="申请人" width="80px"></el-table-column>
          <el-table-column prop="responser" label="审核人" width="80px"></el-table-column>
          <el-table-column prop="status" label="状态" width="80px" align="center"> </el-table-column>
          <el-table-column label="操作" width="100px" align="center">
            <template slot-scope="scope">
              <div v-if="role=='admin'">
                <div v-if="scope.row.status=='审核中'">
                  <el-button type="primary" plain @click="checkDetail(scope.row)">开始审批 </el-button>
                </div>
                <div v-else-if="scope.row.status=='已退回'">
                  <el-button type="danger" plain @click="refineBusiness(scope.row)">修改申请 </el-button>
                </div>
                <div v-else>
                  <el-button type="success" plain @click="checkDetail(scope.row)">查看详情 </el-button>
                </div>
              </div>
              <div v-else>
                <div v-if="scope.row.status=='已退回'">
                  <el-button type="danger" plain @click="refineBusiness(scope.row)">修改申请 </el-button>
                </div>
                <div v-else>
                  <el-button type="success" plain @click="checkDetail(scope.row)">查看详情 </el-button>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin:10px 0; float:right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,20, 50, 100]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalSize">
          </el-pagination>
        </div>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import { getXHSTreeFormTreeService } from '@/api/xhst'
//import { getBusiness, saveBusiness, updateBusiness, isValidClusterName} from '@/api/business'
import { parse } from 'path-to-regexp'
import variables from '@/styles/variables.scss';

export default {
  data() {
    return {
      activeNames: ['1'],
	    radio: 1,
      xhstree:"",
      business:[],
      qpslist: [
        { value: '< 1w', label: '< 1w' },
        { value: '[1w, 10w)', label: '[1w, 10w)' },
        { value: '[10w, 20w)', label: '[10w, 20w)' },
        { value: '[20w, 30w)', label: '[20w, 30w)' },
        { value: '[30w, 40w)', label: '[30w, 40w)' },
        { value: '[40w, 50w)', label: '[40w, 50w)' },
        { value: '[50w, 100w)', label: '[50w, 100w)' },
        { value: '[100w, 200w)', label: '[100w, 200w)' },
        { value: '[200w, 300w)', label: '[200w, 300w)' },
        { value: '[300w, 400w)', label: '[300w, 400w)' },
        { value: '[400w, 500w)', label: '[400w, 500w)' },
        { value: '[500w, 600w)', label: '[500w, 600w)' },
        { value: '> 600w', label: '> 600w' }
      ],
      latlist: [
        { value: '< 1ms', label: '< 1ms' },
        { value: '[1ms, 5ms)', label: '[1ms, 5ms)' },
        { value: '[5ms, 10ms)', label: '[5ms, 10ms)' },
        { value: '[10ms, 30ms)', label: '[10ms, 30ms)' },
        { value: '[30ms, 50ms)', label: '[30ms, 50ms)' },
        { value: '>=50ms', label: '>=50ms' }
      ],
	    p99:"",
      p99list: [
        { value: '< 1ms', label: '< 1ms' },
        { value: '[1ms, 5ms)', label: '[1ms, 5ms)' },
        { value: '[5ms, 10ms)', label: '[5ms, 10ms)' },
        { value: '[10ms, 30ms)', label: '[10ms, 30ms)' },
        { value: '[30ms, 50ms)', label: '[30ms, 50ms)' },
        { value: '>=50ms', label: '>=50ms' }
      ],
	    datasize:"",
      datasizelist: [
        { value: '< 500GB', label: '< 500GB' },
        { value: '[500GB, 1TB)', label: '[500GB, 1TB)' },
        { value: '[1TB, 2TB)', label: '[1TB, 2TB)' },
        { value: '[2TB, 3TB)', label: '[2TB, 3TB)' },
        { value: '[3TB, 4TB)', label: '[3TB, 4TB)' },
        { value: '[4TB, 5TB)', label: '[4TB, 5TB)' },
        { value: '[5TB, 10TB)', label: '[5TB, 10TB)' },
        { value: '[10TB, 20TB)', label: '[10TB, 20TB)' },
        { value: '[20TB, 50TB)', label: '[20TB, 50TB)' },
        { value: '[50TB, 80TB)', label: '[50TB, 80TB)' },
        { value: '[80TB, 100TB)', label: '[80TB, 100TB)' },
        { value: '>=100TB', label: '>=100TB' }
      ],
      cmd:"",
      cmdlist: [
        { value: 'string', label: 'string' },
        { value: 'hash', label: 'hash' },
        { value: 'zset', label: 'zset' },
      ],
	    urgent:"",
      urgentlist: [
        { value: '2 天', label: '2 天' },
        { value: '1 周', label: '1 周内' },
        { value: '2 周', label: '2 周内' }
      ],
      searchInput: "",
      listQuery: {
        skip: 0,
        limit: 10
      },
      screen_width: 0,
      currentPage: 1,
      pageSize: 20,
      businessData:[],
      businessData1:[],
      totalSize: 0,
      businessForm: {
        name:'',
        owner:'',
        tree_path: '',
        level:'S1',
        emergency:'',
        qps:'',
        latency:'',
        p99:'',
        size:'',
        cmd:[],
        master_slave: 1,
        ttl:1,
        rwm:0,
        info: '',
        applicant:this.$store.state.user.name,
        applicant_email: this.$store.state.user.email,
        status: '审核中',
        uid:'',
        pid:'',
        path: ''
      },
      business_label:'',
      rules: {
        name: [ { required: true, message: '请输入应用名称', trigger: 'blur' } ],
        owner:[ { required: true, message: '请选择所属业务', trigger: 'change' } ],
        emergency: [ { required: true, message: '请选择紧急程度', trigger: 'change' } ],
        qps: [ { required: true, message: '请选择QPS的范围', trigger: 'change' } ],
        latency: [ { required: true, message: '请选择平均延时的范围', trigger: 'change' } ],
        p99: [ { required: true, message: '请选择P99的范围', trigger: 'change' } ],
        size: [ { required: true, message: '请选择数据总量所在范围', trigger: 'change' } ],
        cmd: [ { required: true, message: '请选择集群命令', trigger: 'change' } ],
        ttl: [ { required: true, message: '请选择是否支持时间戳', trigger: 'change' } ],
        rwm: [ { required: true, message: '请选择是否读主写主', trigger: 'change' } ],
        master_slave: [ { required: true, message: '请选择是否需要主备', trigger: 'change' } ],
        info: [ { required: true, message: '请输入业务介绍', trigger: 'blur' } ]
      },
      user:this.$store.state.user.name,
      dialogVisible:false,
      dialogData:{

      },
      role:this.$store.state.user.role
    }
  },
  mounted() {
    this.getXHSTree()
  },

  computed: {
    variables() {
      return variables
    }
  },

  /*
  created() {
    this.$set(this.temp, 'cmd', [])
    this.screen_width = document.documentElement.clientWidth;
  },
  computed: {
    businessFilterData() {
      const search = this.searchInput
      if (search) {
        return this.businessData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.businessData
    }
  },*/
  methods: {
    getXHSTree(){
      getXHSTreeFormTreeService().then(response => {
        var xhsTree = response.data.child
        for(var i = 0; i < xhsTree.length; i++) {
          xhsTree[i].children = xhsTree[i].child
          for(var j = 0; j < xhsTree[i].child.length; j++) {
            xhsTree[i].child[j].child = []
            xhsTree[i].label = xhsTree[i].alias
            xhsTree[i].value = xhsTree[i].name
            xhsTree[i].children[j].label = xhsTree[i].child[j].alias
            xhsTree[i].children[j].value = xhsTree[i].alias + '/' + xhsTree[i].child[j].alias
            if (xhsTree[i].child[j].alias == "nogroup") {
              xhsTree[i].child.splice(j, 1)
              j = j - 1
            }
          }
        }
        this.business=xhsTree
      })
    },

    tableHeaderColor({row, column, rowIndex, columnIndex}) {
      if(rowIndex == 0) {
        return "background-color: " + variables.menuBg + ";color:white;height:30px;font-size:14px"
      }
    },

    resetForm(formName){
      this.$refs[formName].resetFields()
    },

    submitBusiness(formName){
      this.$refs[formName].validate((valid) => {
        if(!valid) return;
        this.businessForm.cmd = this.businessForm.cmd.join(",")
        this.businessForm.name = "redkv-" + this.businessForm.name
        saveBusiness(this.businessForm).then(response => {
          this.$message({
            type:'success',
            message: '提交成功'
          });
          this.$refs[formName].resetFields()
          //this.getBusinessTask()
        })
      })
    },
  }/*,

    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getBusinessTask(){
      if(this.role == 'admin'){
        getBusiness().then(response => {
          this.businessData = response.data.business
          this.totalSize = this.businessData.length
        })
      }else{
        getBusiness().then(response => {
          this.businessData1 = response.data.business
          this.businessData = []
          for(var i = 0; i < this.businessData1.length; i++){
            if(this.businessData1[i].applicant == this.user){
              this.businessData.push(this.businessData1[i])
            }
          }
          this.totalSize = this.businessData.length
        })
      }
    },
    handleClusterName(){
      var queryName = "redkv-" + this.temp.name
      var that = this
      isValidClusterName(queryName).then(response => {

      },
      error => {
        that.temp.name = ''
      })
    },
    submitBusiness(formName){
      this.$refs[formName].validate((valid) => {
        if(!valid) return;
        this.temp.cmd = this.temp.cmd.join(",")
        this.temp.name = "redkv-" + this.temp.name
        saveBusiness(this.temp).then(response => {
          this.$message({
            type:'success',
            message: '提交成功'
          });
          this.$refs[formName].resetFields()
          this.temp.info = ""
          this.getBusinessTask()
        })
      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields()
      this.temp.info = ""
    },
    handleCas(){
      var treeNodes = this.$refs.tree.getCheckedNodes(true)
      this.temp.uid = treeNodes[0].data.uid,
      this.temp.pid = treeNodes[0].data.pid,
      this.temp.path = treeNodes[0].data.path.substr(4)
    },

    checkDetail(data){
      this.$router.push({
        meta: { title:"业务审批"},
        path: '/business/details',
        query:{
          name: data.create_time.replace("T", "").replace(/-/g,"").replace(/:/g,""),
          id: data.id
        },
      })
    },
    refineBusiness(data){
      this.dialogVisible = true
      this.dialogData = data
      this.dialogData.ttl = parseInt(this.dialogData.ttl)
      this.dialogData.master_slave = parseInt(this.dialogData.master_slave)
      if(typeof(this.dialogData.cmd) == "object"){
        this.dialogData.cmd = this.dialogData.cmd.toString().split(",") || ""
      }else{
        this.dialogData.cmd = this.dialogData.cmd.split(",") || ""
      }
      this.dialogData.name = this.dialogData.name.replace("redkv-","")
    },
    submitRefineBusiness(formName){
      this.$refs[formName].validate((valid) => {
        if(!valid) return;
        if(typeof(this.dialogData.cmd) == "object"){
          this.dialogData.cmd = this.dialogData.cmd.join(",")
        }
        this.dialogData.name = "redkv-" + this.dialogData.name
        updateBusiness(this.dialogData).then(response => {
          this.$message({
            type:'success',
            message: '提交成功'
          });
          this.getBusinessTask()
          this.dialogData.status = '审核中'
          this.dialogData.content = ''
          this.dialogVisible = false
        }).catch((err) => {
          this.dialogData.cmd = this.dialogData.cmd.split(",")
        })

      })
    }
  }*/
}
</script>
<style lang="scss">
  @import '@/styles/variables.scss';
  .business-panel {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .el-form-item__error {
      top: 25%;
      right: 25% !important;
      left: unset;
    }
    .business-form {
      margin: 15px;
      margin-bottom: -20px;
    }

    .el-card__header, .el-collapse-item__header {
      background-color: $menuBg !important;
      height: 40px;
      color: white;
      font-size: 16px;
    }

    .el-collapse-item__header {
      .left {
        left: 20px;
        position: absolute;
      }
      .right {
        right: 40px;
        position: absolute;

        i {
          margin-left: 10px;
        }
      }
    }

    .el-card__header {
      .box-card {
        .business-header {
          float: right;

          a {
            margin-right: 8px;
            font-size: 14px;
          }
        }
        .clearfix {
          margin-top: -4px;
        }
      }
    }

    .el-input-group__prepend {
      padding: 5px;
      width: 50px;
    }

    .el-form-item, .dialog-data .el-form-item {
      margin-bottom: 5px;
    }

    .dialog-data {
      padding: 0 20px;
    }
  }
  .business-list-panel {
    margin-top: 6px;

    .b-search {
      margin: -5px 0 5px 0;
    }

    .b-search-table {
    }

  }
</style>
