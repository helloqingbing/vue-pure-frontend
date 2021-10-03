<template>
  <div class="devops-build-build">
    <BasicLayout>
      <template #wrapper>
        <el-table
          :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
          border
          :header-cell-style="{background: '#304156', color:'white', height: '30px'}"
        >
          <el-table-column
            prop="id"
            label="编号"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            prop="git_name"
            label="仓库名称"
            align="center"
            width="360">
          </el-table-column>
          <el-table-column
            prop="branch"
            label="分支"
            align="center"
            width="200">
          </el-table-column>
          <el-table-column
            prop="creator"
            label="创建人"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            label="状态"
            width="75">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === 'failed' ? 'danger' : scope.row.status === 'successful' ? 'success' : 'primary'"
                disable-transitions>{{scope.row.status == "failed" ? "失败":scope.row.status == "successful"? "成功":"构建中"}}</el-tag>
            </template>>
          </el-table-column>
          <el-table-column
            prop="build_output"
            label="产物"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width = "80"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleCheckLog(scope.row.build_output)">查看日志</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin:10px 0; float:right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalSize">
          </el-pagination>
        </div>
        <el-drawer
          title="构建日志"
          :visible.sync="drawer"
          size="600px"
          :direction="direction">
          <div class="code">
             <codemirror v-model="buildlogfile" :prop="buildlogfile"
                ref="cmEditor"
                :value="buildlogfile"
                :options="cmOptions"
                @ready="onCmReady"
                @input="onCmCodeChange"/>
          </div>
        </el-drawer>
      </template>
    </BasicLayout>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import {getBuiltGit, getBuildLog, checkBuildStutas} from '@/api/build'

export default {
  name: "Build",
  components: {
    codemirror
  },
    data() {
      return {
        tableData: [],
        timer: '',
        direction: 'rtl',
        drawer: false,
        buildlogfile: '',
        currentPage: 1,
        totalSize: 20,
        cmOptions: {
          tabSize: 4,
          styleActiveLine: false,
          lineNumbers: true,
          styleSelectedText: false,
          line: true,
          readOnly: true,
          mode: 'text/javascript',
          theme: "monokai",
          lineWrapping: true,
          extraKeys: { "Ctrl": "autocomplete" }
        },
        pageSize: 20
      }
    },
    created() {
      this.getBuiltGit()
    },
    mounted() {
      this.timer = setInterval(this.getBuiltGit, 10000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    methods:{
      handleSizeChange(val) {
        this.currentPage = 1
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      async getBuiltGit(){
        this.listLoading = true
        /*const { data } = await getBuiltGit()
        const builtGit = data.built_git
        this.tableData = builtGit.map(v => {
            this.$set(v, 'edit', false)
            return v
        })*/
        this.totalSize = this.tableData.length
        this.listLoading = false
      },
      onCmReady(cm) {

      },
      onCmCodeChange(newCode) {

      },
      handleCheckLog(data) {
        this.drawer = true
        getBuildLog(data).then(response => {
          this.buildlogfile= ""
          this.buildlogfile= response.data.content
        })
      }
    }
  }
</script>
<style>
.el-drawer__header span:focus {
  outline: 0;
}
.code {
  height: 600px;
}
.code .CodeMirror {
  border: 1px solid #eee;
  min-height: 700px;
}

.code .CodeMirror-scroll {
  overflow: scroll;
}
</style>
