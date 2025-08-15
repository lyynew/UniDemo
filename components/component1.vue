<template>
	<view class="box1">
		<h1>这是组件1</h1>
		<slot></slot>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss">
.box1{
	width: 200rpx;
	height: 200rpx;
	background-color: darkolivegreen;
	border-radius: 15rpx;
}

</style>