<template>
  <div class="resource-redkv-bashbaord">
    <BasicLayout>
      <template #wrapper>
        <el-card>
          <Split class="page-split" :gutterSize="7">
            <SplitArea :size="20" :minSize="100" class="left">
              a
            </SplitArea>
            <SplitArea :size="79" :minSize="400" class="right">
              b
            </SplitArea>
          </Split>
         </el-card>
      </template>
    </BasicLayout>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  components: {

  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .resource-redkv-bashbaord {
    .el-card {
      height: calc(100vh - 113px);
    }
    .page-split {
      height: calc(100vh - 115px);
      margin: -20px 0 0 -20px;
      width: calc(100vw - 220px);
      .left, .right {
        padding: 20px;
      }
    }
    .gutter,.gutter-horizontal {
      background: #FFFFFF !important;
      padding-top: -20px;
    }
  }
</style>
