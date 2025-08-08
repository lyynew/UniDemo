<template>
  <view class="out">
    <view class="box">
      <!-- 标题 -->
      <h3 class="title">
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M341.333333 725.333333h298.666667V298.666667H256v426.666666h85.333333z m-170.666666 0V213.333333h554.666666v128h128v384c0 46.933333-38.4 85.333333-85.333333 85.333334H256c-46.933333 0-85.333333-38.4-85.333333-85.333334z m554.666666-298.666666v277.333333c0 12.8 8.533333 21.333333 21.333334 21.333333s21.333333-8.533333 21.333333-21.333333V426.666667h-42.666667zM298.666667 341.333333h298.666666v85.333334H298.666667V341.333333z m0 128h298.666666v85.333334H298.666667v-85.333334z m0 128h213.333333v85.333334H298.666667v-85.333334z" fill="#444444" />
        </svg>
        <span :style="{ fontSize: titlefont + 'rpx' }">{{ title }}</span>
      </h3>

      <!-- 摘要 -->
      <p :style="{ fontSize: summaryfont + 'rpx' }">{{ summary }}</p>

      <!-- 当前字体大小 -->
      <view class="font-size-display" v-if="showFontSizeTip">
        📐 当前摘要字体大小：<text>{{ summaryfont }}rpx</text>
      </view>
	  <slot></slot>

      <!-- 字体调整按钮 -->
      <view class="btn">
        <button type="default" size="mini" @click="enSmall()">-</button>
        <button type="primary" size="mini" @click="enlarge()">+</button>
		<button type="default" size="default" @click="()=> emit('boom',666)"></button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

defineProps(['title', 'summary'])
defineEmits('boom')

const titlefont = ref(20)
const summaryfont = ref(15)
const showFontSizeTip = ref(false)

function enlarge() {
  if (titlefont.value < 30) {
    titlefont.value += 1
    summaryfont.value += 1
    showFontSizeTip.value = true
    hideTipLater()
  }
}

function enSmall() {
  if (titlefont.value > 18) {
    titlefont.value -= 1
    summaryfont.value -= 1
    showFontSizeTip.value = true
    hideTipLater()
  }
}

function hideTipLater() {
  setTimeout(() => {
    showFontSizeTip.value = false
  }, 2000)
}
</script>

<style lang="scss" scoped>
.out {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20rpx;
}

.box {
  width: 500rpx;
  min-height: 380rpx;
  padding: 20rpx;
  background: linear-gradient(145deg, #e0f7fa, #ffffff);
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  position: relative;
}

.title {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.title span {
  transition: font-size 1s ease;
}

.icon {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
}

p {
  text-indent: 2em;
  line-height: 1.5;
  -webkit-line-clamp: 5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
  margin-bottom: 30rpx;
  transition: font-size 1s ease;
}

.font-size-display {
  font-size: 22rpx;
  color: #666;
  margin-bottom: 70rpx;
  text-align: right;
  z-index: 9999;
}

.btn {
  position: absolute;
  bottom: 20rpx;
  right: 20rpx;
  display: flex;
  gap: 12rpx;
}
</style>
