<template>
  <div class="resource-k8s-nodetag">
    <BasicLayout>
      <template #wrapper>
          <Split class="page-split" :gutterSize="7">
            <SplitArea :size="20" :minSize="100">
              <el-card>
                <el-input placeholder="输入关键字进行过滤" size="mini" v-model="filterText" clearable style="margin: 10px 0"></el-input>
                <div class="pop-out-menu">
                  <!--鼠标右键菜单栏 -->
                  <div v-show="showRightMenu">
                    <div id="menu" class="right-menu">
                      <a class="menu-item el-icon-plus" @click="handleNodeAction('add')">增加</a>
                      <a class="menu-item el-icon-delete" @click="handleNodeAction('delete')">删除</a>
                      <a class="menu-item el-icon-edit"  @click="handleNodeAction('edit')">编辑</a>
                    </div>
                  </div>
                </div>
                <div class="tree-scroll">
                  <el-tree
                    :data="treeData"
                    class="flow-tree"
                    node-key="id"
                    ref="tagTree"
                    :expand-on-click-node="false"
                    @node-contextmenu="handleRightClick"
                    @node-click="nodeClick"
                    default-expand-all
                  >
                  </el-tree>
                </div>
                <el-dialog
                  :title="nodeActionName"
                  :visible.sync="nodeActionDialog"
                  width="400px"
                  :show-close="false"
                  :before-close="handleBeforeClose"
                >
                  <span slot="title" class="dialog-footer">
                    <span v-if="nodeActionType == 'add'" class="el-icon-plus"></span>&nbsp;
                    <span v-else class="el-icon-edit"></span> &nbsp;
                    <span>{{nodeActionName}}</span>
                  </span>

                  <div><el-input v-model="nodeName" placeholder="请输入内容"></el-input></div>
                  <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="handleCancelNodeAction()">取 消</el-button>
                    <el-button size="small" type="primary" @click="handleCommitNodeAction()">确 定</el-button>
                  </span>
                </el-dialog>
              </el-card>
            </SplitArea>
            <SplitArea :size="79" :minSize="400">
              <el-card>
                <el-row>
                  <el-input class="input" v-model="searchcluster" prefix-icon="el-icon-search" clearable  placeholder="输入查询的字符"></el-input>
                  <el-table
                    :data="clusterFilterData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
                    border
                    :header-cell-style="{background: '#304156', color:'white', height: '30px'}"
                  >
                    <el-table-column prop="tagName" label="标签名称" align="center"> </el-table-column>
                    <el-table-column prop="nodesCount" label="运行节点数"> </el-table-column>
                    <el-table-column prop="nodesAvaliable" label="可用节点数"> </el-table-column>
                    <el-table-column prop="status" label="状态"> </el-table-column>
                  </el-table>

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
                </el-row>
              </el-card>
            </SplitArea>
          </Split>
      </template>
    </BasicLayout>
  </div>
</template>

<script>
let id = 1000;
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
        },{
          id: 9,
          label: 'redkv-proxy-sec'
        }, {
          id: 10,
          label: 'redkv-proxy-rec'
        },{
          id: 9,
          label: 'redkv-proxy-sec'
        }, {
          id: 10,
          label: 'redkv-proxy-rec'
        },{
          id: 9,
          label: 'redkv-proxy-sec'
        }, {
          id: 10,
          label: 'redkv-proxy-rec'
        },{
          id: 9,
          label: 'redkv-proxy-sec'
        }, {
          id: 10,
          label: 'redkv-proxy-rec'
        },{
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
      showRightMenu: false,
      rightClickData: {
        node: null,
        data: null
      },
      nodeActionName: "",
      nodeActionDialog: false,
      nodeActionType: "",
      nodeName: "",
      tableData: [],
      filterText: "",
      searchcluster: "",
      pageSize: 20,
      currentPage: 1,

    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
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
  mounted() {
  },
  methods: {
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleNodeAction(type) {
      if (type == "add") {
        this.nodeActionName = "增加节点"
        this.nodeActionDialog = true
        this.nodeActionType = "add"
      } else if (type == "edit") {
        this.nodeActionName = "编辑节点"
        this.nodeActionDialog = true
        this.nodeActionType = "edit"
        this.nodeName = this.rightClickData.data.label
      } else if (type == "delete") {
        this.nodeActionName = "删除节点"
        this.nodeActionDialog = false
        this.nodeActionType = "delete"
        this.handleCommitNodeAction('delete')
      } else {
        this.$message({
          message: '节点名称不能为空！',
          duration: 2000,
          type: 'error'
        });
        return;
      }
    },
    handleCommitNodeAction() {
      if((this.nodeName.length == 0 || this.nodeName == "") && this.nodeActionType != "delete") {
        this.$message.error('节点名称不能为空！');
        return;
      }
      var data = this.rightClickData.data
      var node = this.rightClickData.node
      if(this.nodeActionType == "add") {
        const newChild = { id: id++, label: this.nodeName, children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      } else if (this.nodeActionType == "edit") {
        node.data.label = this.nodeName
      } else if (this.nodeActionType == "delete") {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      } else {
        this.$message({
          message: this.nodeActionType + " 节点失败!",
          duration: 2000,
          type: 'error'
        });
      }
      this.nodeActionDialog = false
      this.rightClickData.data = null
      this.rightClickData.node = null
      this.nodeName = ""
    },
    handleCancelNodeAction() {
      this.nodeName = ""
      this.nodeActionDialog = false
    },
    handleBeforeClose() {
      this.nodeActionDialog = true
    },
    nodeClick(data) {
      console.log('Node Click', data.id, data, data.name)
    },
    handleRightClick(event, data, node, obj) {
      this.rightClickData.node = node
      this.rightClickData.data = data
      this.showRightMenu = false // 先把模态框关死，目的是：第二次或者第n次右键鼠标的时候 它默认的是true
      this.showRightMenu = true
      let menu = document.querySelector('#menu')
      menu.style.left = event.clientX - 200 + 'px'
      menu.style.top = event.clientY - 0 + 'px'
      document.addEventListener('click', this.closeRightMenu)
    },
    closeRightMenu() {
      this.showRightMenu = false
      document.removeEventListener('click', this.closeRightMenu)
    }
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

    .input{
      margin-bottom: 10px;
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
    .flow-tree {
      overflow: auto;
      height: calc(100vh - 200px);
    }
    .tree-scroll {
      height: 100%;
    }
    .pop-out-menu {
      overflow: auto;
      .right-menu {
        position: absolute;
        background: #FFFFFF;
        border: 1px solid rgba(0,0,0,.2);
        border-radius: 3px;
        z-index: 999;
        display: block;
        a {
          width: 60px;
          height: 24px;
          font-size: 12px;
          text-align: center;
          display: block;
          color: #1a1a1a;
          padding: 6px 0;
          text-decoration: none
        }

        a:hover {
          background: #304156;
          color: #FFFFFF;
        }
      }
    }
    .el-dialog__wrapper {
      ::v-deep .el-dialog__header {
        padding: 10px;
        background-color: #304156;
        color: #FFFFFF;
        border-bottom: 1px solid #D1DBE5;
      }
      ::v-deep .el-dialog__footer {
        padding: 10px;
        border-top: 1px solid #D1DBE5;
      }
    }
  }
</style>
