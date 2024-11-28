<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 400px; height: 80vh"
  />
  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { defineProps, onMounted, ref, toRaw, watch, withDefaults } from "vue";

// 设置代码高亮
monaco.languages.register({ id: 'java' });

monaco.languages.setMonarchTokensProvider('java', {
  tokenizer: {
    root: [
      // 关键字
      [/\b(?:public|private|protected|static|final|class|interface|abstract|synchronized|transient|volatile|native|strictfp)\b/, 'keyword'],
      // 数据类型
      [/\b(?:int|float|boolean|String|void|char|long|short|byte|double|Object|Enum|var)\b/, 'type'],
      // 标识符
      [/[A-Za-z_]\w*/, 'identifier'],
      // 数字
      [/\d+/, 'number'],
      // 字符串
      [/\"([^\\"]|\\.)*\"/, 'string'],
      // 字符
      [/'([^\\']|\\.)*'/, 'string'],
      // 注释
      [/\/\*[\s\S]*?\*\//, 'comment'],
      [/\/\/.*/, 'comment'],
      // 操作符
      [/\+\+|--|\+|\-|\*|\/|\%|=|\+=|-=|\*=|\/=|==|!=|<|>|<=|>=|\&\&|\|\|!|\?|:/, 'operator'],
      // 括号和分隔符
      [/[{}()\[\]]/, 'delimiter'],
      [/[;,.]/, 'delimiter'],
      // 常量
      [/\b(?:true|false|null)\b/, 'constant']
    ]
  },
  // 定义不同类型的token的样式
  theme: {
    base: 'vs',  // 基于默认主题
    inherit: true, // 继承默认主题
    rules: [
      // 关键字使用深蓝色
      { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
      // 数据类型使用紫色
      { token: 'type', foreground: '800080' },
      // 字符串使用绿色
      { token: 'string', foreground: '008000' },
      // 注释使用灰色
      { token: 'comment', foreground: '808080', fontStyle: 'italic' },
      // 操作符使用橙色
      { token: 'operator', foreground: 'FFA500' },
      // 常量使用红色
      { token: 'constant', foreground: 'FF0000' },
      // 数字使用蓝色
      { token: 'number', foreground: '0000FF' },
      // 标识符使用黑色
      { token: 'identifier', foreground: '000000' },
      // 括号和分隔符使用灰色
      { token: 'delimiter', foreground: 'A9A9A9' }
    ]
  }
});


/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language?: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "//在这里开始代码编辑",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const codeEditorRef = ref();
const codeEditor = ref();

// const fillValue = () => {
//   if (!codeEditor.value) {
//     return;
//   }
//   // 改变值
//   toRaw(codeEditor.value).setValue("新的值");
// };

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: `import java.util.*;
// 本代码沙箱版权由多多所有
// OpenJDK 1.8
// 按住ctrl键点击下方网页可访问个人主页
// http://gczdy.cn
public class Main {
    static Scanner sc = new Scanner(System.in);
    public static void main(String[] args) {
        // 在这边填写你的代码


    	sc.close();
    }
}`,
    // language: props.language,
    language: props.language,
    automaticLayout: false,
    colorDecorators: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
    lineNumbers: "true",
    roundedSelection: false,
    scrollBeyondLastLine: false,
    fontFamily: "'Courier New', monospace",
    fontSize: 20,
    acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
  });

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>