import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AdminView from "@/views/AdminView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import ExampleView from "@/views/ExampleView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserForgetView from "@/views/user/UserForgetView.vue";
import HelloView from "@/views/HelloView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页公告",
    component: HelloView,
  },
  {
    path: "/login",
    name: "用户登录",
    component: UserLoginView,
  },
  {
    path: "/register",
    name: "用户注册",
    component: UserRegisterView,
  },
  {
    path: "/forget",
    name: "重置密码",
    component: UserForgetView,
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/QuestionView",
    name: "浏览题目",
    component: QuestionsView,
  },
  {
    path: "/QuestionSubmitView",
    name: "题目提交",
    component: QuestionSubmitView,
  },
  {
    path: "/hide",
    name: "隐藏页面",
    component: ExampleView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/admin",
    name: "仅管理员可见",
    component: AdminView,
    meta: {
      access: "canAdmin",
      hideInMenu: true,
    },
  },
  {
    path: "/about",
    name: "关于我们",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: ViewQuestionView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
