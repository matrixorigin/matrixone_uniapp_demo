<template>
	<view class="content">
		<view class="title">基础示例-云对象</view>
		<template>
			<view class="tips">
				<view>Deme:CRUD a table with fixed data</view> 
			</view>
			<view class="btn-list">
				<button type="primary" @click="testOBJ">link to cloudOBJ</button>
				<button type="primary" @click="showTables">show all tables</button>
				<button type="primary" @click="insert">insert a record</button>
				<button type="primary" @click="del">del a record</button>
				<button type="primary" @click="update">update a record(age+10)</button>
				<button type="primary" @click="getAll">getAll records</button>
			</view>
		</template>
	</view>
</template>

<script> 
	const MO = uniCloud.importObject('MatrixOrigin-uniAppdemo');
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			testOBJ() {
				MO.testOBJ().then((res)=>{
					uni.showModal({
						title: 'Test:connection to cloudOBJ',
						content: JSON.stringify(res), 
					})
				}).catch ((e)=>{
					uni.showModal({
						title: 'Test:connection to cloudOBJ',
						content: JSON.stringify("can't connect to cloudOBJ"), 
					})
				}) 
			},
			showTables() {
				MO.showTables().then((res)=>{
					uni.showModal({
						title: 'Test:show all tables',
						content: JSON.stringify(res), 
					})
				}).catch ((e)=>{
					uni.showModal({
						title: 'Test:show all tables',
						content: JSON.stringify("connection failed"), 
					})
				}) 
			},
			// insert
			insert() {
				MO.insert().then((res) => {
					uni.showModal({
						title: 'Test:insert a record',
						content: JSON.stringify(res),
					})
				});
			},
			//del
			del(){
				MO.delete().then((res) => {
					uni.showModal({
						title: 'Test:delete a record',
						content: JSON.stringify(res),
					})
				});
			},
			// update
			update(){
				MO.update().then((res) => {
					uni.showModal({
						title: 'Test:update a record',
						content: JSON.stringify(res),
					})
				});
			},
			// getAll
			getAll() {
				MO.getAll().then((res) => {
					uni.showModal({
						title: 'Test:get all records',
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