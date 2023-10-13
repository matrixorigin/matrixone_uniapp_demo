'use strict';
// get the MatrixOne connection
const mysql = require('serverless-mysql')({
	config: {
		host: 'hostname',
		user: 'username',
		password: 'password',
		database: 'test',
		port: 6001 //default 6001
	}
})

module.exports = {
	_before: function () { // preprocessor
		console.log('connecting MO...............');
		//connect to MO
		try {
			mysql.connect();
			console.log('connection succeeded!');
		} catch (e) {
			console.log('connection failed:', e);
			return e
		}
	},

	// test link to OBJ
	testOBJ: function () {
		return {
			data: "connected to CloudObject"
		}
	},

	// show tables
	showTables: function () {
		try {
			let results = mysql.query(
				'show tables;'
			)
			console.log("succeeded:", JSON.stringify(results))
			return results
		} catch (e) {
			console.log('fail:', e);
			return e
		}
	},

	// insert a record 
	insert: async function () {
		let nameList = ["Liming", "Hua", "Jack Chen", "JieJie", "Light", "CaiCai", "Star", "Keke", "Bob", "Jenny", "Mike", "Robert", "Armstrong", "Piggy",
			"Ruler"
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
			console.log('succeeded:', insertRes);
			return userData
		} catch (e) {
			console.log('fail:', e.message);
			if (e.message.startsWith("ER_DUP_ENTRY")) {
				return {
					Error: "Err:try to insert a record already exist"
				}
			} else {
				return e
			}
		}
	},

	// delete a record from selest limit 1
	delete: async function () {
		try {
			let getRes = await mysql.query('select  * from  ?? limit 1;', ['users']);
			let delUserName = getRes[0].username;
			let delRes = await mysql.query('Delete from ??   WHERE ?',
				['users', {
					username: delUserName,
				},]);
			console.log('succeeded:', delRes);
			return delUserName
		} catch (e) {
			console.log('fail:', e);
			return e
		}
	},

	// update a record
	update: async function () {
		// get the first record
		try {
			let getRes = await mysql.query('select  * from  ?? limit 1;', ['users']);
			console.log('succeeded:', getRes);
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
				console.log('succeeded:', updateRes);

				//get new data 
				let newData = await mysql.query('select  * from  ?? WHERE ?;', ['users', {
					username: oldData.username
				}]);
				console.log('succeeded：', newData);

				return {
					oldData: oldData,
					newData: newData
				}
			} catch (e) {
				console.log('failed:', e);
				return e
			}
		} catch (e) {
			console.log('failed:', e);
			return e
		}
	},

	// get all records
	getAll: async function () {
		try {
			let getRes = await mysql.query('select * from  ?? ;', ['users']);
			console.log('succeeded:', getRes);
			return getRes
		} catch (e) {
			console.log('failed:', e);
			return e
		}
	},
}