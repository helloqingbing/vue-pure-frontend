<template>
  <div>
    <div class="filter-container">
      <el-button v-waves type="primary" icon="el-icon-plus" @click="handlerRegister">注册</el-button>
      <el-input v-model="searchInput" prefix-icon="el-icon-search" clearable style="width:300px;margin-left:10px" placeholder="" />
    </div>
    <div>
      <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);">
        <el-table
          :data="repoFilterData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
          border
          :header-cell-style="{background: '#304156', color:'white', height: '30px'}"
          style="width: 100%;margin-top:10px" >
          <el-table-column
            prop="id"
            label="编号"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            prop="repo_name"
            label="仓库名称"
            align="center"
            width="440">
          </el-table-column>
          <el-table-column
            prop="branch"
            label="分支"
            align="center"
            width="240">
          </el-table-column>
          <el-table-column
            prop="creator"
            label="创建人"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              {{scope.row.create_time.replace("T", " ")}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
            align="center"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                plain
                @click="handleBuild(scope.row)">构建</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      <el-dialog :title="textMap.register" :visible.sync="dialogFormVisible" customClass="custom-dialog">
        <el-form ref="dataForm" :model="temp" :rules="rules" label-position="left" label-width="100px" style="width: 400px;margin:-20px 30px;">
          <el-form-item label="仓库名称" prop="title" type="string"><el-input v-model="temp.title" @blur="handlerOnblur" placeholder="RedKV/RedKV"/></el-form-item>
          <el-form-item label="分支" prop="branch" type='string'>
            <el-select v-model="temp.branch" placeholder="选择分支" filterable style="min-width:300px">
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-divider content-position="left"></el-divider>
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" size="mini" plain @click="createData('dataForm')">
            保存
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
//import { getRegister, saveRepo } from '@/api/register'
//import { getBranch, buildGit } from '@/api/register'

export default {
  directives: { waves },
  inject:['updateActiveName'],
  data() {
    return {
      totalSize: 0,
      searchInput: "",
      repoData: [],
      listLoading: false,
      textMap: {
        register: '注册'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        branch: 'master',
        timestamp: new Date(),
        title: '',
        status: 'published'
      },
      currentPage: 1,
      pageSize: 20,
      form: {
        label:'',
        value:''
      },
      value:'',
      options:[],
      rules: {
        title: [ { required: true, message: '请输入应用名称', trigger: 'blur' } ],
        branch: [ { required: true, message: '请选择注册分支', trigger: 'change' } ],
      },
    }

  },
  computed: {
    repoFilterData() {
      const search = this.searchInput
      if (search) {
        return this.repoData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.repoData
    }
  },
  mounted() {
    //this.getRegister()
  },
  methods: {
    /*
    handlerRegister() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handlerSearch() {

    },
    handleBuild(data){

      var buildParams = {
        "build_repo": data.repo_name,
        "branch": data.branch,
        "creator": this.$store.state.user.name
      }
      buildGit(buildParams).then(response => {
        this.updateActiveName('build-history')
      })
      //this.$router.push({path:'/devops/build/history'})

    },
    handlerOnblur() {

      getBranch(this.temp.title).then(response => {
        this.temporary = JSON.parse(response.data.Branch)
        this.options = this.temporary
      })
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    async getRegister() {
      this.listLoading = true
      const { data } = await getRegister()
      const register = data.git_repo
      this.repoData = register.map(v => {
        this.$set(v, 'edit', false)
        return v
      })
      this.totalSize = this.repoData.length
      this.listLoading = false
    },
    createData(formName){
      this.$refs[formName].validate((valid) => {
        if(!valid) return;
        var queryParams = {
        "id": this.repoData.length + 1,
        "title": this.temp.title,
        "branch": this.temp.branch,
        "creator": this.$store.state.user.name
        }
        saveRepo(queryParams).then(response => {
          this.getRegister()
          this.dialogFormVisible = false
        })
      })

    },*/
  }
}
</script>

<style>
.custom-dialog{
  width: 500px;
}
</style>
