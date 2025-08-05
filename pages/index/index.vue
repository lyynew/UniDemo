<template>
  <view class="layout">
    <!-- 顶部导航栏 -->
    <view class="nav">
      <scroll-view class="nav-scroll" scroll-x="true" show-scrollbar="false">
        <view class="nav-item" hover-class="nav-item-hover">首页</view>
		<view class="nav-item" hover-class="nav-item-hover">
			<navigator url="/pages/Search/Search">坤搜</navigator>
		</view>
        <view class="nav-item" hover-class="nav-item-hover">
          <navigator url="/pages/demo1/demo1">Demo1</navigator>
        </view>
        <view class="nav-item" hover-class="nav-item-hover">
			<navigator url="/pages/demo2/demo2">Demo2</navigator>
		</view>
        <view class="nav-item" hover-class="nav-item-hover">
			<navigator url="/pages/demo3/demo3">Demo3</navigator>
		</view>
		<view class="nav-item" hover-class="nav-item-hover">
			<navigator url="/pages/demo4/demo4">Demo4</navigator>
		</view>
		<view class="nav-item" hover-class="nav-item-hover">
			<navigator url="/pages/demo5/demo5">Demo5</navigator>
		</view>
		<view class="nav-item" hover-class="nav-item-hover">
			<navigator url="/pages/demo6/demo6">Demo6</navigator>
		</view>
      </scroll-view>
    </view>

    <!-- 每日一句 -->
	<view class="daily-sentence">
	  <scroll-view scroll-x class="sentence-scroll" show-scrollbar="false">
		<text class="sentence-text" @click="getDailySentence">{{ sentence }}</text>
	  </scroll-view>
	</view>


    <!-- 图片轮播图 -->
    <swiper class="banner" indicator-dots autoplay circular>
      <swiper-item v-for="(item, index) in banners" :key="index" class="banner-item">
        <image :src="item" mode="aspectFill" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sentence = ref('正在加载中...')
const banners = ref([
  '/static/banner/1.png',
  '/static/banner/2.png',
  '/static/banner/3.png'
])

// 把 uni.request 包成 Promise
function requestPromise(options) {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(new Error('接口返回错误，状态码：' + res.statusCode))
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

async function getDailySentence() {
  try {
    const data = await requestPromise({
      url: 'https://zj.v.api.aa1.cn/api/wenan-zl/',
      method: 'GET',
      data: { type: 'json' }
    })
    sentence.value = data.msg || '获取失败'
  } catch (error) {
    sentence.value = '获取失败，请稍后再试🥚'
    console.error('请求出错:', error)
  }
}

onMounted(() => {
  getDailySentence()
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;

  .nav {
    width: 100%;
    background-color: #f5f5f5;

    .nav-scroll {
      white-space: nowrap;
      display: flex;
      padding: 10rpx;

      .nav-item {
        display: inline-block;
        padding: 12rpx 24rpx;
        margin-right: 16rpx;
        background-color: #ffffff;
        border-radius: 10rpx;
        border: 1rpx solid #e0e0e0;
        font-size: 28rpx;
        color: #333;
      }

      .nav-item-hover {
        background-color: #eeeeee;
      }
    }
  }

  .daily-sentence {
    height: 80rpx;
    background-color: #eeeeee;
    display: flex;
    align-items: center;
    padding: 0 20rpx;
  
    .sentence-scroll {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }
  
    .sentence-text {
      display: inline-block;
      font-size: 30rpx;
      color: #444;
      white-space: nowrap;
    }
  }

  .banner {
    width: 100%;
    height: 400rpx;

    .banner-item {
      width: 100%;
      height: 100%;

      image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8rpx;
      }
    }
  }
}
</style>
