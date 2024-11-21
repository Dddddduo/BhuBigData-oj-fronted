<template>
  <div id="addQuestionView" style="max-width: 800px; margin: 0 auto">
    <h2 style="margin-bottom: 16px">创建题目(使用MD格式书写)</h2>

    <a-form :model="form" label-align="left">
      <a-form-item label="标题">
        <a-input v-model="form.title" placeholder="" />
      </a-form-item>

      <a-form-item label="标签">
        <a-input-tag v-model="form.tags" placeholder="请选择标签" allow-clear />
      </a-form-item>

      <a-form-item label="题目内容">
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>

      <a-form-item label="题解内容">
        <MdEditor :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>

      <a-form-item label="判题配置一">
        <div>
          <a-form-item label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>
        </div>
      </a-form-item>

      <a-form-item label="判题配置二">
        <div>
          <a-form-item label="内存限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>
        </div>
      </a-form-item>

      <a-form-item label="判题配置三">
        <div>
          <a-form-item label="堆栈限制">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入堆栈限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>
        </div>
      </a-form-item>

      <a-form-item label="测试用例配置">
        <!-- 使用表格布局或者 flex 布局 -->
        <table>
          <tbody>
            <tr v-for="(judgeCaseItem, index) of form.judgeCase" :key="index">
              <td>
                <a-form-item :label="`输入用例-${index}`" no-style>
                  <a-input
                    v-model="judgeCaseItem.input"
                    placeholder="请输入测试输入用例"
                  />
                </a-form-item>
              </td>
              <td>
                <a-form-item :label="`输出用例-${index}`" no-style>
                  <a-input
                    v-model="judgeCaseItem.output"
                    placeholder="请输入测试输出用例"
                  />
                </a-form-item>
              </td>
              <td>
                <a-button status="danger" @click="handleDelete(index)"
                  >删除
                </a-button>
              </td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 16px">
          <a-button @click="handleAdd" type="outline" status="success"
            >新增测试用例
          </a-button>
        </div>
      </a-form-item>

      <a-form-item style="text-align: center">
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
// 如果页面地址包含 update，视为更新页面

//123
const updatePage = route.path.includes("update");

let form = ref({
  title: "",
  tags: [],
  answer: "",
  content: "",
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
});

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    // json 转 js 对象
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
  } else {
    message.error("加载失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const doSubmit = async () => {
  console.log(form.value);
  // 区分更新还是创建
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("更新题目成功");
      router.push({
        path: "/manage/question",
        replace: true,
      });
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("创建成功");
      router.push({
        path: "/manage/question",
        replace: true,
      });
    } else {
      message.error("创建失败，" + res.message);
    }
  }
};

/**
 * 新增判题用例
 */
const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};

/**
 * 删除判题用例
 */
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};

const onContentChange = (value: string) => {
  form.value.content = value;
};

const onAnswerChange = (value: string) => {
  form.value.answer = value;
};
</script>

<style scoped>
#addQuestionView {
}
</style>
