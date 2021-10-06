<template>
  <div class="resource-k8s-dashboard">
    <BasicLayout>
      <template #wrapper>
        
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
