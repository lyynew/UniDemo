<template>
	<!-- 页面总布局容器 -->
	<view class="layout">
		<!-- 主体卡片区域 -->
		<view class="main">
			<!-- LOGO区域 -->
			<view class="logo">坤搜KunSoul🏀</view>

			<!-- 搜索框区域 -->
			<view class="search-box">
				<!-- 输入框，聚焦/失焦时切换图片 -->
				<input
					type="text"
					class="input-box"
					placeholder="咯咯哥哥🐓"
					@focus="changeImage(1)"
					@blur="changeImage(0)"
					v-model="question"
				/>

				<!-- 图像根据 isBlur 切换（睁眼/闭眼） -->
				<image
					src="/static/img/坤坤.png"
					mode="aspectFit"
					class="kunkun-img"
					v-show="!isBlur"
				/>
				<image
					src="/static/img/坤坤闭眼.png"
					mode="aspectFit"
					class="kunkun-img"
					v-show="isBlur"
				/>
				
			</view>
			<view class="ai-response">{{ new Date(timeNow).toLocaleString('zh-CN', {
				    year: 'numeric',    // 数字年份（如 2024）
				    month: 'long',      // 完整月份（如 8月）
				    day: 'numeric',     // 数字日期（如 5）
				    hour: '2-digit',    // 2位小时（如 15）
				    minute: '2-digit',  // 2位分钟（如 30）
				    second: '2-digit',   // 2位秒钟（如 45）
					weekday: 'long',
			  })}}
			</view>
			<view class="ai-response">
			  {{ loading ? '⏳ 正在思考中…' : answer }}
			</view>
		</view>
	</view>
</template>

<script setup>
// 引入 Vue 的响应式工具
import { watch,ref,onMounted,onUnmounted} from 'vue'


// 模拟答案库
const dataBase = ref([
    "鸡你太美",
    "你干嘛~哎哟",
    "唱、跳、rap、篮球",
    "ikun永相随",
    "练习时长两年半",
    "只因你太美",
    "这篮球打得真不错啊",
    "小黑子露出鸡脚了吧",
    "你看这个面它又长又宽",
    "我是练习生蔡徐坤"
])

// 控制图像睁眼/闭眼状态（true = 睁眼）
const isBlur = ref(true)

// 当前时间
const timeNow = ref(Date.now())

// 问题
const question = ref('')

// 加载
const loading = ref(false)

// 回答
const answer = ref('')


// 输入框焦点事件控制图像切换
function changeImage(v) {
	isBlur.value = v !== 1 // v为1时睁眼，其它为闭眼
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function run() {
  console.log('开始')
  await sleep(1000)  // 等待 1 秒（1000 毫秒）
  console.log('1 秒后执行')
}




let timer = null

onMounted(() => {
  // 每秒更新一次时间戳
  timer = setInterval(() => {
    timeNow.value = Date.now()
  }, 1000)
})

// 组件卸载时清除定时器，避免内存泄漏
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

//监听问题是否出现
watch(question, async (newQuestion, oldQuestion, onCleanup) => {
  let cleaned = false

  // 注册清理函数
  onCleanup(() => {
    cleaned = true
  })
	
  if(newQuestion == ''){
	  loading.value = true
		
	  await run()
	  if(!cleaned){
		  answer.value = '你好我是练习两年半的个人练习生坤坤。'
	  }
	  loading.value = false
  }
  if (newQuestion.includes('?') || newQuestion.includes('？')) {
    loading.value = true

    await run()  // 必须等待 run() 执行完，才判断 cleaned

    if (!cleaned) {
      answer.value = dataBase.value[Math.floor(Math.random() * dataBase.value.length)]
      console.log(answer.value)

    }

    loading.value = false
  }
})

</script>

<style lang="scss" scoped>
/* 通用样式重置 */
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

.layout {
	padding: 5vw;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background-color: #f5f5f5;
}

/* 主内容区域 */
.main {
	width: 100%;
	max-width: 700px;
	height: auto;
	background-color: #f9f9f9;
	border-radius: 20px;
	box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px 20px;
	position: relative;
}

/* LOGO样式 */
.logo {
	background-color: #000;
	color: #fff;
	padding: 12px 30px;
	border-radius: 12px;
	font-weight: bold;
	font-size: 24px;
	font-family: "Source Han Serif SC", "Noto Serif SC", "Songti SC", serif;
	letter-spacing: 1px;
	text-align: center;
	transition: transform 0.3s ease;
}

.logo:hover {
	transform: scale(1.05);
}

/* 搜索框区域 */
.search-box {
	margin-top: 40px;
	width: 90%;
	max-width: 500px;
	height: 50px;
	background-color: #fff;
	border-radius: 12px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	position: relative;
	transition: box-shadow 0.3s ease;
	
	&:hover {
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
	}

	.input-box {
		width: 100%;
		height: 100%;
		padding: 0 16px;
		font-size: 16px;
		border: 2px solid #ccc;
		border-radius: 12px;
		transition: border-color 0.3s, box-shadow 0.3s;
		
		&:hover {
			border-color: #000;
			box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
		}
		
		
	}


	.kunkun-img {
		position: absolute;
		top: -60px;
		left: 50%;
		transform: translateX(-50%);
		width: 60px;
		height: 60px;
		transition: all 0.3s ease-in-out;
	}
	
	// 为图片添加hover效果
	.kunkun-img:hover {
		transform: translateX(-50%) scale(1.1);
	}
}

.ai-response {
	text-align: center;
	margin-top: 30px;
	font-size: 16px;
	color: #555;
	word-break: break-word;
}

/* 响应式优化 */
@media screen and (max-width: 400px) {
	.logo {
		font-size: 18px;
		padding: 10px 20px;
	}

	.input-box {
		font-size: 14px;
	}
	.kunkun-img {
		width: 50px;
		height: 50px;
		top: -50px;
	}
	.search-box {
		height: 44px;
	}
	.ai-response {
		font-size: 14px;
	}
}

@media screen and (min-width: 1000px) {
	.main {
		max-width: 50vw;
	}
}
</style>

