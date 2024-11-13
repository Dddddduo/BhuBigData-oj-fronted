<template>
    <div id="userLoginView" class="Login">
        <h2 style="margin-bottom: 16px">忘记密码</h2>

<!--        第一个表单其中包含的是账号和邮箱-->
        <a-form
            style="max-width: 480px; margin: 0 auto"
            label-align="left"
            auto-label-width
            :model="upform"
            @submit="handleSubmit"
        >
            <a-form-item field="userProfile" tooltip="您的账号" label="账号">
                <a-input
                    v-model="upform.userAccount"
                    placeholder="请输入账号"
                />
            </a-form-item>

            <a-form-item field="userProfile" tooltip="这个邮箱是当时注册时填入的邮箱" label="邮箱">
                <a-input
                    v-model="upform.userProfile"
                    placeholder="请输入邮箱"
                />
            </a-form-item>

            <a-form-item>
                <div style="display: flex; justify-content: center" class="register">
                    <a-space class="wrapper" direction="vertical">
                        <!-- 设置按钮的 loading 和 disabled 属性 -->
                        <a-button
                            type="primary"
                            html-type="submit"
                            style="width: 120px"
                            :loading="isButtonLoading"
                            :disabled="isButtonDisabled"
                        >
                            {{ isButtonDisabled ? countdown + '秒后再试' : '发送验证码' }}
                        </a-button>
                    </a-space>
                </div>
            </a-form-item>
        </a-form>

<!--        图片-->
        <img
            src="../../assets/forget.png"
            alt="Forget photo"
            style="width: 200px; height: auto; border: 2px solid #000"
        />

<!--        第二个表单 包含新的验证码 还有新的密码 新密码-->
        <a-form
            style="max-width: 480px; margin: 0 auto"
            label-align="left"
            auto-label-width
            :model="downform"
            @submit="handleNewSubmit"
        >
<!--            -->
            <a-form-item field="userCode" tooltip="查看邮箱收到的邮件 里面包含了验证码" label="验证码">
                <a-input
                    v-model="downform.userCode"
                    placeholder="请输入验证码"
                />
            </a-form-item>
<!--            -->
            <a-form-item field="userNewPassword" tooltip="输入新的密码" label="新密码">
                <a-input
                    v-model="downform.userNewPassword"
                    placeholder="请输入更新的密码"
                />
            </a-form-item>
<!--            -->
            <a-form-item field="userCheckPassword" tooltip="再次输入新的密码" label="确认密码">
                <a-input
                    v-model="downform.userCheckPassword"
                    placeholder="请再次输入更新的密码"
                />
            </a-form-item>

            <a-form-item>
                <div style="display: flex; justify-content: center" class="register">
                    <a-space class="wrapper" direction="vertical">
                        <a-button
                            type="primary"
                            html-type="submit"
                            style="width: 120px"
                        >
                            {{ '重置密码' }}
                        </a-button>
                    </a-space>
                </div>
            </a-form-item>

        </a-form>




    </div>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {UserForgetRequests} from "../../../generated/models/UserForgetRequests";
import {UserResetRequests} from "../../../generated/models/UserResetRequests";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import { Alert } from '@arco-design/web-vue';
import message from "@arco-design/web-vue/es/message";

// 上表单的信息
const upform = reactive({
    userAccount: "",
    userProfile: "",
} as UserForgetRequests);

// 下表单的信息
const downform = reactive({
    userAccount: "",
    userCode: "",
    userNewPassword: "",
    userCheckPassword: "",
} as UserResetRequests);

const router = useRouter();
const store = useStore();

// 设置按钮的状态
const isButtonLoading = ref(false);
const isButtonDisabled = ref(false);
// const isUpdataButtonDisabled = ref(false);
const countdown = ref(0);

// 监听 upform.userAccount 的变化，当它改变时，更新 downform.userAccount
watch(() => upform.userAccount, (userAccount) => {
    downform.userAccount = userAccount;
});

// 提交上表单
const handleSubmit = async () => {
    handleButtonClick();

    message.loading("发送中,请稍后");
    // 发起请求
    const res = await UserControllerService.userForgetPost(upform);

    if (res.code === 0) {
        showMessage("success", "发送成功,请注意查看邮箱");
        console.log("账号",downform.userAccount)
    } else {
        showMessage("error", "发送失败," + res.message);
    }
};

// 提交下表单
const handleNewSubmit = async () => {
    const res = await UserControllerService.userUpdatePost(downform);
    if (res.code === 0) {
        message.success("重置密码成功！请牢记密码！")
        router.push({
            path: "/login",
            replace: true,
        });
    } else {
        message.error("重置密码失败 "+res.message);
    }
};

// 处理按钮点击事件
const handleButtonClick = () => {
    // 禁用按钮并开始倒计时
    isButtonDisabled.value = true;
    countdown.value = 10;
    const interval = setInterval(() => {
        countdown.value -= 1;
        if (countdown.value <= 0) {
            clearInterval(interval);
            isButtonDisabled.value = false;
        }
    }, 1000);
};

function showMessage(type, content, delay = 3000) {
    setTimeout(() => {
        message[type](content);
    }, delay);

    setTimeout(() => {
        message.clear('top');
    }, delay + 3000);  // 这里加上3秒，确保清除消息的时间在显示之后
}
</script>

<style>
.wrapper {
    width: 360px;
    border-radius: 4px;
}

.Login {
    background: linear-gradient(to bottom, #f0f2f5, #ffffff);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
