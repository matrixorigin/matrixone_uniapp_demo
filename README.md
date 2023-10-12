# 云对象链接 MySQL/MatrixOne 数据库示例

本教程使用[云对象](https://uniapp.dcloud.net.cn/uniCloud/cloud-obj)链接Mysql/MatrixOne数据库，主要是使用node.js包[Serverless MySQL](https://github.com/jeremydaly/serverless-mysql)进行链接，本教程包含了一个测试demo的使用教程。

本教程使用MatrixOne数据库进行演示，所有用户都有一定的免费额度，同时本教程也适用于Mysql。

## 什么是MatixOne？

简单但不完全准确的来说，[MatrixOne](https://www.matrixorigin.cn)是一款加强型的Mysql，支持几乎所有常用的Mysql语法，而[MatrixOneCloud](https://www.matrixorigin.cn/moc)是MatrixOne的云上版本（即对应到加强型的云Mysql），免安装，免运维，[注册账号](https://test.aliyun-dev.matrixone.tech/trial)后3秒创建实例，立刻可使用，所有用户都有免费额度，欢迎来薅羊毛！



## 简单教程

**云函数端**

直接从插件市场导入本项目。

**小程序端**

小程序端的测试页面只有1页，新建“默认项目”，将pages/index/index.vue的内容改为以下：

```vue
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
	
	const MO = uniCloud.importObject('MO_Obj');
	
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
```



注意修改







## 详细教程

### 准备工作

#### 1.下载开发工具：HBuilderX(3.8.7及以上)、微信开发者工具(stable 1.06.2307250及以上)

#### 2.申请unicloud云对象空间并将账号与HBuilderX绑定

1. 注册Dcloud账号，点击[Dcloud开发者中心](https://dev.dcloud.net.cn/pages/common/register?redirect_uri=https%3A%2F%2Funicloud.dcloud.net.cn)注册Dcloud账号。

2. 登录Dcloud进入[Dcloud服务空间](https://unicloud.dcloud.net.cn/)，点击创建新的服务空间，首先完成实名认证。	![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_598963_vglt58swZclY3DGE_1692267679?w=3840&h=1846&type=image/png)

3. 实名认证之后重新进入[Dcloud服务空间](https://unicloud.dcloud.net.cn/)，点击创建新的服务空间。![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_876750_9jEXXm5N5rtsZm2q_1692267157?w=3840&h=1846&type=image/png)

4. 点击阿里云，选择免费套餐，填写服务空间名称，点击构建。![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_818158_dP2N-hMdWMaiveLT_1692267916?w=3840&h=2160&type=image/png)

5. 等待空间创建完毕，进入HBuilderX登录dcloud账户即可。![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_833598_yH8SfnkWm-9VAZS8_1692268243?w=3840&h=2060&type=image/png)



#### 3. 申请MOcloud账号创建实例并获得mysql连接串

1. 目前MOcloud需要申请使用，点击[MOcloud试用申请](https://test.aliyun-dev.matrixone.tech/trial)填写信息，申请试用。
2. 获得**试用资格**，登录账号进入MOcloud数据库管理平台，点击右上角创建实例。![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_690713_WgXXUZ3jyRzvEhVI_1692266388?w=3840&h=1846&type=image/png)![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_545757_6IT3PgrmuYQIuYHh_1692266396?w=3840&h=2160&type=image/png)

3. 点击刚创建的实例进入管理平台。![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_183323_D3ypFfBrJGtq5nxk_1692266415?w=3840&h=1846&type=image/png)

4. 点击connect->点击connect with 3rd tool。![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_682583_NSQ3mrHmmAuPNPT2_1692266419?w=3840&h=1846&type=image/png)

5. 得到**mysql命令连接串** ，这个后面要用。![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_158855_oH8dPGZIOs2sGDJJ_1692266423?w=3840&h=1846&type=image/png)

6. 测试用途我们可以先创建一个test数据库，直接使用connect to Platform![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_986965_UXF8qME-yw-6h6tB_1692413901?w=3840&h=1846&type=image/png)



7. 用户名是admin，密码就是刚刚设置的数据库密码，填写之后登录，进入之后按照图片引导执行一个sql创建一个示例数据库。代码如下：
	```mysql
	CREATE DATABASE motest;
	use motest;
	CREATE TABLE motest.users (
	username varchar(100) NULL,
	age DECIMAL NULL,
	country varchar(100) NULL,
	gender varchar(100) NULL
	);
	```
	![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_932934_JxJS3JIvxLGDgoMZ_1692414157?w=3840&h=1846&type=image/png)






### 小程序端

前端页面拆自unicloud官方的开源项目，也是unicloud官方demo，仅包含一个页面。

#### 1. 创建demo项目

现在我们在HBuilderX里从头创建一个页面，打开HBuilderX，依次点击文件->新建->项目。

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_140363_Eze4tRHFDtmHUtWA_1692337601?w=3840&h=1802&type=image/png)

在创建项目的页面里按照引导创建项目。

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_762160_xCHQ--900tBnk0rJ_1692338566?w=2336&h=1940&type=image/png)

创建后的文件结构是这样的：

​                ● uniCloud：云函数（后端）的主要文件目录，在后端教程中详述，在此不过多赘述。

​                ● pages：前端页面内容，目前只有一个index.vue文件

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_870347_-1RGYlgSeFoHjixv_1692339081?w=720&h=739&type=image/png)



#### 2. 运行demo并开发

现在我们可以用HBuilderX的运行功能，把现在的页面运行到微信开发者工具上去，看看实际的页面。

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_198464_GPw1W-1U7KQtjRvT_1692339435?w=2897&h=1460&type=image/png)

稍等一会，等待微信开发者工具弹出即可，最简单的demo就成功运行了，此后每次改动HBuilderX的内容，前端内容会自动同步到微信开发者工具。

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_988737_OZLe-8iLCn3GZsx4_1692339659?w=2500&h=2000&type=image/png)



#### 3. 修改页面

回到HBuilderX，打开pages/index/index.vue，删除原有代码，用以下的vue代码替代。

```vue
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
	
	const MO = uniCloud.importObject('MO_Obj');
	
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
```







保存代码，前端代码会同步到微信开发者工具中，页面如下：

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_300961_cG_Syoo7h0ynknSG_1692340036?w=2500&h=2000&type=image/png)

