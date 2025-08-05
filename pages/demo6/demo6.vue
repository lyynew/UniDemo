<template>
	<view class="out">
		<view class="box" v-for="(item,index) in newsList" :key="index">
		  <h3 class="title">
			<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
			  <path d="M341.333333 725.333333h298.666667V298.666667H256v426.666666h85.333333z m-170.666666 0V213.333333h554.666666v128h128v384c0 46.933333-38.4 85.333333-85.333333 85.333334H256c-46.933333 0-85.333333-38.4-85.333333-85.333334z m554.666666-298.666666v277.333333c0 12.8 8.533333 21.333333 21.333334 21.333333s21.333333-8.533333 21.333333-21.333333V426.666667h-42.666667zM298.666667 341.333333h298.666666v85.333334H298.666667V341.333333z m0 128h298.666666v85.333334H298.666667v-85.333334z m0 128h213.333333v85.333334H298.666667v-85.333334z" fill="#444444"></path>
			</svg>
			<span>{{ index + 1 }}. {{ item.title }}</span>
		  </h3>
		  <p>{{ item.summary }}</p>
		</view>
	</view>

</template>

<script setup>

const newsList = [
  {
    title: "全球首个商用核聚变发电站在法国正式启动",
    summary: "该发电站由多国联合研发，预计年发电量可达100亿千瓦时，将为清洁能源领域带来革命性突破，有望在2030年前实现商业化运营。"
  },
  {
    title: "人工智能辅助诊断系统获FDA批准，准确率超资深医师",
    summary: "这款AI系统针对肺部CT影像的诊断准确率达到98.7%，可大幅缩短诊断时间，尤其适用于基层医疗机构和医疗资源紧张地区。"
  },
  {
    title: "我国新能源汽车产销量连续8年全球第一，市场占有率突破35%",
    summary: "据工信部数据，今年上半年新能源汽车产量同比增长28.3%，动力电池技术持续领跑全球，充电基础设施覆盖率较去年提升15%。"
  },
  {
    title: "联合国发布最新气候报告，呼吁加速碳中和进程",
    summary: "报告指出，若不采取紧急措施，全球平均气温将在2050年前上升2.7℃，极端天气事件频率将显著增加，需各国加强合作减排。"
  },
  {
    title: "首款量子计算笔记本电脑发布，运算速度提升千倍",
    summary: "该设备由科技巨头与高校联合研发，搭载512量子比特处理器，在密码学、材料科学等领域的运算效率远超传统超级计算机。"
  },
  {
    title: "世界卫生组织宣布：全球已消除疟疾的国家增至40个",
    summary: "通过普及蚊帐、疫苗接种和早期诊断，多个国家实现疟疾零病例，世卫组织计划2030年前在撒哈拉以南非洲实现疟疾发病率下降90%。"
  },
  {
    title: "考古学家在埃及发现距今4300年的完整古墓",
    summary: "墓中出土了黄金面具、彩绘木棺和数千件文物，推测为古王国时期一位高级官员的陵墓，对研究古埃及社会结构具有重要意义。"
  },
  {
    title: "国际足联宣布2030年世界杯将由六大洲16国联合举办",
    summary: "这是世界杯历史上首次跨六大洲举办，旨在纪念世界杯举办100周年，赛事规模将扩大至48支球队，决赛将在乌拉圭举行。"
  },
  {
    title: "全球首条真空管道高铁试验线成功运行，时速超1200公里",
    summary: "该试验线位于中东沙漠地区，采用磁悬浮+真空管道技术，能耗仅为传统高铁的1/3，预计2035年前实现商业化运营。"
  },
  {
    title: "诺贝尔文学奖得主公布，中国作家以乡土题材作品获奖",
    summary: "该作家的作品聚焦中国乡村变迁，以细腻的笔触描绘了城镇化进程中农民的生活与情感，评委称其“为世界文学提供了独特的东方视角”。"
  }
];
</script>

<style lang="scss" scoped>
.out {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  justify-content: center;
  padding: 20rpx;
}

.box {
  width: 500rpx;
  height: 350rpx;
  padding: 20rpx;
  background-color: lightblue;
  border-radius: 15rpx;

  .title {
    display: flex;
    align-items: center;
    gap: 10rpx;
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }

  .icon {
    width: 32rpx;
    height: 32rpx;
    flex-shrink: 0;
  }

  p {
    text-indent: 2em;
    font-size: 26rpx;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

</style>
