<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png" />-->
    <CodeEditor :value="codevalue" :handle-change="onCodeChange" />
    <MdEditor :value="mdvalue" :handle-change="onMdChange" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const codevalue = ref();
const mdvalue = ref();

const onCodeChange = (v: string) => {
  codevalue.value = v;
  console.log(codevalue);
};
const onMdChange = (v: string) => {
  mdvalue.value = v;
  console.log(mdvalue);
};
</script>
