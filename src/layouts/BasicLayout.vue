<template>
  <div id="basicLayout">
    <a-layout style="height: 400px; min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>

      <a-layout-content class="content">
        <router-view />
      </a-layout-content>

      <a-layout-footer class="footer">
        <div>
          <font color="#ff91df">
            &copy;2024 - 2024 By Dduo From Shanghai China</font
          >
        </div>
        <a href="http://gczdy.cn/" target="_blank">
          北华大学大数据实验室在线判题系统(已申请软著)
        </a>
        <div class="demo-footer-wrapper">
          <a href="https://beian.miit.gov.cn/"
            >江苏省工信部ICP备案于2024-8-22通过 苏公网ICP备2024124094</a
          >
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  margin-top: 15px;
  margin-bottom: 10px;
  box-shadow: #ff91df 2px 1px 2px;
}

#basicLayout .content {
  background: #ffffff;
  margin-bottom: 16px;
  padding: 20px;
}

#basicLayout .footer {
  font-size: 12px;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: "Leelawadee UI";
}
</style>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
