<template>
  <div class="file">
    <BasicLayout>
      <template #wrapper>
        <DragColumn>
          <div slot="left" class="left">
            <el-card>
              <div id="serviceChart" :style="{width: '210px', height: '200px'}"></div>
              <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable style="margin: 10px 0"></el-input>
              <el-tree
                v-loading="loading"
                :data="business1"
                node-key="uid"
                ref="tree"
                :default-expanded-keys="['f7801890-1dc9-11eb-b701-0a58ac195f2d']"
                highlight-current
                :props="defaultProps"
                :render-content="renderContent"
                :filter-node-method="filterNode"
                @node-click="handleNodeClick">
              </el-tree>
            </el-card>
          </div>
          <div slot="right" class="right">
            <el-card>
              <el-alert class="alert" title="说明：点击饼图可以查看具体等级的服务列表, 当前列表包含所有历史集群信息（包含已经下线的）" type="info" show-icon></el-alert>
              <el-input class="input" v-model="searchcluster" prefix-icon="el-icon-search" clearable  placeholder="输入查询的字符"></el-input>
              <el-table
                :data="clusterFilterData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
                border
                :header-cell-style="{background: '#304156', color:'white', height: '30px'}"
              >
                <el-table-column prop="level" label="等级" align="center" width="50"> </el-table-column>
                <el-table-column prop="name" label="集群名称" width="200"> </el-table-column>
                <el-table-column prop="cmd" label="集群命令" align="center" width="120"> </el-table-column>
                <el-table-column prop="father_business" label="所属业务" width="140"></el-table-column>
                <el-table-column prop="applicant" align="center" label="负责人" width="80"> </el-table-column>
                <el-table-column prop="info" label="业务说明"> </el-table-column>
                <el-table-column prop="edit" label="操作"  align="center" width="90">
                  <template slot-scope="scope">
                      <el-button icon="el-icon-search" type="success" circle size="mini" @click="handleConfig(scope.row)"></el-button>
                      <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleInfo(scope.row)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                title="修改集群业务说明"
                :visible.sync="dialogVisible"
                width="50%">
                <el-form label-width="80px" :model="temp">
                  <el-form-item label="集群名称">
                    <el-input v-model="temp.name" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="业务说明">
                    <el-input v-model="temp.info" type="textarea" placeholder="请输入新的业务说明"></el-input>
                  </el-form-item>
                  <el-form-item label="集群配置">
                    <div class="cinfo"><vue-json-editor
                        v-model="temp.config_data"
                        :showBtns="false"
                        style="height: 300px"
                        :mode="'code'"
                        lang="zh" /></div>
                  </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <div slot="footer" style="text-align:center;margin-top:-40px">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateInfo">确 定</el-button>
                </div>
              </el-dialog>
              <div style="margin:10px 0; float:right">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="pageSize"
                  background
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="tableData.length">
                </el-pagination>
              </div>
            </el-card>
          </div>
        </DragColumn>
      </template>
    </BasicLayout>
  </div>
</template>

