<template>
	<view class="content">
		<view class="title">基础示例-云对象</view>
		<template>
			<view class="tips">
				<view>以下用表users表来示范增删改查</view> 
			</view>
			<view class="btn-list">
				<button type="primary" @click="testOBJ">testOBJ</button>
				<button type="primary" @click="showTables">showTables</button>
				<button type="primary" @click="insert">insert a record</button>
				<button type="primary" @click="del">del a record</button>
				<button type="primary" @click="update">update a record(age+10)</button>
				<button type="primary" @click="getAll">getAll records</button>


			</view>
		</template>

	</view>
</template>

<script> 

	const MO = uniCloud.importObject('MO_connector');
	
	export default {
		data() {
			return {
				// canUse
			}
		},
		methods: {
			testOBJ() {
				MO.testOBJ().then((res)=>{
					uni.showModal({
						title: '链接云对象测试',
						content: JSON.stringify(res), 
					})
				}).catch ((e)=>{
					uni.showModal({
						title: '链接云对象测试',
						content: JSON.stringify("没连上"), 
					})
				}) 
				
			},
			showTables() {
				MO.showTables().then((res)=>{
					uni.showModal({
						title: '展示所有表测试',
						content: JSON.stringify(res), 
					})
				}).catch ((e)=>{
					uni.showModal({
						title: '展示所有表测试',
						content: JSON.stringify("链接失败"), 
					})
				}) 
				
			},
			// insert
			insert() {
				MO.insert().then((res) => {
					uni.showModal({
						title: 'insert记录',
						content: JSON.stringify(res),
					})
				});

			},
			//del
			del(){
				MO.delete().then((res) => {
					uni.showModal({
						title: '已删除的username',
						content: JSON.stringify(res),
					})
				});
			},
			// update
			update(){
				MO.update().then((res) => {
					uni.showModal({
						title: 'update记录',
						content: JSON.stringify(res),
					})
				});
			
			},
			// getAll
			getAll() {
				MO.getAll().then((res) => {
					uni.showModal({
						title: 'getAll记录',
						content: JSON.stringify(res),
					})
				});
			
			},


		}
	}
</script>

<style>
	view {
		display: flex;
		flex-direction: column;
	}

	.content {
		padding-bottom: 30px;
	}

	.title {
		font-weight: bold;
		align-items: center;
		padding: 20px 0px;
		font-size: 20px;
	}

	.tips {
		color: #999999;
		font-size: 14px;
		padding: 20px 30px;
	}

	.btn-list {
		padding: 0px 30px;
	}

	.btn-list button {
		margin-bottom: 20px;
	}

	.upload-preview {
		width: 100%;
	}

	#tip {
		width: 750rpx;
		align-items: center;
	}

	button {
		width: 100%;
	}
</style>