<template>
  <div>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
      width="300"
    >
      <template v-slot:handle>
        <div class="setting-draw-handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
          <h2>整体风格定制</h2>
          <a-radio-group 
            :value="$route.query.navTheme || 'dark'" 
            @change="e => handleSettingChange('navTheme', e.target.value)">
            <a-radio value="dark">黑色</a-radio>
            <a-radio value="light">白色</a-radio>
          </a-radio-group>
          <h2>导航模式</h2>
          <a-radio-group
            :value="$route.query.navLayout || 'left'"
            @change="e => handleSettingChange('navLayout', e.target.value)">
            <a-radio value="left">左侧</a-radio>
            <a-radio value="top">顶部</a-radio>
          </a-radio-group>
      </div>
      
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      navTheme: 'light',
      navLayout: 'top'
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    onClose() {
      this.visible = false;
    },
    handleSettingChange(key, value) {
        this.$router.push({query: {...this.$route.query, [key]: value}})
    }
  },
};
</script>
<style lang="less" src="./index.less"></style>