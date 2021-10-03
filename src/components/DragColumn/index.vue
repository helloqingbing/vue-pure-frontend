<template>
  <div>
    <div class="layout" v-resize="resize">
      <div class="layout-left" :style="{ width: leftWidth }">
        <slot name="left" />
      </div>
      <div ref="drag" class="layout-drag" :style="{ left: leftWidth }" @mousedown="handleDown">
        <span class="line" />
        <span class="line" />
        <span class="line" />
        <span class="line" />
        <span class="line" />
        <span class="line" />
        <span class="line" />
        <span class="line" />
        <span class="line" />
      </div>
      <div class="layout-right" ref="lright" :style="{ width: rightWidth }">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DragColumn',
  data() {
    return {
      disX: 0,
      layoutWidth: 0,
      dragWidth: 0,
      leftWidth: 0,
      rightWidth: 0
    }
  },
  directives: {  // 使用局部注册指令的方式
    resize: { // 指令的名称
      bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
          let width = '', height = '';
          function isReize() {
            const style = document.defaultView.getComputedStyle(el);
            if (width !== style.width || height !== style.height) {
                binding.value(style.width,style.height);  // 关键 绑定函数
            }
            width = style.width;
            height = style.height;
          }
          el.__vueSetInterval__ = setInterval(isReize, 300);
      },
      unbind(el) {
          clearInterval(el.__vueSetInterval__);
      }
    }
  },
  computed: {
    siderBarStatus() {
      return this.$store.state.app.sidebar.opened
    }
  },
  mounted() {
    this.reflush()
    window.onresize = () => {
      this.reflush()
    }
  },
  methods: {
    handleDown(e) {
      const ev = e || event
      const pos = this.getPos(ev)
      const drag = this.$refs.drag
      this.disX = pos.x - drag.offsetLeft
      document.onmousemove = moveEvent => {
        const oEvent = moveEvent || event
        const movePos = this.getPos(oEvent)
        const t = movePos.x - this.disX
        const surplusWidth = this.layoutWidth - this.dragWidth - t
        const leftWidth = this.layoutWidth - this.dragWidth - surplusWidth
        if (leftWidth < 230) {
          return false
        } else if (surplusWidth < 230) {
          return false
        }
        this.leftWidth = leftWidth + 'px'
        this.rightWidth = surplusWidth + 'px'
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
      return false
    },
    reflush() {
      this.layoutWidth = document.querySelector('.layout').clientWidth
      this.dragWidth = document.querySelector('.layout-drag').clientWidth
      var leftW = 230 < 0.194 * this.layoutWidth ? 230 : 0.194 * this.layoutWidth
      this.leftWidth = leftW + 'px'
      var rightW = this.layoutWidth - leftW - this.dragWidth
      this.rightWidth = rightW + 'px'
    },
    getPos(ev) {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
      return { x: ev.clientX + scrollLeft, y: ev.clientY + scrollTop }
    },
    resize(width, height) {
      this.layoutWidth = parseFloat(width)
      // querySelector 有坑，只有mounted才能动态实时获取
      this.dragWidth = document.querySelector('.layout-drag').clientWidth
      var leftW = 230 < 0.194 * this.layoutWidth ? 230 : 0.194 * this.layoutWidth
      this.leftWidth = leftW + 'px'
      var rightW = this.layoutWidth - leftW - this.dragWidth
      this.rightWidth = rightW + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: calc(100vh - 113px);
  position: relative;
  .layout-left {
    width: 25.9%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }
  .layout-drag {
    width: 0.6%;
    position: absolute;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 231px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: col-resize;
    &:active{
      .line{
        transition: all 0.3s ease-in-out;
        background: #0f82ff;
        width: 3.5px;
        height: 3.5px;
        border-radius: 50%;
      }
    }
    .line {
      display: inline-block;
      width: 2px;
      height: 2px;
      background: #898989;
      margin-bottom: 5px;
      border-radius: 50%;
    }
  }
  .layout-right {
    width: 73.5%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
  }
}
.focus{
  .line{
    color: red;
  }
}
</style>
