<template>
  <div class="changefree-history">
    <BasicLayout>
      <template #wrapper>
        <el-card>
        <el-table
          :data="changefrees.slice((currentPage-1)*pageSize, currentPage*pageSize)"
          border
          :header-cell-style="{background: '#304156', color:'white', height: '30px'}"
          style="width: 100%;margin-top:10px">
          <el-table-column prop="timestamp" label="变更ID" align="center" width="120"></el-table-column>
          <el-table-column prop="change_title" label="变更主题" align="left"></el-table-column>
          <el-table-column prop="change_time_e" label="变更时间" align="center" width="200">
            <template slot-scope="scope">
                {{scope.row.change_time_e.replace("T", " ")}}
              </template>
          </el-table-column>
          <el-table-column prop="author" label="变更人" align="center" width="80"></el-table-column>
          <el-table-column prop="inspector" label="审批人" align="center" width="80"></el-table-column>
          <el-table-column prop="status" align="center" label="状态" width="75">
            <template slot-scope="scope">
             <el-tag
                  :type="scope.row.status === 'success' ? 'success' : scope.row.status === 'pending' ? 'info' : scope.row.status === 'reject' ? 'danger' : scope.row.status === 'approved' ? 'primary' : 'danger'"
                  disable-transitions>{{scope.row.status == "success" ? "成功": scope.row.status === "pending" ? "等待": "拒绝"}}</el-tag>
            </template>>
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center" width="120">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status == 'pending'" @click="handlerInspectionChangefree(scope.row)" type="info" plain size="mini" >开始审批</el-button>
              <el-button v-else @click="handleCheckChangefree(scope.row.timestamp)" type="success" plain size="mini">查看变更单</el-button>
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
          :title="'审批详情 - ' + changefree.timestamp"
          :visible.sync="drawer"
          size="600px"
          :direction="direction">
          <div class="code" style="height:600px; overflow:auto;background:#EEEEEE;">
            <ul class="preview pre" style="list-style-type:none;">
              <li>
                <span class="form-title">【变更主题】</span>
                <span class="form-value"><pre>{{changefree.change_title}}</pre></span>
              </li>
              <li>
                <span class="form-title">【变更集群】</span>
                <span class="form-value"><pre>{{changefree.cluster_name}}</pre></span>
              </li>
              <li>
                <span class="form-title">【变更时间】</span>
                <span class="form-value"><pre>{{changefree.change_time_s}} - {{changefree.change_time_e}}</pre></span>
              </li>
                <li>
                <span class="form-title">【变更人】</span>
                <span class="form-value"><pre>{{changefree.author}}</pre></span>
              </li>
                <li>
                <span class="form-title">【审批人】</span>
                <span class="form-value"><pre>{{changefree.inspector}}</pre></span>
              </li>
              <li>
                <span class="form-title">【变更原因】</span>
                <span class="form-value"><pre>{{changefree.change_desc}}</pre></span>
              </li>
              <li>
                <span class="form-title">【变更步骤】</span>
                <span class="form-value"><pre>{{changefree.steps}}</pre></span>
              </li>
              <li>
                <span class="form-title">【验证步骤】</span>
                <span class="form-value"><pre>{{changefree.verify}}</pre></span>
              </li>
              <li>
                <span class="form-title">【是否白屏】</span>
                <span class="form-value"><pre>{{changefree.screen_cmd == "0" ? "否" : "是"}}</pre></span>
              </li>
              <li>
                <span class="form-title">【是否有格式变化】</span>
                <span class="form-value"><pre>{{changefree.layout == "0" ? "否" : "是"}}</pre></span>
              </li>
              <li>
                <span class="form-title">【回滚步骤】</span>
                <span class="form-value"><pre>{{changefree.roll_back}}</pre></span>
              </li>
            </ul>
          </div>
        </el-drawer>
        </el-card>
      </template>
    </BasicLayout>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import {getChangeFreeList, getChangeFreeByTs} from '@/api/changefree'

export default {
  components: {
  },
    data() {
      return {
        changefrees: [],
        changefree: {
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
      this.getChangfreeList()
    },
    mounted() {
      this.timer = setInterval(this.getChangfreeList, 10000);
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
      async getChangfreeList(){
        var that = this
        this.listLoading = true
        getChangeFreeList().then(response => {
          that.changefrees = response.data.changefree
        })

      },
      handlerInspectionChangefree(data) {
        this.$router.push({
          meta: { title:"变更审批"},
          path: '/devops/changefree/inspect',
          query:{
            name: data.timestamp
          },
        })
      },
      handleCheckChangefree(data) {
        this.drawer = true
        var that = this

        getChangeFreeByTs({"timestamp": data}).then(response => {
          that.changefree =  response.data.changefree[0]
        })
      }
    }
  }
</script>
<style>
.el-drawer__header span:focus {
  outline: 0;
}
.code ul li {
  margin: 20px 0;
}
.code ul li .form-value{
  font-size: 12px;
}
.preview {
  flex: 1;
  margin: 0 20px;
  padding: 10px;
  background: #f5fcff;
  border: 1px solid #DDD;
  margin: 0;
  font-size: 14px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
