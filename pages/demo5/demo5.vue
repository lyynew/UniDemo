<template> 
  <view class="container">
    <view v-if="blood <= 0">
      打败了
    </view>
    <view v-else>
      血量：{{ blood }}
    </view>

    <!-- 浮动提示 -->
	<view class="float" v-if="showFloat" :style="{ color: floatHp > 0 ? '#2ecc71' : '#e74c3c' }">
	  {{ floatHp > 0 ? `+${floatHp}` : floatHp }}
	</view>

    <!-- 操作按钮 -->
    <button type="primary" size="mini" @click="todo(1)">加血</button>
    <button type="warn" size="mini" @click="todo(-1)">攻击</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const blood = ref(10);            // 当前血量
const floatHp = ref(0);           // 浮动显示的加/减值
const showFloat = ref(false);     // 是否显示浮动提示

function todo(hp) {
  blood.value += hp;
  floatHp.value = hp;
  showFloat.value = true;

  // 一秒后隐藏浮动提示
  setTimeout(() => {
    showFloat.value = false;
  }, 1000);
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  padding: 30px;
  text-align: center;
}

.float {
  position: absolute;
  top: 50px;
  left: 50%;

  font-size: 24px;
  transform: translateX(-50%);
  animation: floatUp 1s ease-out;
  z-index: 999;
}

@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-40px);
  }
}
</style>
