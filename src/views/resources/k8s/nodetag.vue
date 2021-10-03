<template>
  <div class="resource-k8s-nodetag">
    <BasicLayout>
      <template #wrapper>
          <Split class="page-split" :gutterSize="7">
            <SplitArea :size="20" :minSize="100">
              <el-card>
                <el-input placeholder="输入关键字进行过滤" size="mini" v-model="filterText" clearable style="margin: 10px 0"></el-input>
                <el-tree
                  :data="treeData"
                  node-key="id"
                  default-expand-all
                >
                </el-tree>
              </el-card>
            </SplitArea>
            <SplitArea :size="79" :minSize="400">
              <el-card>

              </el-card>
            </SplitArea>
          </Split>
      </template>
    </BasicLayout>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    const k8stag = [{
      id: 1,
      label: 'cls-hbsmzlul-2905526316',
      children: [{
        id: 4,
        label: 'redkv-proxy',
        children: [{
          id: 9,
          label: 'redkv-proxy-sec'
        }, {
          id: 10,
          label: 'redkv-proxy-rec'
        }]
      }]
    }, {
      id: 2,
      label: 'cls-cbrnj8b9-2905526316',
      children: [{
        id: 5,
        label: 'redkv-proxy-search'
      }, {
        id: 6,
        label: 'redkv-proxy-sns'
      }]
    }];
    return {
      treeData: JSON.parse(JSON.stringify(k8stag)),
      filterText: "",

    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .resource-k8s-nodetag {
    .el-card {
      height: calc(100vh - 113px);
    }
    .page-split {
      height: calc(100vh - 113px);
    }
    .gutter,.gutter-horizontal {
      background: #FFFFFF !important;
    }

    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
</style>
