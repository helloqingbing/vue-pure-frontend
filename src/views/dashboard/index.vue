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
              <ul>
                <li><a target="_blank" href="https://wiki.xiaohongshu.com/pages/viewpage.action?pageId=125672690">RedKV整体架构</a></li>
              </ul>
            </div>
          </el-collapse-item>
          <el-collapse-item name="1">
            <template slot="title">
              <span style="margin:0 10px;font-size: 16px"><i class="header-icon el-icon-info"></i>&nbsp; RedKV架构分析&nbsp;</span>
            </template>
            <div>

            </div>
          </el-collapse-item>
        </el-collapse>
      </template>
    </BasicLayout>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeName: ['1']
    }
  },
  beforeCreate(){
    //this.$route.meta.title = this.$route.query.name
  },
  created() {

  },
  methods: {

  }
}

</script>
<style>
.resource-k8s-dashboard .el-collapse-item__wrap {
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
</style>
