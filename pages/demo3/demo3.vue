<template>
	<view>
	
	<view>{{ Math.random()}}</view>
	<view>{{num2}}</view>
	<hr />
	<view>
		{{author.name}}
		{{author.books}}
		good?{{publishedBookMessage}}
		<button @click="add()">addvue4</button>
	</view>
	<view class="banner">
		<image :src="picurl" mode=""></image>
	</view>
	<hr />
	
	<view :class='box[0]' >
		属性绑定
	</view>
	
	<view class="box" :style="{width:'300px',height:260+'px',fontSize:size + 'px'}">
		内联样式
	</view>
	</view>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';

const url = reactive(["/static/banner/1.png","/static/banner/2.png","/static/banner/3.png"])
const picurl = ref('/static/banner/1.png')
let num2 = ref(10);
const author = reactive({
	name:'lyy',
	books:[
		'vue1',
		'vue2',
		'vue3'
	]
})

// 样式绑定
const isActive = ref(true)
const box = ref(['box1','box2'])
const size = ref(10)

function add(){
	author.books.push('vue4')
}

const publishedBookMessage = computed(() => {
	return author.books.length > 3? 'yes':'no'
})



// 轮播图
let i = 0
setInterval(()=>{
	
	i++;
	picurl.value = url[i%3];
	const j = box.value[0];
	box.value[0] = box.value[1];
	box.value[1] = j;
	size.value++;
	
},1000)
</script>

<style>
.box1{
	width: 200rpx;
	height: 200rpx;
	background-color: aquamarine;
}
.box2{
	width: 200rpx;
	height: 200rpx;
	background-color: darkolivegreen;
}
	       
</style>
