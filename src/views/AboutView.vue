<template>
  <div class="lab-intro">
    <h1>欢迎来到大数据应用与开发实验室</h1>
    <div class="team">
      <h2>Our Team</h2>
      <img
        src="../assets/Bigdata.png"
        alt="Team Photo"
        style="width: 800px; height: auto; border: 2px solid #000"
      />
    </div>
    <div class="about">
      <h2>About Us</h2>
      <p>
        大数据实验室成立于2019年，计算机科学技术学院几位学长获得了互联网＋北华大学最高奖项，成立了大数据实验室。
      </p>
      <p>
        大数据实验室主要分为大数据和全栈，全栈以后端服务端和前端网页、App为主，大数据以Flink为轴点，开放性实践应用，在这里你可以学习任何你想学习的技术。
      </p>
      <p>
        技术方面，大数据工作室拥有浓厚的学习氛围，这里的每个成员都对学习技术拥有浓烈的热情，我们拥有大数据和全栈两种方向，不管你遇到什么问题，都会有学长对你的问题做出解决，我们拥有丰富的实践经验，众多新颖的项目供学习。
      </p>
      <p>
        学习方面，大数据工作室成员不仅技术强硬，在学习方面也是不俗，工作室平均gpa保持在3分以上，并在课设方面有很多经验，学习氛围浓厚。
      </p>
    </div>
    <div class="mission">
      <h2>Our Achievement</h2>
      <p>
        在19年的互联网+的比赛中，实验室成员更是不负众望，捧回了北华大学校史上的互联网＋比赛最高奖项国奖。
      </p>
      <p>
        2020年的国际互联网+，创青春挑战杯，两个国家A类比赛，大数据实验室的成员都曾代表北华大学奔赴更高级别的赛场，并取得金奖和银奖等不俗的成绩。
      </p>
      <p>
        2021年的大学生创新创业大赛中，实验室成员的“中国版乐高-榫卯”入围了北华大学国家级项目。
      </p>
      <p>
        2022年的蓝桥杯大赛中，实验室成员取得了国家级三等奖，省级一等奖等不错的成绩。
      </p>
      <p>
        2023年获得计算机设计大赛省级二等奖，实验室成员的“TA-基于大数据时代的记忆共享平台”入选北华大学国家级立项。同时获得了三项省级立项项目。
      </p>
      <p>
        2024上半年，AI，大数据，嵌入式三个工作室联动项目:基于OpenHarmony的智慧农业灌溉管理系统在1000多支参赛队伍中脱颖而出。决赛与四川大学、深圳大学等8所院校同台竞技。最终在开放原子大赛中斩获国家级二等奖。
      </p>
    </div>
    <div class="services">
      <h2>Services Offered</h2>
      <ul>
        <li>
          Web后端开发：JavaWeb Maven Springboot MySQL Redis SpringCloud Docker
        </li>
        <li>
          Web前端开发：Html Css JavaScript Vue Vue-cil Element-ui React NodeJS
        </li>
        <li>考研408：计算机组成原理 计算机网络 数据结构 操作系统</li>
        <li>
          自我学习：黑马程序员 尚硅谷 牛客竞赛 Codeforce Github 小林coding
          chatgpt CSDN Gitee
        </li>
      </ul>
    </div>
    <div class="contact">
      <h2>Contact Us</h2>
      <p>Address: 吉林省吉林市龙潭区新山街1号北华大学北校区第一教学楼1421</p>
      <p>QQ Group: +930794910</p>
      <p>
        Online pan:
        <a href="http://pan.bhbigdata.cn/login">BigData Cloud Storage </a>
      </p>
      <p>
        WeChat Official Account:
        <a href="https://mp.weixin.qq.com/s/0kF1kb3sj3O1DNH52xynjw"
          >BigData Stdio</a
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
.lab-intro {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.lab-intro h1 {
  text-align: center;
  margin-bottom: 20px;
}

.lab-intro h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.lab-intro p {
  line-height: 1.6;
}

.lab-intro .about,
.lab-intro .mission,
.lab-intro .services,
.lab-intro .team,
.lab-intro .contact {
  margin-bottom: 30px;
}

.lab-intro ul {
  list-style-type: disc;
  padding-left: 20px;
}
</style>
<script setup lang="ts"></script>
