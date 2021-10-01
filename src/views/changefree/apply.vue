<template>
  <div class="chagnefree-apply">
    <BasicLayout>
      <template #wrapper>
        <el-card>
        <el-form :model="change" label-width="100px" :rules="rules" ref="changeForm">
          <el-form-item label="变更主题" prop="changeTitle" >
            <el-input type="input" v-model="change.changeTitle" placeholder="简要概况变更的内容，哪个集群，做什么操作（如：redkv-zprofile-user版本升级）"></el-input>
          </el-form-item>
          <el-form-item label="选择集群" prop="clusterName">
            <el-select v-model="change.clusterName" filterable placeholder="选择集群组名"  style="width:400px" @focus="handleCluster">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="变更时间" prop="changeTime">
            <el-date-picker
              v-model="change.changeTime"
              type="datetimerange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['12:00:00']">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="变更说明" prop="changeDesc" >
            <el-input type="textarea" :rows="8" v-model="change.changeDesc" placeholder="必须写清楚详细的变更说明，bugfix包含MR连接和问题的描述"></el-input>
          </el-form-item>
          <el-form-item label="变更步骤" prop="steps">
            <el-input type="textarea" :rows="8" v-model="change.steps" placeholder="必须写清楚详细的变更步骤，包含每个步骤操作的预期结果"></el-input>
          </el-form-item>
          <el-form-item label="验证流程" prop="verify">
            <el-input type="textarea" :rows="8" v-model="change.verify" placeholder="必须写清楚数据和功能的验证流程和正确的预期结果"></el-input>
          </el-form-item>
          <el-form-item label="Layout变化" prop="layout">
            <el-radio-group v-model="change.layout">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否白屏" prop="screenCmd">
            <el-radio-group v-model="change.screenCmd">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="回滚方案" prop="rollBack">
            <el-input type="textarea" :rows="8" v-model="change.rollBack" placeholder="必须写清楚变更失败后的回滚方案"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom:14px">
            <el-button size="small" icon="el-icon-edit"  type="primary" @click="onSubmit('changeForm')">提交</el-button>
            <el-button size="small" icon="el-icon-refresh"  @click="onReset('changeForm')">重置</el-button>
          </el-form-item>
        </el-form>
        </el-card>
      </template>
    </BasicLayout>
  </div>
</template>
<script>
import waves from '@/directive/waves' // waves directive

export default {
  components: {
  },
  //inject:['updateActiveName'],
  data() {
    return {
      change: {
        changeTitle: '',
        clusterName: '',
        changeTime: '',
        screenCmd: 1,
        steps: '',
        verify: '',
        layout: 0,
        rollBack: '',
        changeDesc: '',
        author: this.$store.state.user.name
      },
      rules: {
        changeTitle: [ { required: true, message: '概述变更集群的操作', trigger: 'blue' } ],
        clusterName: [ { required: true, message: '请选择要变更的集群', trigger: 'change' } ],
        changeTime:[ { required: true, message: '请选择变更时间', trigger: 'change' } ],
        changeDesc: [ { required: true, message: '详细的变更描述，问题的背景以及描述', trigger: 'blur' } ],
        steps: [ { required: true, message: '详细的变更步骤', trigger: 'blur' } ],
        verify: [ { required: true, message: '详细的验证步骤', trigger: 'blur' } ],
        screenCmd: [ { required: true, message: '请选择是否白屏', trigger: 'change' } ],
        layout: [ { required: true, message: '是否有数据格式变化', trigger: 'change' } ],
        rollBack: [ { required: true, message: '请选择数据总量所在范围', trigger: 'blur' } ]
      },
      options:[],
      user:this.$store.state.user.name,
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
    handleCluster() {
      /*getCluster().then(response =>{
        this.options = JSON.parse(response.data.name)
      })*/
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if(!valid) return;
        /*addChangeFree(this.change).then(response => {
          this.$message({
            type:'success',
            message: '提交成功'
          });

          this.updateActiveName('list-history')
        })*/
     })
    },
    onReset(form) {
      this.$refs[form].resetFields()
    }
  }
}
</script>

<style>
  .el-form-item{
      margin-bottom: 6px;
  }

  .el-form-item__error {
    top: 25%;
    right: 30px !important;
    left: unset;
  }
</style>
