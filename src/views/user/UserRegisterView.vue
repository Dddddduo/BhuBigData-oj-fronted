<template>
  <div id="userLoginView" class="Login">
    <h2 style="margin-bottom: 16px">用户注册</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号"  tooltip="账号不小于4位 全英文">
        <a-input v-model="form.userAccount" placeholder="请输入注册账号" />
      </a-form-item>
      <a-form-item
        field="userName"
        tooltip="出现在网页的右上角 是您的标识"
        label="账号昵称"
      >
        <a-input v-model="form.userName" placeholder="请输入您的名称" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于6位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        field="userPassword"
        tooltip="确保两次输入的密码一致"
        label="确认密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <div style="display: flex; justify-content: center" class="register">
          <a-space class="wrapper" direction="vertical">
            <a-button type="primary" html-type="submit" style="width: 120px">
              注册
            </a-button>
          </a-space>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<style>
.wrapper {
  width: 360px;
  /*padding: 20px;*/
  border-radius: 4px;
}

.Login {
  background: linear-gradient(to bottom, #f0f2f5, #ffffff); /* 示例渐变背景 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

<script setup lang="ts">
import { reactive } from "vue";
import {
  UserControllerService,
  UserLoginRequest,
  UserRegisterRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
  userName: "",
} as UserRegisterRequest);

const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param event
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);

  // 登录成功，跳转到主页
  if (res.code === 0) {
    // alert(res.message);
    message.success("恭喜您注册成功!现在可以登录了!");
    await store.dispatch("user/getLoginUser");
    let baseResponseLoginUserVO;
    await UserControllerService.getLoginUserUsingGet();
    console.log(baseResponseLoginUserVO);
    ACCESS_ENUM.ADMIN,
      router.push({
        path: "/login",
        replace: true,
      });
  } else {
    message.error("注册失败," + res.message);
  }
};
</script>
