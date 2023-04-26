<template>
  <div class="nav-tab-container">
    <div class="nav-wrapper">
      <div class="nav-show">
        <ul>
          <li
            v-for="(item, idx) in menuList"
            :key="idx"
            :id="`li-${item.id}`"
            :class="{ active: currentTab.path === item.path }"
            @contextmenu="handleContextMenu(item, idx)"
          >
            <span class="tab-name" @click="handleTabClick(item, idx)">{{
              item.name
            }}</span>
            <i class="close-btn" @click="handleClose(item)"></i>
            <div
              :class="[
                'context-menu',
                {
                  'context-menu-class':
                    contextMenuVisible && contextMenuId === item.id,
                },
              ]"
              @click.stop
            >
              <div class="context-menu-item" @click="handleRefreash(item)">
                刷 新
              </div>
              <div class="context-menu-item" @click="handleClose(item)">
                关 闭
              </div>
              <div class="context-menu-item" @click="handleCloseAllLeft(item)">
                关闭左侧
              </div>
              <div class="context-menu-item" @click="handleCloseAllRight(item)">
                关闭右侧
              </div>
              <div class="context-menu-item" @click="handleCloseAll()">
                关闭所有
              </div>
              <div class="context-menu-item" @click="handleCloseOther(item)">
                关闭其他
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div
        class="more-arrow"
        v-show="collapseMenuList.length"
        @click="handleShowApse"
      ></div>
      <div
        :class="[
          'nav-collapse',
          { showApseClass: showApse && collapseMenuList.length },
        ]"
      >
        <div class="apse-ul">
          <div
            class="apse-li-wrapper"
            v-for="(item, idx) in collapseMenuList"
            :key="idx"
            :id="`li-${idx}`"
          >
            <div
              class="apse-li"
              :class="{ active: currentTab.path === item.path }"
            >
              <span class="tab-name" @click="handleTabCollapseClick(item)">{{
                item.name
              }}</span>
              <i class="close-btn" @click="handleCollapseClose(item)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tab-content">内容: {{ currentTab.name }}</div>
    <div class="plus-tab" @click="handleAdd">
      <el-button size="small" type="primary">打开新的tab</el-button>
    </div>
  </div>
</template>