<script>
import DragColumn from '@/components/DragColumn/index'
import Left from '@/components/FileManage/Left'
import Right from '@/components/FileManage/Right'
import {getXhstClusterList, getXhstClusterHosts } from '@/api/xhst'
import {getBusinessByUid, getBusinessByPid, getFinishedBusiness, getBusinessByLevel, updateInfoByName} from '@/api/business'
export default {
  name: 'Dashboard',
  components: {
    DragColumn,
    Left,
    Right
  },
  data() {
    return {
      loading: false,
      business1: [],
      searchcluster: "",
      business:[{'alias':'小红书', "name": 'xhs', 'uid':"f7801890-1dc9-11eb-b701-0a58ac195f2d", "pid":"", "child":[]}],
      expand:[],
      defaultProps: {
        children: 'child',
        label: 'alias'
      },
      tableData:[],
      pageSize: 20,
      currentPage: 1,
      uid:'',
      level:{
        s0: 0,
        s1: 0,
        s2: 0
      },
      filterText:'',
      dialogVisible: false,
      configdialogVisible: false,
      temp:{
        name:'',
        info:'',
        config_data:''
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {

  },
  computed: {
    clusterFilterData() {
      const search = this.searchcluster
      if (search) {
        return this.tableData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.tableData
    }
  },
  created() {
    getXhstClusterList().then(response => {
      this.loading = false
      var xhsTree = response.data.child
      getFinishedBusiness().then(response =>{
        this.tableData = response.data.business
        var length = this.tableData.length
        this.business[0].alias = this.business[0].alias + " " //这里要加个空格，不加的话数据显示不出来，why?
        this.business[0].times = length
        var pid_uid = response.data.pid_uid
        for(var k = 0; k < length; k++){
            if(this.tableData[k].level == 'S0'){
            this.level.s0 += 1
          }else if(this.tableData[k].level == 'S1'){
            this.level.s1 += 1
          }else if(this.tableData[k].level == 'S2'){
            this.level.s2 += 1
          }
        }
        for(var i = 0; i < xhsTree.length; i++) {
          //针对父级节点的循环
          var no_child_flag = 0
          for(var j = 0; j < pid_uid.length; j++){
            if(xhsTree[i].uid == pid_uid[j].pid){
              xhsTree[i].alias = xhsTree[i].alias + " " //这里要加个空格，不加的话数据显示不出来，why?
              xhsTree[i].times = pid_uid[j].relation.split(",").length
              xhsTree[i].servicelevel = ''
              no_child_flag = 1
            }
          }
          if(no_child_flag == 0){
            xhsTree.splice(i, 1)
            i = i - 1
          }
        }
        for(var i = 0; i < xhsTree.length; i++){
          var pid = xhsTree[i].uid
          var valid_uid_list = []
          for(var k = 0; k < pid_uid.length; k++){
            if(pid == pid_uid[k].pid){
              valid_uid_list = pid_uid[k].relation.split(",")
            }
          }
           for(var j = 0; j < xhsTree[i].child.length; j++){
            //针对子级节点的循环
            var no_business_flag = 0
            var times = 0
            var val = ''
            for(var a = 0; a < valid_uid_list.length; a++){
              var dst = valid_uid_list[a].split(':')[0]
              val = valid_uid_list[a].split(':')[1]
              if(xhsTree[i].child[j].uid == dst){
                no_business_flag  = 1
                times += 1
                xhsTree[i].child[j].servicelevel = val
              }
            }
            xhsTree[i].child[j].times = times
            xhsTree[i].child[j].child = ""
            //xhsTree[i].child[j].alias = xhsTree[i].child[j].alias + " " 这里不用加
            if(times == 0){
              xhsTree[i].child.splice(j,1)
              j = j - 1
            }
          }
        }
        this.business[0].child = xhsTree
        this.expand = this.business[0].child
        this.business1 = this.business
        this.drawLine();
      })
    })
  },
  methods:{
    drawLine(){
      let that = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('serviceChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom'
        },
        series: [{
          name: '服务比例',
          type: 'pie',
          radius: '50%',
          labelLine: {
            length: 10,
          },
          label: {
            formatter: '{b}:{c}',
          },
          data: [
            {value: this.level.s0, name: 'S0'},
            {value: this.level.s1, name: 'S1'},
            {value: this.level.s2, name: 'S2'}
          ],
          emphasis: {
            itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
        }]
      });
      myChart.on('click', function(item) {
        let currSelectName = item.name
        getBusinessByLevel(currSelectName).then(response =>{
          that.tableData = response.data.business
        })
      })
    },
    getTableData(){
      getFinishedBusiness().then(response =>{
        this.tableData = response.data.business
      })
    },
    handleNodeClick(data){
      this.uid = data.uid
      if(data.pid != 'f7801890-1dc9-11eb-b701-0a58ac195f2d' &&data.pid != ''){
        getBusinessByUid(this.uid).then(response =>{
          this.tableData = response.data.business
        })
      }else if(data.pid != ''){
        getBusinessByPid(this.uid).then(response =>{
          this.tableData = response.data.business
        })
      }else{
        getFinishedBusiness().then(response =>{
          this.tableData = response.data.business
        })
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.alias.indexOf(value) !== -1;
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <span style="margin-right:3px">{data.alias}</span>
          <span class="tag-circle">{data.times}</span>
          <span style="margin-left:3px;color:#6A3;font-size:14px">{data.servicelevel}</span>
        </div>
      );
    },
    handleS0(){
      getBusinessByLevel('S0').then(response =>{
        this.tableData = response.data.business
      })
    },
    handleS1(){
      getBusinessByLevel('S1').then(response =>{
        this.tableData = response.data.business
      })
    },
    handleS2(){
      getBusinessByLevel('S2').then(response =>{
        this.tableData = response.data.business
      })
    },
    handleInfo(data){
      this.dialogVisible = true
      this.temp.name = data.name
      this.temp.info = data.info
      this.temp.config_data = JSON.parse(data.config_data)
    },
    handleConfig(data){
      this.configdialogVisible = true
      this.temp.name = data.name
      this.temp.info = data.info
      this.temp.config_data = JSON.parse(data.config_data)
    },
    updateInfo(){
      this.dialogVisible = false
      var updateParams = {
        'name': this.temp.name,
        'info': this.temp.info,
        'config_data':JSON.stringify(this.temp.config_data)
      }
      updateInfoByName(updateParams).then(response => {
        this.getTableData()
        this.$message({
          type:'success',
          message: '提交成功'
        });
      })
      //*/
    }
  }
}
</script>

<style lang="scss">
  .file .el-card {
    height: calc(100vh - 113px);
  }

  .alert, .input{
    margin-bottom: 10px;
  }

</style>
