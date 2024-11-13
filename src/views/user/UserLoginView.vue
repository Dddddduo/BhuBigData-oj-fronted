<template>
  <div id="userLoginView" class="Login">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <div style="display: flex; justify-content: center" class="register">
          <a-space class="wrapper" direction="vertical">
            <a-button type="primary" html-type="submit" style="width: 120px">
              登录
            </a-button>
          </a-space>
        </div>
      </a-form-item>
    </a-form>
      <img
              src="../../assets/login.png"
              alt="Forget photo"
              style="width: 500px; height: auto; border: 2px solid #000"
      />
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
import { UserControllerService, UserLoginRequest } from "../../../generated";
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
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {

  console.log("看看我执行了吗")

  // 登录
  const res = await UserControllerService.userLoginUsingPost(form);
  console.log("得到登录的请求数据为",res);

  // 获取的是登录信息
  // const baseResponseLoginUserVO   =  await UserControllerService.getLoginUserUsingGet();
  // console.log("得到的登录信息为",baseResponseLoginUserVO);

  if (res.code === 0) {
    message.success("恭喜您！登录成功！");
    await store.dispatch("user/getLoginUser");
    const baseResponseLoginUserVO   =  await UserControllerService.getLoginUserUsingGet();
    console.log(baseResponseLoginUserVO);
    // 弹窗是Object
    // alert(baseResponseLoginUserVO)
    ACCESS_ENUM.ADMIN
    // 跳转路由
      router.push({
        path: "/",
        replace: true,
      });
  } else {
    message.error("登陆失败," + res.message);
  }
};

router.beforeEach((to, from, next) => {
  // 仅管理员可见 判断当前用户是否有权限
  if (to.meta?.access === "canAdmin") {
    if (store.state.user.loginUser?.role !== "admin") {
      next("noAuth");
      return;
    }
  }
  next();
});

</script>
