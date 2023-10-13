# MatrixOne Serverless数据库开发微信小程序示例


本教程教你如何使用UniApp的[云对象](https://uniapp.dcloud.net.cn/uniCloud/cloud-obj)连接MatrixOne数据库，并且给出了一个完整的微信小程序开发示例。本示例使用了node.js的[serverless-mysql](https://github.com/jeremydaly/serverless-mysql)连接库，并根据MatrixOne的特点做了一定调整。

## 什么是MatrixOne？

[MatrixOne](https://www.matrixorigin.cn/)是一款云原生HTAP数据库，可以完整支持业务开发和数据分析，并且高度兼容MySQL8.0，[MatrixOneCloud](https://www.matrixorigin.cn/moc)是MatrixOne的云上版本，目前已上线Serverless版本，免安装，免运维，按使用量计费，自动扩缩容。[注册MatrixOne Cloud](https://test.aliyun-dev.matrixone.tech/trial)后3秒创建实例，立刻可使用，并且所有用户都有免费额度，欢迎来薅羊毛！

## 详细教程

### 准备工作

#### 1.下载开发工具：HBuilderX(3.8.7及以上)、微信开发者工具(stable 1.06.2307250及以上)

#### 2.申请unicloud云对象空间并将账号与HBuilderX绑定

1. 注册Dcloud账号，点击[开发者中心](https://dev.dcloud.net.cn/pages/common/register?redirect_uri=https%3A%2F%2Funicloud.dcloud.net.cn)注册Dcloud账号。

2. 登录Dcloud进入[uniCloud控制台](https://unicloud.dcloud.net.cn/)，点击创建新的服务空间，首先完成实名认证。![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_787140_5ZLuijP3l_AfI1Lm_1697103973?w=3840&h=1846)

3. 实名认证之后重新进入[uniCloud控制台](https://unicloud.dcloud.net.cn/)，点击创建新的服务空间。![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_811049_KP11Um7W1OrHOwy0_1697103973?w=3840&h=1846)

4. 此处使用阿里云的免费套餐进行演示：点击阿里云，选择免费套餐，填写服务空间名称，点击构建。![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_873199_9ys5oNmhRhfZVqgl_1697103973?w=3840&h=2160)

5. 等待空间创建完毕，进入HBuilderX登录dcloud账户即可。![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_893679_2NILKoTRGwomxrQI_1697103973?w=3840&h=2060)

#### 3. 注册MatrixOnecloud账号并获得mysql连接串

1. 目前MatrixOnecloud已经开启公测，点击MatrixOnecloud注册账号。

2. 登录账号进入MOcloud数据库管理平台，点击右上角创建实例。![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_781762__f1RhI_H5UsctEib_1697103973?w=3840&h=1846)![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_867244_hcex2slqP5skuAHR_1697103973?w=3840&h=2160)

3. 点击刚创建的实例进入管理平台。![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_827887_1DTrnEJAGblAjWmq_1697103973?w=3840&h=1846)

4. 点击connect->点击connect with 3rd tool。![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_848295_Etydv7Bt7RsQqGF8_1697103973?w=3840&h=1846)

5. 得到**mysql命令连接串** ，这个后面要用。![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_33839_AbKfJYVDIifB2c6l_1697103974?w=3840&h=1846)

6. 测试用途我们可以先创建一个test数据库，直接使用connect to Platform![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_783859_IeUeBNgnIDjds7qV_1697103973?w=3840&h=1846)

7. 用户名是admin，密码就是刚刚设置的数据库密码，填写之后登录，进入之后按照图片引导分别执行执行2个sql创建一个示例数据库。代码如下：

	```
	CREATE DATABASE test;
	```

	```
	use test;
	CREATE TABLE test.users (
	username varchar(100) NULL,
	age DECIMAL NULL,
	country varchar(100) NULL,
	gender varchar(100) NULL
	);
	```
	![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_228295_h_KpFcFiLb-TKOwW_1697104120?w=3840&h=1846&type=image/png)



### 小程序端

前端页面是由unicloud官方的demo项目改造，仅包含一个页面，在此用于测试。

#### 1. 创建demo项目

现在我们在HBuilderX里从头创建一个页面，打开HBuilderX，依次点击文件->新建->项目。

![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_701113_4AnRx4kqQvYx4aTg_1697104159?w=3840&h=1802)在创建项目的页面里按照引导创建项目。

![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_731276_IM5-D0dUoZcvsqtY_1697104159?w=2336&h=1940)

#### 2. 运行demo并开发

现在我们可以用HBuilderX的运行功能，把现在的页面运行到微信开发者工具上去，看看实际的页面。

![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_800905_G5F4XonyVG04Y0MM_1697104159?w=2897&h=1460)稍等一会，等待微信开发者工具弹出即可，最简单的demo就成功运行了，此后每次改动HBuilderX的内容，前端内容会自动同步到微信开发者工具。

![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_764222_I0C90N7zT3aUT5Wa_1697104159?w=2500&h=2000)

#### 3. 修改页面

回到HBuilderX，打开pages/index/index.vue，删除原有代码，用以下的vue代码替代。

```vue
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
```

保存代码，前端代码会同步到微信开发者工具中，页面如下：

![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_531249_bgJ6B0VpkeqVBpVy_1697104180?w=2500&h=2000)

可以发现有部分Error，这是意料之中的，因为我们没有云函数，现在也不能正常运行，再处理完云函数端之后就可以正常运行。



### 云函数端(后端)

#### 1. 关联云服务空间

回到HBuilderX中，根据下图引导关联云服务空间。

![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_712232_VyuGzmJwvOZwmwjv_1697104269?w=2611&h=2070)

在引导框中关联自己的云服务空间即可。



![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_674470_IHe9wRKNlwsHYsZh_1697104269?w=1100&h=800)关联

上之后，uniCloud文件夹上会显示云服务空间，打开uniCloud文件夹，文件夹cloudfunctions就是放置云函数和云对象的文件夹。



#### 2. 导入插件并修改

在此还需要修改一下MatrixOneCloud的数据库的连接串，在cloudfunctions/MatrixOrigin-uniAppdemo/index.obj.js的第5~第9行，根据刚刚获得的MatrixOneCloud的mysql连接串，修改对应的host，user，password，database即可。

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_192986_bI0eUJgTcqkNFFZS_1697107006?w=1702&h=474&type=image/png)

再回到刚刚的前端页面，修改一下前端pages/index/index.vue 中云对象调用的实际名称：

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_18202_T7f4X6EokAoDVsK__1697106914?w=2663&h=1217&type=image/png)

#### 3. 试运行

首先将云对象上传到云空间中。

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_794323_5kBDfKIspUFrZgU6_1697107081?w=1139&h=921&type=image/png)

上传成功后，需要重新打开微信开发者工具，先停止，再打开。



![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_608781_HyXFpDTD6lZzZjX5_1697104269?w=2208&h=1231)

打开之后回到HBuilderX，将小程序连接的云函数切换到本地，先测试，这样云函数的报错信息可以显示在本地。



![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_662144_GYno1t1bdQhV-AVa_1697104269?w=3840&h=1147)

打开微信开发者工具之后，我们可以尝试点击第一个按钮“testOBJ”，看是否可以连接上云对象。



![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_749717_BZN_46adZ61nM5Hs_1697104269?w=2500&h=2000)

有问题的话可以看看unicloud的控制台的报错信息。



![img](https://wdcdn.qpic.cn/MTMxMDI3MDI1NjA5MjE5NTc_827687_LC8bpEhGRu8bjaYg_1697104269?w=3244&h=2014)

依次点击前端的各个按钮，测试数据库，如果有问题的话可以在此查看并解决。

没有问题的话就可以切换到“连接云端云函数”试试看，没有问题的话这个测试的小demo就测试完成了。

开发者可以根据自己的需求改变自己的前端代码和云对象代码来完成开发。
