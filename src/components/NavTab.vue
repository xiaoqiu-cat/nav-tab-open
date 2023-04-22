<template>
  <div class="nav-tab-container">
    <div class="nav-wrapper">
      <div class="nav-show">
        <ul>
          <li v-for="(item,idx) in menuList" :key="idx" :id="`li-${idx}`">
            <span class="tab-name" @click="handleTabClick(item,idx)">{{ item.name }}</span>
            <i class="close-btn" @click="handleClose(item)">+</i>
          </li>
        </ul>
      </div>
      <div class="nav-collapse" v-show="collapseMenuList.length">
        <ul>
          <li v-for="(item,idx) in collapseMenuList" :key="idx" :id="`li-${idx}`">
            <span class="tab-name" @click="handleTabClick(item,idx)">{{ item.name }}</span>
            <i class="close-btn" @click="handleClose(item)">+</i>
          </li>
        </ul>
      </div>
    </div>
    <div class="tab-content">
      {{ currentTab.name }}
    </div>
    <div class="plus-tab" @click="handleAdd">
      打开新的tab
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavTab',
  data () {
    return {
      currentTab: {
        name: '首页',
        path: '/home'
      },
      menuList: [
        {
          name: '首页',
          path: '/home'
        },
        {
          name: '产品',
          path: '/product'
        },
        {
          name: '关于我们',
          path: '/about'
        }
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
  },
  watch: {
    menuList: {
      handler (val) {
        this.$nextTick(() => {
          const navDom = document.querySelector('.nav-wrapper')
          const initWidth = navDom.clientWidth
          const changeWidth = this.changeWidth
          const intVal = initWidth - changeWidth
          console.log('initWidth', initWidth)
          console.log('changeWidth', changeWidth)
          if (intVal < 0) {
            this.collapseMenuList.push(val[val.length - 1])
            this.menuList.pop()
            this.changeWidth = this.changeWidth - document.getElementById('li-' + (val.length - 1)).clientWidth
            console.log('超出了')
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    handleTabClick (item, idx) {
      this.currentTab = item
    },
    handleClose (item) {
      const idx = this.menuList.findIndex(v => {
        return v.path === item.path
      })
      if (idx !== -1) {
        this.menuList.splice(idx, 1)
        if (this.menuList.length === 0) {
          this.menuList.push({
            name: '首页',
            path: '/home'
          })
          return
        }
        this.currentTab = this.menuList[this.menuList.length - 1]
      }
    },
    handleAdd () {
      const len = this.menuList.length
      this.menuList.push({
        name: '测试' + len,
        path: '/test' + len
      })
      this.currentTab = {
        name: '测试' + len,
        path: '/test' + len
      }
      this.$nextTick(() => {
        const navDom = document.getElementById('li-' + len)
        this.changeWidth = this.changeWidth + navDom.clientWidth
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nav-tab-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .nav-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    // border: 1px solid blue;
    .nav-show{
      height: 100%;
      display: inline-block;
      // border: 1px solid red;
      ul{
        height: 100%;
        // border: 1px solid yellow;
        display: inline-block;
        display: flex;
        flex-wrap: wrap;
        border: 1px solid red;
        li{
          height: 100%;
          border: 1px solid #ddd;
          display: inline-block;
          padding: 1px 0 3px 5px;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          &:hover{
            border: 1px solid #2c7ceb;
            .tab-name{
              color: #2c7ceb;
            }
            .close-btn{
              color: #2c7ceb;
            }
          }
          .tab-name{
            display: inline-block;
            height: 100%;
            text-align: center;
            cursor: pointer;
          }
          .close-btn{
            display: block;
            width: 25px;
            height: 25px;
            font-size: 25px;
            text-align: center;
            transform: rotateZ(-45deg);
            cursor: pointer;
            color: #ccc;
            margin-left: 5px;
            &:hover{
              color: #2c7ceb;
            }
          }
        }
      }
    }
    .nav-collapse{
      position: absolute;
      min-width: 150px;
      height: 50px;
      right: 0px;
      top: 30px;
      border: 1px solid red;
      // border: 1px solid green;
    }
  }
  .tab-content{
    margin: 30px;
  }
  .plus-tab{
    display: inline-block;
    padding: 3px;
    border: 1px solid #ddd;
    cursor: pointer;
  }
}
</style>
