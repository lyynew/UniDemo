<template>
	<view>
		<h1>demo1</h1>
		<view class="button">
			<button size="mini" type="primary">取消</button>
			<button size="mini" type="warn">删除</button>
			<button size="mini" type="default" plain>镂空按钮</button>
			<button size="default" type="primary" loading>加载中...</button>
		</view>
		<h2>登录账号</h2>
		<view class="input">
			<input type="number" placeholder="输入账号" placeholder-style="color:red"/>
			<input type='text' password placeholder="输入密码" placeholder-style="color:orange"/>
			<input type='tel' maxlength="11"  placeholder="输入手机号" placeholder-style="color:orange"/>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style>
	input{
		width: 80%;
		padding: 10rpx;
		margin: 5rpx;
		border-radius: 5rpx;
		border: 1rpx solid gray;
	}
	       
</style>
