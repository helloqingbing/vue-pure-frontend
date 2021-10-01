<template>
  <div class="file">
    <BasicLayout>
      <template #wrapper>
        <DragColumn>
          <div slot="left" class="left">
            <el-card>
              <el-tree
                    :data="data"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span>{{ node.label }}</span>
                      <span>
                        <el-button
                          type="text"
                          size="mini"
                          @click="() => append(data)">
                          增加
                        </el-button>
                        <el-button
                          type="text"
                          size="mini"
                          @click="() => remove(node, data)">
                          删除
                        </el-button>
                      </span>
                    </span>
                  </el-tree>
            </el-card>
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
    const data = [{
      id: 1,
      label: 'cls-hbsmzlul-2905526316',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: 'cls-cbrnj8b9-2905526316',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }];
    return {
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data))
    }
  },
  mounted() {
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    }
   }
}
</script>

<style lang="scss" scoped>
  .file .el-card {
    height: calc(100vh - 113px);
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
