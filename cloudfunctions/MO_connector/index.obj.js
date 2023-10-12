// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129

'use strict';


// get the client
const mysql = require('serverless-mysql')({
	config: {
		host: 'freetier-01.cn-hangzhou.cluster.aliyun-dev.matrixone.tech',
		user: '4a5a1db5_4a32_4681_ab49_4140d997ea95:admin:accountadmin',
		password: '12341234Mo',
		database: 'motest',
		port: 6001 //MOcloud 默认6001
	}
})
module.exports = {
	_before: function() { // 通用预处理器

		console.log('正在链接MO...............');
		//连接数据库
		try {
			mysql.connect();
			console.log('链接成功！');
		} catch (e) {
			console.log('链接失败：', e);
			return e
		}


	},
	// test link to OBJ
	testOBJ: function() {
		return {
			data: "msg from MO connection！"
		}
	},
	// show tables
	showTables: function() {
		try {
			let results = mysql.query(
				'show tables;'
			)
			console.log("查询记录：", JSON.stringify(results))
			return results
		} catch (e) {
			console.log('查询失败：', e);
			return e
		}

	},
	// insert a record 
	insert: async function() {
		let nameList = ["黎明", "李华", "成龙", "啊杰", "小光", "菜菜", "猩猩", "小袁", "程程", "灿姝", "强生", "宏伟", "启强", "小猪",
			"小虎"
		];
		let countryList = ["Chinese", "USA", "UK", "Japan", "Australia"];
		let genderList = ["male", "female"];

		try {
			let userData = {
				username: nameList[Math.floor(Math.random() * nameList.length)],
				age: Math.floor(Math.random() * 80),
				country: countryList[Math.floor(Math.random() * countryList.length)],
				gender: genderList[Math.floor(Math.random() * genderList.length)],
			};
			let insertRes = await mysql.query('INSERT INTO ?? SET ?', ['users', userData]);
			console.log('插入成功！：', insertRes);
			return userData
		} catch (e) {
			console.log('插入失败：', e.message);
			if (e.message.startsWith("ER_DUP_ENTRY")) {
				return {Error:"重复插入！"}
			} else {
				return e
				
			}
		}


	},

	// delete a record from selest limit 1
	delete: async function() {

		try {

			let getRes = await mysql.query('select  * from  ?? limit 1;', ['users']);
			let delUserName = getRes[0].username;

			let delRes = await mysql.query('Delete from ??   WHERE ?',
				['users', {
					username: delUserName,
				}, ]);
			console.log('删除成功！：', delRes);
			return delUserName
		} catch (e) {
			console.log('删除失败：', e);
			return e
		}
	},

	// update a record
	update: async function() {
		// get the first record

		try {
			let getRes = await mysql.query('select  * from  ?? limit 1;', ['users']);
			console.log('查询成功！：', getRes);

			// update the first record: age+=10
			let oldData = JSON.parse(JSON.stringify(getRes[0]))
			let newAge = oldData.age * 1 + 10 * 1
			// console.log("newage:", newAge)
			// console.log("getRes[0].username:", getRes[0].username)
			try {
				let updateRes = await mysql.query('Update ?? SET ? WHERE ?;',
					['users', {
						age: newAge,
					}, {
						username: getRes[0].username,
					}]);
				console.log('更新成功！：', updateRes);

				//get new data 
				let newData = await mysql.query('select  * from  ?? WHERE ?;', ['users', {
					username: oldData.username
				}]);
				console.log('查询成功！：', newData);

				return {
					oldData: oldData,
					newData: newData
				}
			} catch (e) {
				console.log('更新失败：', e);
				return e
			}

		} catch (e) {
			console.log('查询失败：', e);
			return e
		}


	},

	// get top 10 record
	getAll: async function() {

		try {
			let getRes = await mysql.query('select * from  ?? ;', ['users']);
			console.log('查询成功！：', getRes);
			return getRes
		} catch (e) {
			console.log('查询失败：', e);
			return e
		}
	},




	// return connection;
}