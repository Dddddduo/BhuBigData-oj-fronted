<template>
  <div id="questionSubmitView">

    <a-form :model="searchParams" layout="inline">

      <a-form-item field="questionId" label="题号" style="min-width: 240px">
        <a-input v-model="searchParams.questionId" placeholder="请输入" />
      </a-form-item>

      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          placeholder="选择编程语言"
        >
          <a-option>java</a-option>
          <a-option>其他</a-option>
        </a-select>
      </a-form-item>

      <a-form-item field="userName" label="提交者" style="min-width: 240px">
        <a-input v-model="searchParams.userName" placeholder="请输入" />
      </a-form-item>
<!--      <a-form-item>-->
<!--        <a-button type="primary" @click="doSubmit">搜索</a-button>-->
<!--      </a-form-item>-->
    </a-form>

    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >

      <!-- 判题信息 -->
      <template #judgeInfo="{ record }">
        <div>
          <div><b>Message:</b> {{ record.judgeInfo.message || '未知' }}</div>
          <div><b>Memory Limit:</b> {{ record.judgeInfo.memoryLimit || '未知' }}</div>
          <div><b>Time:</b> {{ record.judgeInfo.time || '未知' }}</div>
        </div>
      </template>

      <!-- 展示的是提交时间  -->
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>

      <!-- 展示点击就能直接访问题目 -->
      <template #questionId="{ record }">
        <router-link :to="'/view/question/' + record.questionId">
          {{ record.questionId }}
        </router-link>
      </template>

      <!-- 修改这里，展示判题状态 -->
      <template #status="{ record }">
        <span v-if="record.status === 0">待判题</span>
        <span v-else-if="record.status === 1">判题中</span>
        <span v-else-if="record.status === 2">判题成功</span>
        <span v-else>未知状态</span>
      </template>

    </a-table>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();
const dataList = ref([]);
const total = ref(0);

const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: "",
  userName: "",
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
  );

  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

// 当组件中的任何输入发生变化的时候 watchEffect都会重新执行
watchEffect(() => {
  loadData();
});

onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "提交编号(不是题号)",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    slotName: "status", // 修改此行，指向自定义的status插槽
  },
  {
    title: "题号",
    slotName: "questionId",
  },
  {
    title: "提交者",
    dataIndex: "userName",

  },
  {
    title: "提交时间",
    slotName: "createTime",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

// const doSubmit = () => {
//   searchParams.value = {
//     ...searchParams.value,
//     current: 1,
//   };
// };
</script>

<style scoped>
#questionSubmitView {
    max-width: 1280px;
    margin: 0 auto;
}
</style>
