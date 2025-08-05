<template>
	<view>
		<view class="box" hover-class="boxHover">
			<view class="inner" hover-class="innerHover" hover-stop-propagation>
				内部元素
			</view>
		</view>
		<viwe>---------</viwe>
		<text selectable>
			text文本标签
		</text>
		<br>
		<viwe>---------</viwe>
		<text>scroll_view</text>
		<br>
		<scroll-view scroll-x="true" class="scrollView" >
			<view class="innerbox">scroll的子元素</view>
			<view class="innerbox">scroll的子元素</view>
			<view class="innerbox">scroll的子元素</view>
			<view class="innerbox">scroll的子元素</view>
			<view class="innerbox">scroll的子元素</view>
			<view class="innerbox">scroll的子元素</view>
			<view class="innerbox">scroll的子元素</view>
			<view class="innerbox">scroll的子元素</view>
			<view class="innerbox">scroll的子元素</view>
			<view class="innerbox">scroll的子元素</view>
			<view class="innerbox">scroll的子元素</view>
			<view class="innerbox">scroll的子元素</view>
		</scroll-view>
		<viwe>---------</viwe>
		<text>swiper</text>
		<br>
		<swiper indicator-dots  autoplay vertical="false" circular indicator-color="#808080">
			<swiper-item>
				<image mode="aspectFill" src="/static/banner/xcj.png"></image>
			</swiper-item>
			<swiper-item>
				<image mode="aspectFill" src="/static/banner/波斯菊.png"></image>
			</swiper-item>
			<swiper-item>
				<image mode="aspectFill" src="/static/banner/ssss.png"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss">
.box{
	
	width: 200px;
	height: 200rpx;
	background-color: aliceblue;
} 
.boxHover{
	background-color: orange;
	width: 500rpx;
	height: 500rpx;
	border-radius: 15rpx;
}
.innerHover{
	background-color: green;
	
}
.scrollView{
	
	border: 1px solid burlywood;
	border-radius: 3px;
	height: 100px;
	white-space: nowrap; //超过宽度不换行
	.innerbox{
		height: 20px;
		background-color: beige;
		border: 1rpx solid burlywood;
		border-radius: 20rpx;
		display: inline-block; //转换为行内元素，横向排列
	}
}
swiper{
	width: 100%;
	height: 200px;
	border: 1rpx solid burlywood;
	swiper-item{
		width: 100%;
		height: 100%;
		background-color: gainsboro;
		image{
			width: 100%;
			height: 100%;
			}
	}
	swiper-item:nth-child(2n){
		background-color: aliceblue;
	}
	
}

</style>
