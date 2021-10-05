<template>
  <div class="resource-k8s-dashboard">
    <BasicLayout>
      <template #wrapper>
        <el-card>
          <el-row :gutter="10" class="action">
            <el-col :span="1.5">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="handleAdd"
              >新增</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="warning"
                icon="el-icon-download"
                size="small"
                @click="handleExport"
              >导出</el-button>
            </el-col>
          </el-row>
        </el-card>
      </template>
    </BasicLayout>
  </div>
</template>

<script>

import waves from '@/directive/waves' // waves directive

export default {
  name: "Image",
  directives: { waves },
  data () {
    return {

    }
  },
  computed: {

  },
  mounted() {

  },
  created() {

  },
  methods: {

  }
}
</script>

<style>

</style>
