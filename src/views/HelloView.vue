<template>
    <div class="container">
        <br>
        <header>
            <h1>欢迎来到 OJ 判题系统  ʕ•͡ᴥ•ʔ ～</h1>
            <p class="subtitle">这是一个在线判题系统,提供Java编程题目练习和自动评测功能,所有的代码逻辑均属于自研,欢迎大家学习交流</p>
        </header>

        <section class="profile">
            <h2>关于我</h2>
            <h3>“是你 抚去我迟迟不肯 我嶙峋的爱 茂若繁春”</h3>
            <ul>
                <li><strong>姓名：</strong> Cute Puppy Dduo</li>
                <li><strong>职业：</strong> 软件开发工程师</li>
                <li><strong>技能：</strong> Vue.js,React,数据结构与算法,TypeScript,Java,SpringBoot,SpringCloud</li>
            </ul>

            <br>

            <p class="subtitle">注:本项目的所有业务已经在github上面开源,一套前端,三套后端</p>
            <h3>“你好像在等十九世纪的青洄 可我是北纬67度以北的雪”</h3>
            <img src = 'https://s3.bmp.ovh/imgs/2024/11/14/9c663fa45ea43d97.jpg' >
            <br>
            <ul style="font-size: 30px;">
                <li><a href="http://gczdy.cn/" target="_blank">个人主页(点击访问)</a></li>
                <li><a href="https://github.com/Dddddduo" target="_blank">GitHub主页(点击访问)</a></li>
                <li><a href="https://blog.csdn.net/qq_30500575" target="_blank">CSDN主页(点击访问)</a></li>
            </ul>
        </section>

        <section class="updates">
            <h2>开发日志</h2>
            <h3>“我作堪堪破雪的绝句 你答濯濯不朽晓山青”</h3>
            <p>最新的更新和改进：</p>
            <ul>
                <li><strong>2024年11月：</strong> 编写复杂接口,如邮箱找回密码,登录校验</li>
                <li><strong>2024年10月：</strong> 进行了增删改查接口的调试,并且美化了页面</li>
                <li><strong>2024年9月：</strong> 进行简单的测试,编写开发文档</li>
                <li><strong>2024年8月：</strong> 项目初始化,成功前后端联调，开放用户体验</li>
            </ul>
        </section>

    </div>
</template>

<script>
export default {
    name: 'HelloView',
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #e5d4d4;
    color: #333;
}

.container {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
}

header {
    text-align: center;
    margin-bottom: 30px;
}

h1 {
    font-size: 2.5rem;
    color: #4CAF50;
}

h3 {
    font-size: 2.5rem;
    color: #eaa9dc;
    font-family: 'STXingkai';
}

.subtitle {
    font-size: 1.2rem;
    color: #888;
}

section {
    margin-bottom: 40px;
}

h2 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 15px;
}

ul {
    list-style-type: none;
}

ul li {
    font-size: 1.1rem;
    margin: 10px 0;
}

a {
    color: #4CAF50;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

footer {
    text-align: center;
    font-size: 0.9rem;
    color: #777;
    margin-top: 50px;
}
</style>
