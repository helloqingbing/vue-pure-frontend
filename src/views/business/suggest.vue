<template>
  <div class="suggest">
    <BasicLayout>
      <template #wrapper>
        <el-card class="box-card">
          <el-form label-position="right" :model="temp" :rules="rules" ref="feedback" label-width="80px" style="margin-bottom:-15px">
            <el-form-item label="所属业务" prop="father_business"> <!-- prop必须指定，rules才能约束-->
              <el-cascader ref="tree"
                v-model="temp.father_business"
                style="width:100%"
                :options="business"
                :props="{ expandTrigger: 'hover' }"
                placeholder="选择服务树路径" @change="handleCas"></el-cascader>
            </el-form-item>
            <el-form-item label="反馈主题" prop="type">
              <el-input v-model="temp.title" placeholder="反馈的主题" clearable class="input-with-select">
                <el-select v-model="temp.type" slot="prepend" placeholder="请选择">
                  <el-option v-for="item in issueType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="反馈内容" prop="content">
              <el-input v-model="temp.content" type="textarea" :rows="4" placeholder="建议和意见" height="300"></el-input>
            </el-form-item>
            <el-form-item align="left">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="submitFeedback('feedback')">提交</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetForm('feedback')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="suggest-list-panel">
          <el-input class="b-search" v-model="searchInput" prefix-icon="el-icon-search" clearable  placeholder="输入查询的字符"></el-input>
          <el-table border :header-cell-style="tableHeaderColor"
            :data="feedbackFilterData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
            :default-expand-all="false"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" label-width="100px" class="cluster-table-expand">
                  <el-form-item style="word-break:break-all;" label="反馈内容：" >
                    <span>{{ props.row.content }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="日期" width="180" align="center" prop="create_time">
               <template slot-scope="scope">
                  {{scope.row.create_time.replace("T", " ")}}
                </template>
            </el-table-column>
            <el-table-column label="主题" align="center" prop="title"></el-table-column>
            <el-table-column label="类型" align="center" width="100" prop="type"></el-table-column>
            <el-table-column label="所属业务" width="180" align="center" prop="father_business"> </el-table-column>
            <el-table-column width="100"  label="建议人" align="center" prop="proposer"> </el-table-column>
            <!--<el-table-column width="100"  label="审核人" align="center" prop="inspector"> </el-table-column>
            <el-table-column label="状态" width="100px" align="center" prop="status">
               <template slot-scope="scope">
                  {{scope.row.status == 'pending'? '待反馈':'已回复'}}
                </template>
            </el-table-column>-->
          </el-table>
        </el-card>
      </template>
    </BasicLayout>
  </div>
</template>

<script>
import { getXHSTreeFormTreeService} from '@/api/xhst'
import {saveFeedback, getFeedback} from '@/api/feedback'

export default {
  components:{
  },
  data() {
    return {
      searchInput: "",
      listQuery: {
        skip: 0,
        limit: 10
      },
      business :[],
      issueType:[
        { value: '稳定性', label: '稳定性' },
        { value: '用法咨询', label: '用法咨询' },
        { value: '平台建议', label: '平台建议' },
        { value: '存储推荐', label: '存储推荐' },
        { value: '吐槽其他', label: '吐槽其他' }
      ],
      currentPage: 1,
      pageSize: 20,
      feedbackData:[],
      feedbackData1:[],
      totalSize: 0,
      temp: {
        title:'',
        uid: '',
        pid: '',
        type: '',
        content: '',
        father_business:'',
        proposer: this.$store.state.user.name
      },
      rules: {
        title: [ { required: true, message: '请输入主题', trigger: 'blur' } ],
        type:[ { required: true, message: '问题类型', trigger: 'change' } ],
        father_business:[ { required: true, message: '请选择所属业务', trigger: 'change' } ],
        content: [ { required: true, message: '请输入意见或建议', trigger: 'blur' } ],
      },
      user:this.$store.state.user.name
    }
  },

  mounted() {
    this.getXHSTree()
    var that = this
  },
  created() {
    //this.getFeedback()
  },
  computed: {
    variables() {
      return variables
    },

    feedbackFilterData() {
      const search = this.searchInput
      if (search) {
        return this.feedbackData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.feedbackData
    }
  },
  methods:{
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
        return "background-color:#304156;color:white;height:30px;font-size:14px"
      }
    },
    handleCas(){
      var treeNodes = this.$refs.tree.getCheckedNodes(true)
      this.temp.uid = treeNodes[0].data.uid,
      this.temp.pid = treeNodes[0].data.pid
    },
    getFeedback(){
      if(this.role == 'admin'){
        getFeedback().then(response => {
          this.feedbackData = response.data.business
          this.totalSize = this.feedbackData.length
        })
      }else{
        getFeedback().then(response => {
          this.feedbackData1 = response.data.business
          this.feedbackData = []
          for(var i = 0; i < this.feedbackData1.length; i++){
            if(this.feedbackData1[i].proposer == this.user){
              this.feedbackData.push(this.feedbackData1[i])
            }
          }
          this.totalSize = this.feedbackData.length
        })
      }
    },
    submitFeedback(formName){
      var that = this
      this.$refs[formName].validate((valid) => {
        if(!valid) return;
        saveFeedback(this.temp).then(response => {
          that.$message({
            type:'success',
            message: '提交成功'
          });
          that.$refs[formName].resetFields()
          that.getFeedback()
        })

      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields()
      this.temp.info = ""
    }
  }
}
</script>
<style lang="scss">
.suggest {
  .el-form-item{
      margin-bottom: 6px;
  }

  .el-form-item__error {
    top: 25%;
    right: 30px !important;
    left: unset;
  }

  .el-card__header {
    padding:0 10px;
    background-color:#304156;
    height: 40px;
    line-height: 40px;
    color: white;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
    width:120px;
  }

  .suggest-list-panel {
    margin-top: 6px;
    .b-search {
      margin: 6px 0;
    }
  }
}
</style>
