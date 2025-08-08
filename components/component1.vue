<template>
	<view class="box">
		<h1>这是组件1</h1>
		<slot></slot>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss">
.box{
	width: 200rpx;
	height: 200rpx;
	background-color: darkolivegreen;
	border-radius: 15rpx;
}

</style>