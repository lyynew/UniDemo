<template>
	<view class="box" @click="onClick" :style="{backgroundColor:color}">
		点我：{{num}}
	</view>
	<switch checked @change="changeStatus()"/>
		<button type="primary" :loading=status[0]>{{status[1]}}</button>
</template>

<script setup>
import { ref } from 'vue';

const num = ref(0);
const color = ref('')
const status = ref([true,'加载中'])

function changeStatus(){
	status.value[0] = !status.value[0];
	status.value[1] = status.value[1]=='加载中' ? '完成' : '加载中';
}

function onClick(){
	num.value++
	color.value = '#' + String(Math.random()).substring(3,9)
	
}
</script>

<style>
.box{
	background-color: chocolate;
	text-align: center;
	line-height: 200rpx;
	width: 200rpx;
	height: 200rpx;
}       
</style>
