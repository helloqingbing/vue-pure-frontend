<template>
  <div class="resource-k8s-dashboard">
    <BasicLayout>
      <template #wrapper>
        <el-collapse v-model="activeName" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);">
          <el-collapse-item name="0">
            <template slot="title">
              <span style="margin:0 10px;font-size: 16px"><i class="header-icon el-icon-info"></i>&nbsp; RedKV SOP&nbsp;</span>
            </template>
            <div>

            </div>
          </el-collapse-item>
          <el-collapse-item name="1">
            <template slot="title">
              <span style="margin:0 10px;font-size: 16px"><i class="header-icon el-icon-info"></i>&nbsp; RedKV架构分析&nbsp;</span>
            </template>
            <div>

            </div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <span style="margin:0 10px;font-size: 16px"><i class="header-icon el-icon-info"></i>&nbsp; RedKV专利</span>
            </template>
            <el-card class="box-card" shadow="never">
              <ve-line style="margin-bottom:-40px" :data="chartData"></ve-line>
            </el-card>
          </el-collapse-item>
        </el-collapse>
      </template>
    </BasicLayout>
  </div>
</template>

<script>
import {getCorvusInfo } from '@/api/clusterinfo'
import {getChangeFreeByName, getChangeFreeByTs} from '@/api/changefree'

export default {
  data() {
    return {
      changefrees: [],
      changefree: {},
      activeName: ['0','1', '2', '3', '4'],
      corvusData: [],
      currentPage: 1,
      totalSize: 20,
      pageSize: 20,
      timer: '',
      direction: 'rtl',
      drawer: false,
      listQuery: {
        name: "",
        skip: 0,
        limit: 10
      },
      chartSettings: {
        stack: { 'sell': ['cost', 'profit'] },
        area: true
      },
      chartData2: {
        columns: ['date', 'cost', 'profit', 'growthRate', 'people'],
        rows: [
          { 'date': '01/01', 'cost': 1523, 'profit': 1523, 'growthRate': 0.12, 'people': 100 },
          { 'date': '01/02', 'cost': 1223, 'profit': 1523, 'growthRate': 0.345, 'people': 100 },
          { 'date': '01/03', 'cost': 2123, 'profit': 1523, 'growthRate': 0.7, 'people': 100 },
          { 'date': '01/04', 'cost': 4123, 'profit': 1523, 'growthRate': 0.31, 'people': 100 },
          { 'date': '01/05', 'cost': 3123, 'profit': 1523, 'growthRate': 0.12, 'people': 100 },
          { 'date': '01/06', 'cost': 7123, 'profit': 1523, 'growthRate': 0.65, 'people': 100 }
        ]
      },
      chartData: {
        columns: ['date', 'cost', 'profit'],
        rows: [
          { 'date': '01/01', 'cost': 123, 'profit': 3 },
          { 'date': '01/02', 'cost': 1223, 'profit': 6 },
          { 'date': '01/03', 'cost': 2123, 'profit': 90 },
          { 'date': '01/04', 'cost': 4123, 'profit': 12 },
          { 'date': '01/05', 'cost': 3123, 'profit': 15 },
          { 'date': '01/06', 'cost': 7123, 'profit': 20 }
        ]
      }
    }
  },
  beforeCreate(){
    //this.$route.meta.title = this.$route.query.name
  },
  created() {
    this.listQuery['name'] =  this.$route.query.name
    getCorvusInfo(this.listQuery).then(response => {
      this.corvusData = response.data.corvus
      this.corvusSize = this.corvusData.length
    }),

    getChangeFreeByName(this.listQuery).then(response => {
      this.changefrees = response.data.changefree
    })
  },
  methods: {
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val;
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
.cluster-detail .el-collapse-item__wrap {
  border:0;
}
.el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
}
.el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
    font-size: 14px;
}
.cluster-detail .el-card__body {
  padding:5px 25px;
}

.cluster-detail .el-card__header {
  font-size: 16px;
  padding:0 10px;
  background-color:#304156;
  height: 40px;
  line-height: 40px;
  color: white;
}
ul[class='cluster'] {
  margin:0;
  padding:0;
}
ul[class='cluster'] li {
  margin: 8px 0;
  list-style:none;
  font:14px/20px arial,sans-serif;
}
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
.preview + .preview {
  margin-left: 10px;
}
</style>
