<template>
	<view class="layout">
		<button  
			type="default"
			size="mini"
			v-for="(_,tab) in tabs"
			:key="tab"
			@click="currentTab = tab"
		>{{tab}}</button>
		<view class="com">
			<keep-alive>  
				<component :is="tabs[currentTab]"></component>
			</keep-alive>
		</view>
	</view>
</template>

<script setup>
import component1 from '../../components/component1.vue';
import component2 from '../../components/component2.vue';
import { ref } from 'vue';

const currentTab = ref(0)

const tabs = [
	component1,
	component2
]

</script>

<style lang="scss" scoped>
.layout{
	background-color: silver;
	border-radius: 15rpx;
}
</style>
