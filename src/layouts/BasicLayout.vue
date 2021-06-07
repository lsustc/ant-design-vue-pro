<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider 
        v-if="navLayout === 'left'"
        :theme="navTheme" 
        v-model="collapsed" 
        :trigger="null" 
        collapsible>
        <div class="logo">Ant Design Vue Pro</div>
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" class="trigger" @click="collapsed = !collapsed"></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <SettingDrawer/>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
import SettingDrawer from "../components/SettingDrawer/index";
export default {
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
  },
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || 'dark';
    },
    navLayout() {
      return this.$route.query.navLayout || 'left';
    }
  }
};
</script>
<style scoped>
.trigger {
    padding: 0 20px;
    line-height: 64px;
    font-size: 20px;
}
.trigger:hover {
    background: #eee;
}
.logo{
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}
.nav-theme-dark >>> .logo {
  color: #fff;
}
</style>