可以发现有部分Error，这是意料之中的，因为我们没有云函数，现在也不能正常运行，再处理完云函数端之后就可以正常运行。





### 云函数端(后端)



#### 1. 关联云服务空间

回到HBuilderX中，根据下图引导关联云服务空间。

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_207275_byS7zlTHJve8HvY9_1692340255?w=2611&h=2070&type=image/png)

在引导框中关联自己的云服务空间即可。

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_756274_xhX8IxSbirubDA1p_1692342182?w=1100&h=800&type=image/png)

关联上之后，uniCloud文件夹上会显示云服务空间，打开uniCloud文件夹，有两个文件夹

​                ● cloudfunctions：放置云函数和云对象的文件夹

​                ● database：json数据库，这块我们不用



#### 2. 导入本插件

在这里我的云对象名称是MO_connector，下面以此为例。

再回到刚刚的前端页面，修改一下前端pages/index/index.vue 中云对象调用的实际名称，需要修改的代码在25行：

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_939388_8TeiD7nNmrKgQxNI_1692345549?w=2382&h=854&type=image/png)

// 
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129




#### 3. 试运行

首先将MO_connector云对象上传到云空间中。

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_577474_jfWc1aeVIKhudDuS_1692345837?w=1439&h=866&type=image/png)

上传成功后，需要重新打开微信开发者工具，先停止，再打开。

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_872968_qK_Pl5KfIP3D19uZ_1692345909?w=2208&h=1231&type=image/png)

打开之后回到HBuilderX，将小程序连接的云函数切换到本地，先测试，这样云函数的报错信息可以显示在本地。

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_402681_9vzQrkZoEId5vyyl_1692347573?w=3840&h=1147&type=image/png)



打开微信开发者工具之后，我们可以尝试点击第一个按钮“testOBJ”，看是否可以连接上云对象

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_640350_vHto_c3HDgUclSfF_1692347393?w=2500&h=2000&type=image/png)

有问题的话可以看看unicloud的控制台的报错信息

![img](https://wdcdn.qpic.cn/MTY4ODg1NDY5NjUzNDY0OQ_535471_onk4usKHED86KhGU_1692347484?w=3244&h=2014&type=image/png)

依次点击下面的按钮，测试数据库，如果有问题的话可以在此查看并解决。

没有问题的话就可以切换到“连接云端云函数”试试看，没有问题的话这个测试的小demo就测试完成了。

开发者可以根据自己的需求改变自己的前端代码和云对象代码来完成开发。







