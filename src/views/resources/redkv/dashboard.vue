<template>
  <div class="file">
    <BasicLayout>
      <template #wrapper>
        <DragColumn>
          <div slot="left" class="left">
            <el-card></el-card>
          </div>
          <div slot="right" class="right">
            <el-card></el-card>
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
export default {
  name: 'Dashboard',
  components: {
    DragColumn,
    Left,
    Right
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
  .file .el-card {
    height: calc(100vh - 113px);
  }
</style>
