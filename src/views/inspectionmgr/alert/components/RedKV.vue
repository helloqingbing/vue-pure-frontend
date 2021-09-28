<template>

</template>

<script>

import waves from '@/directive/waves' // waves directive
export default {
  name: "RedKV",
  directives: { waves },
  data () {
    return {

    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
  }
}
</script>

<style>
.el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
}
.el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
}
.filter-container {
    padding: 10px;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
}
.custom-dialog{
  width: 38%;
}
.el-drawer__header span:focus {
  outline: 0;
}
</style>