<script>
import { makeRandomId } from '@/utils/index'
import '@/assets/css/reset.css'
export default {
  name: 'NavTab',
  data () {
    return {
      showApse: false,
      contextMenuVisible: false,
      contextMenuId: '',
      currentTab: {
        name: '首页',
        path: '/home'
      },
      menuList: [
        {
          id: 1,
          name: '首页',
          path: '/home'
        }
        // {
        //   id: 2,
        //   name: '产品',
        //   path: '/product'
        // },
        // {
        //   id: 3,
        //   name: '关于我们',
        //   path: '/about'
        // }
      ],
      changeWidth: 0,
      showMenuList: [],
      collapseMenuList: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.changeWidth = document.querySelector('.nav-show').clientWidth
    })
    window.addEventListener('resize', this.onresize)

    document.querySelector('.nav-wrapper').oncontextmenu = (e) => {
      e.preventDefault()
      return false
    }
    document.addEventListener('click', () => {
      console.log('document click')
      if (this.contextMenuVisible) {
        this.contextMenuVisible = false
      }
    })
  },
  watch: {
    menuList: {
      handler (val) {
        if (val.length === 0) {
          this.currentTab = {
            id: 0,
            name: '首页',
            path: '/home'
          }
          return
        }
        this.$nextTick(() => {
          const navDom = document.querySelector('.nav-wrapper')
          const initWidth = navDom.clientWidth
          const changeWidth = this.changeWidth
          let intVal = initWidth - changeWidth
          if (this.collapseMenuList.length) {
            const width = document.querySelector('.more-arrow').clientWidth
            intVal = intVal - width
          }
          // console.log('intVal', intVal)
          if (intVal <= 0) {
            this.collapseMenuList.push(val[val.length - 2])
            const lastItem = val[val.length - 1]
            this.menuList.splice(val.length - 2, 1)
            this.changeWidth =
              this.changeWidth -
              document.getElementById('li-' + lastItem.id).clientWidth
            console.log('超出了')
          } else {
            this.changeWidth = document.querySelector('.nav-show').clientWidth
          }
        })
      },

      immediate: true
    }
  },
  methods: {
    onresize () {
      const newWidth = document.querySelector('.nav-show').clientWidth
      const val = this.menuList
      const navDom = document.querySelector('.nav-wrapper')
      const initWidth = navDom.clientWidth
      const changeWidth = newWidth
      let intVal = initWidth - changeWidth
      if (this.collapseMenuList.length) {
        const width = document.querySelector('.more-arrow').clientWidth
        intVal = intVal - width
      }
      console.log('intVal', intVal)
      if (intVal <= 0) {
        this.collapseMenuList.push(val[val.length - 2])
        const lastItem = val[val.length - 1]
        this.menuList.splice(val.length - 2, 1)
        this.changeWidth =
          this.changeWidth -
          document.getElementById('li-' + lastItem.id).clientWidth
        // console.log('超出了')
      } else {
        const ulWidth = document.querySelector('.apse-ul').clientWidth
        console.log('ulWidth', ulWidth)
        if (intVal >= ulWidth) {
          const first = this.collapseMenuList.shift()
          if (first) {
            this.menuList.push(first)
          }
        } else {
          this.changeWidth = document.querySelector('.nav-show').clientWidth
        }
      }
      const idx = this.menuList.findIndex((v) => {
        return v.path === this.currentTab.path
      })
      if (idx === -1) {
        this.currentTab = this.menuList[this.menuList.length - 1]
      }
    },
    handleTabClick (item, idx) {
      this.currentTab = item
    },
    handleClose (item) {
      const idx = this.menuList.findIndex((v) => {
        return v.path === item.path
      })
      if (idx !== -1) {
        this.menuList.splice(idx, 1)
        if (this.menuList.length === 0) {
          this.menuList.push({
            id: 0,
            name: '首页',
            path: '/home'
          })
          return
        }
        const first = this.collapseMenuList.shift()
        if (first) {
          this.menuList.push(first)
          this.currentTab = first
          // this.$nextTick(() => {
          //   console.log('item', first)
          //   const navDom = document.getElementById('li-' + first.id)
          //   console.log('navDom', navDom)
          //   this.changeWidth = this.changeWidth + navDom.clientWidth
          // })
          return
        }
        this.currentTab = this.menuList[this.menuList.length - 1]
      }
    },
    handleCollapseClose (item) {
      const idx = this.collapseMenuList.findIndex((v) => {
        return v.path === item.path
      })
      if (idx !== -1) {
        this.collapseMenuList.splice(idx, 1)
      }
    },
    handleTabCollapseClick (item) {
      const idx = this.collapseMenuList.findIndex((v) => {
        return v.path === item.path
      })
      if (idx !== -1) {
        this.collapseMenuList.splice(idx, 1)
        const last = this.menuList.pop()
        this.collapseMenuList.unshift(last)
        this.menuList.push(item)
        this.currentTab = item
      }
      this.showApse = false
    },
    handleAdd () {
      const len = makeRandomId()
      const item = {
        id: len,
        name: '测试' + len,
        path: '/test' + len
      }
      this.menuList.push(item)
      this.currentTab = item
      this.$nextTick(() => {
        console.log('item', item)
        const navDom = document.getElementById('li-' + item.id)
        console.log('navDom', navDom)
        this.changeWidth = this.changeWidth + navDom.clientWidth
      })
    },
    handleShowApse () {
      this.showApse = !this.showApse
    },
    handleContextMenu (item) {
      console.log('item', item)
      // this.currentTab = item
      this.contextMenuVisible = true
      this.contextMenuId = item.id
      // this.contextMenuStyle = {
      //   left: event.clientX + 'px',
      //   top: event.clientY + 'px'
      // }
    },
    handleRefreash () {
      this.$message.success('刷新成功')
    },
    handleCloseAll () {
      this.menuList = [
        {
          id: 0,
          name: '首页',
          path: '/home'
        }
      ]
      this.collapseMenuList = []
      this.currentTab = this.menuList[0]
    },
    handleCloseAllLeft (item) {
      const idx = this.menuList.findIndex((v) => {
        return v.path === item.path
      })
      if (idx !== -1) {
        this.menuList = this.menuList.slice(idx)
        this.collapseMenuList = []
        this.currentTab = this.menuList[0]
      }
    },
    handleCloseAllRight (item) {
      const idx = this.menuList.findIndex((v) => {
        return v.path === item.path
      })
      if (idx !== -1) {
        this.menuList = this.menuList.slice(0, idx + 1)
        this.collapseMenuList = []
        this.currentTab = this.menuList[this.menuList.length - 1]
      }
    },
    handleCloseOther (item) {
      const idx = this.menuList.findIndex((v) => {
        return v.path === item.path
      })
      if (idx !== -1) {
        this.menuList = this.menuList.slice(idx, idx + 1)
        this.collapseMenuList = []
        this.currentTab = this.menuList[0]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav-tab-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin: 50px 0;
  // border: 1px solid blue;
  .nav-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    border-bottom: 1px solid #e4e7ed;
    .nav-show {
      height: 100%;
      display: inline-block;
      ul {
        height: 100%;
        display: inline-block;
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #e4e7ed;
        border-bottom: none;
        border-radius: 4px 4px 0 0;
        box-sizing: border-box;
        li {
          position: relative;
          display: inline-block;
          padding: 5px;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          border-bottom: 1px solid transparent;
          border-left: 1px solid #e4e7ed;

          &:hover {
            // background: #ccc;
            .tab-name {
              transform: scale(1.05);
              transition: 0.3s linear;
            }
          }

          .tab-name {
            display: inline-block;
            height: 100%;
            text-align: center;
            cursor: pointer;
            list-style: none;
            font-size: 14px;
            font-weight: 500;
            color: #6a6c6e;
            padding: 0 10px;
          }

          .close-btn {
            display: block;
            width: 15px;
            height: 15px;
            position: relative;
            cursor: pointer;
            &:hover {
              background: #ccc;
              border-radius: 50%;
            }
            &::before {
              position: absolute;
              left: 50%;
              top: 20%;
              content: " ";
              background-color: #6a6c6e;
              width: 1px;
              height: 10px;
              transform: rotate(45deg);
            }
            &::after {
              position: absolute;
              left: 50%;
              top: 20%;
              content: " ";
              background-color: #6a6c6e;
              width: 1px;
              height: 10px;
              transform: rotate(-45deg);
            }
          }
          .context-menu {
            position: absolute;
            left: 30%;
            top: 30px;
            width: 80px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 0 5px #ddd;
            pointer-events: none;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.2s linear;
            .context-menu-item {
              height: 30px;
              line-height: 30px;
              padding: 0 5px;
              text-align: center;
              font-size: 14px;
              &:hover {
                background: #ccc;
                color: #fff;
                cursor: pointer;
              }
            }
          }
          .context-menu-class {
            z-index: 999;
            pointer-events: auto;
            opacity: 1;
            transition: opacity 0.3s linear;
          }
        }
        li:first-of-type {
          border-left: none;
        }

        li.active {
          border-bottom-color: #fff;
          transition: border-bottom-color 2s linear;
          &:hover {
            background: none;
          }
          &::after {
            content: "";
            width: 100%;
            height: 2px;
            position: absolute;
            left: 0;
            bottom: -2px;
            background: #fff;
          }
          .tab-name {
            color: #2c7ceb;
          }

          .close-btn {
            &::before {
              background-color: #2c7ceb;
            }
            &::after {
              background-color: #2c7ceb;
            }
          }
        }
      }
    }
    .more-arrow {
      height: 27px;
      padding: 0 15px 0 5px;
      text-align: center;
      font-size: 14px;
      &:hover {
        background: #f1f3f4;
        border-radius: 3px;
        cursor: pointer;
      }
      &::after {
        content: " ";
        display: inline-block;
        height: 8px;
        width: 8px;
        border-width: 1px 1px 0 0;
        border-color: #6a6c6e;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: relative;
        top: 25%;
        left: 50%;
        margin-left: -2px;
      }
      // &::before {
      //   content: " ";
      //   display: inline-block;
      //   height: 8px;
      //   width: 8px;
      //   border-width: 1px 1px 0 0;
      //   border-color: #6a6c6e;
      //   border-style: solid;
      //   -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      //   transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      //   position: relative;
      //   top: 25%;
      //   left: 50%;
      //   margin-left: -4px;
      // }
    }

    .nav-collapse {
      position: absolute;
      right: 10px;
      top: 35px;
      opacity: 0;
      transition: opacity 0.2s linear;
      .apse-ul {
        display: flex;
        flex-direction: column;
        border: 1px solid #ddd;
        z-index: 999;
        border-radius: 5px;
        box-shadow: 0 0 5px #ddd;
        padding: 3px 0;
        overflow: hidden;
        .apse-li-wrapper {
          display: flex;
          flex-wrap: wrap;

          .apse-li {
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            text-align: center;
            font-size: 14px;
            display: flex;
            align-items: center;
            &:hover {
              background: #ccc;
              color: #fff;
              cursor: pointer;
              .close-btn::before {
                background-color: #fff;
              }
              .close-btn::after {
                background-color: #fff;
              }
            }

            .tab-name {
              display: block;
              text-align: center;
              cursor: pointer;
              margin-right: 10px;
            }

            .close-btn {
              display: block;
              width: 15px;
              height: 15px;
              position: relative;
              cursor: pointer;
              &::before {
                position: absolute;
                left: 50%;
                top: 20%;
                content: " ";
                background-color: #6a6c6e;
                width: 1px;
                height: 10px;
                transform: rotate(45deg);
              }
              &::after {
                position: absolute;
                left: 50%;
                top: 20%;
                content: " ";
                background-color: #6a6c6e;
                width: 1px;
                height: 10px;
                transform: rotate(-45deg);
              }
            }
          }
        }
      }
    }
    .showApseClass {
      opacity: 1;
      transition: opacity 0.3s linear;
    }
  }

  .tab-content {
    height: 300px;
    margin: 30px;
    color: #2c7ceb;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .plus-tab {
    margin-left: 100px;
  }
}
</style>
