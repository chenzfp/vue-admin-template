<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="menu in menus" :key="menu.id" :item="menu" :base-path="menu.pageUrl" />
        <!--<sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />-->
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { menuApi } from '@/api/menu'
import { STATUS_OK } from '@/api/config'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      moduleId: 6,
      menus: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    this.getMenus()
  },
  methods: {
    /**
     * 获取左侧导航菜单并缓存
     */
    async getMenus() {
      await menuApi.getMenuTreeByCurrentSystem(this.moduleId)
        .then((res) => {
          if (res.code === STATUS_OK) {
            sessionStorage.setItem('menuData', JSON.stringify(res.data))
            this.menus = res.data
          }
        })
      /* await this.$store.dispatch('user/getMenuTreeByCurrentSystem').then(data => {
        this.menus = data
      })*/
      // this.menus = this.$store.getters.userMenus
    }
  }
}
</script>
