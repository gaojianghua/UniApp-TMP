class SQLite {
	// 监听数据是否打开
	static isOpenDB(name, path = "") {
		let dbName = name;
		let dbPath = path || `_doc/${name}.db`;
		//数据库打开了就返回true,否则返回false
		let isopen = plus.sqlite.isOpenDatabase({
			name: dbName,
			path: dbPath
		})
		return isopen
	}
	// 创建数据库/打开数据库
	static openDB(name, path = "") {
		return new Promise((resolve, reject) => {
			plus.sqlite.openDatabase({
				name: name || 'test',
				path: path || `_doc/${name}.db`,
				success: async (res) => {
					let a = await this.closeDB(name)
					resolve('success!')
				},
				fail: async (e) => {
					let a = await this.closeDB(name)
					console.log(e)
					reject(e);
				}
			});
		})
	}

	// 查询所有数据库表名
	static queryDBTable(name, path = "") {
		return new Promise((resolve, reject) => {
			let isOpen = this.isOpenDB(name)
			if (isOpen) {
				plus.sqlite.selectSql({
					name: name,
					sql: "select * FROM sqlite_master where type='table'",
					success: async (e) => {
						let a = await this.closeDB(name)
						resolve(e);
					},
					fail: async (e) => {
						let a = await this.closeDB(name)
						console.log(e)
						reject(e);
					}
				})
			} else {
				plus.sqlite.openDatabase({
					name: name || 'test',
					path: path || `_doc/${name}.db`,
					success: async (res) => {
						plus.sqlite.selectSql({
							name: name,
							sql: "select * FROM sqlite_master where type='table'",
							success: async (res) => {
								let a = await this.closeDB(name)
								resolve(res);
							},
							fail: async (e) => {
								let a = await this.closeDB(name)
								console.log(e)
								reject(e);
							}
						})
					},
					fail: async (e) => {
						let a = await this.closeDB(name)
						console.log(e)
						reject(e);
					}
				});
			}
		})
	}

	/**
	 * 创建表
	 * data={dbname,tablename,describe}
	 */
	static createTable(data) {
		// 注意：tabName不能用数字作为表格名的开头
		return new Promise((resolve, reject) => {
			if (data.dbname && data.tablename && data.describe) {
				let {
					dbname,
					tablename,
					describe
				} = data
				let isOpen = this.isOpenDB(dbname)
				if (isOpen) {
					plus.sqlite.executeSql({
						name: dbname,
						// sql: 'create table if not exists dataList("list" INTEGER PRIMARY KEY AUTOINCREMENT,"id" TEXT,"name" TEXT,"gender" TEXT,"avatar" TEXT)',
						sql: `create table if not exists ${tablename}(${describe})`,
						success: async (e) => {
							let a = await this.closeDB(dbname)
							resolve(`创建表${tablename}完成`);
						},
						fail: async (e) => {
							let a = await this.closeDB(dbname)
							reject(e);
						}
					})
				} else {
					plus.sqlite.openDatabase({
						name: dbname,
						path: data.path || `_doc/${dbname}.db`,
						success: (res) => {
							plus.sqlite.executeSql({
								name: dbname,
								// sql: 'create table if not exists dataList("list" INTEGER PRIMARY KEY AUTOINCREMENT,"id" TEXT,"name" TEXT,"gender" TEXT,"avatar" TEXT)',
								sql: `create table if not exists ${tablename}(${JSON.parse(describe) })`,
								success: async (e) => {
									let a = await this.closeDB(dbname)
									resolve(`创建表${tablename}完成`);
								},
								fail: async (e) => {
									let a = await this.closeDB(dbname)
									reject(e);
								}
							})
						},
						fail: async (e) => {
							let a = await this.closeDB(dbname)
							reject('打开数据库失败： ' + JSON.stringify(e))
						}
					});
				}
			} else {
				reject("参数不满足条件")
			}
		})
	}

	// 查询表是否存在
	static isTable(name, tabName, path = "") {
		return new Promise((resolve, reject) => {
			let isOpen = this.isOpenDB(name)
			if (isOpen) {
				plus.sqlite.selectSql({
					name: name,
					sql: `select count(*) as isTable FROM sqlite_master where type='table' and name='${tabName}'`,
					success: async (e) => {
						let a = await this.closeDB(name)
						resolve(e[0].isTable ? true : false);
					},
					fail: async (e) => {
						let a = await this.closeDB(name)
						reject(e);
					}
				})
			} else {
				plus.sqlite.openDatabase({
					name: name,
					path: path || `_doc/${name}.db`,
					success: (res) => {
						plus.sqlite.selectSql({
							name: name,
							sql: `select count(*) as isTable FROM sqlite_master where type='table' and name='${tabName}'`,
							success: async (e) => {
								let a = await this.closeDB(name)
								resolve(e[0].isTable ? true : false);
							},
							fail: async (e) => {
								let a = await this.closeDB(name)
								reject(e);

							}
						})
					},
					fail: async function(e) {
						let a = await this.closeDB(name)
						reject('failed: ' + JSON.stringify(e))

					}
				});
			}

		})
	}

	/**
	 * 添加数据
	 * @param {String} name
	 * @param {String} tabName
	 * @param {Object} obj
	 */
	static addSaveData(name, tabName, obj, path = "") {
		return new Promise((resolve, reject) => {
			if (obj) {
				let keys = Object.keys(obj)
				let keyStr = keys.toString()
				let valStr = ''
				keys.forEach((item, index) => {
					if (keys.length - 1 == index) {
						valStr += ('"' + obj[item] + '"')
					} else {
						valStr += ('"' + obj[item] + '",')
					}
				})
				// console.log(valStr)
				let sqlStr = `insert into ${tabName}(${keyStr}) values(${valStr})`
				console.log(sqlStr)
				let isOpen = this.isOpenDB(name)
				if (isOpen) {
					plus.sqlite.executeSql({
						name: name,
						sql: sqlStr,
						success: async (e) => {
							let a = await this.closeDB(name)
							resolve(e);
						},
						fail: async (e) => {
							let a = await this.closeDB(name)
							reject(e);
						}
					})
				} else {
					console.log(path)
					plus.sqlite.openDatabase({
						name: name,
						path: path || `_doc/${name}.db`,
						success: (res) => {
							plus.sqlite.executeSql({
								name: name,
								sql: sqlStr,
								success: async (e) => {
									let a = await this.closeDB(name)
									resolve(e);
								},
								fail: async (e) => {
									let a = await this.closeDB(name)
									reject(e);
								}
							})

						},
						fail: async (e) => {
							let a = await this.closeDB(name)
							reject('failed: ' + JSON.stringify(e))
						}
					});
				}


			} else {
				reject("错误")
			}
		})
	}

	/**
	 * 简单查询，selectSql为复杂查询
	 * @param {String} name
	 * @param {String} tabName
	 * @param {Object} setData 
	 * @param {String} byName 排序值
	 * @param {String} byType 正序倒序
	 */
	static selectDataList(name, tabName, setData, byName, byType, path = "") {
		let setStr = ''
		let sql = ''
		if (JSON.stringify(setData) !== '{}') {
			let dataKeys = Object.keys(setData)
			dataKeys.forEach((item, index) => {
				console.log(setData[item])
				setStr += (
					`${item}=${JSON.stringify(setData[item])}${dataKeys.length - 1 !== index ? " and " : ""}`
				)
			})
			sql = `select * from ${tabName} where ${setStr}`
		} else {
			sql = `select * from ${tabName}`
		}
		if (byName && byType) {
			// desc asc
			sql += ` order by ${byName} ${byType}`
		}
		console.log(sql)

		return new Promise((resolve, reject) => {
			if (tabName !== undefined) {
				let isOpen = this.isOpenDB(name)
				if (isOpen) {
					plus.sqlite.selectSql({
						name: name,
						sql: sql,
						success: async (e) => {
							let a = await this.closeDB(name)
							resolve(e);
						},
						fail: async (e) => {
							let a = await this.closeDB(name)
							reject(e);
						}
					})
				} else {
					plus.sqlite.openDatabase({
						name: name || 'test',
						path: path || `_doc/${name}.db`,
						success: (res) => {
							plus.sqlite.selectSql({
								name: name,
								sql: sql,
								success: async (e) => {
									let a = await this.closeDB(name)
									resolve(e);
								},
								fail: async (e) => {
									let a = await this.closeDB(name)
									console.log(e)
									reject(e);

								}
							})

						},
						fail: async (e) => {
							let a = await this.closeDB(name)
							console.log(e)
							reject(e);
						}
					});

				}

			} else {
				reject("错误")
			}
		});

	}

	// 获取数据库分页数据
	/**
	 * 
	 * @param {*} name 
	 * @param {*} tabName 
	 * @param {*} num 页码
	 * @param {*} size 页面大小返回条数
	 * @param {*} byName 排序主键字段
	 * @param {*} byType 排序类型 desc倒序 / asc正序
	 */
	static async queryDataList(name, tabName, num, size, byName, byType, path = "") {
		let count = 0
		let sql = ''
		let numindex = 0
		await this.queryCount(name, tabName).then((resNum) => {
			count = Math.ceil(resNum[0].num / size)
		})
		if (((num - 1) * size) == 0) {
			numindex = 0
		} else {
			numindex = ((num - 1) * size) + 1
		}
		sql = `select * from ${tabName}`
		if (byName && byType) {
			// desc asc
			sql += ` order by ${byName} ${byType}`
		}
		sql += ` limit ${numindex},${size}`
		return new Promise((resolve, reject) => {
			if (count < num - 1) {
				reject("无数据")
			} else {
				let isOpen = this.isOpenDB(name)
				if (isOpen) {
					plus.sqlite.selectSql({
						name: name,
						// sql: "select * from userInfo limit 3 offset 3",
						sql: sql,
						success: async (e) => {
							let a = await this.closeDB(name)
							resolve(e);
						},
						fail: async (e) => {
							let a = await this.closeDB(name)
							reject(e);
						}
					})
				} else {
					plus.sqlite.openDatabase({
						name: name,
						path: path || `_doc/${name}.db`,
						success: (res) => {
							plus.sqlite.selectSql({
								name: name,
								// sql: "select * from userInfo limit 3 offset 3",
								sql: sql,
								success: async (e) => {
									let a = await this.closeDB(name)
									resolve(e);
								},
								fail: async (e) => {
									let a = await this.closeDB(name)
									reject(e);
								}
							})
						},
						fail: async (e) => {
							let a = await this.closeDB(name)
							reject(e);
						}
					})
				}
			}
		})
	}

	// 查询表数据总条数
	static queryCount(name, tabName, path = "") {
		return new Promise((resolve, reject) => {
			let isOpen = this.isOpenDB(name)
			if (isOpen) {
				plus.sqlite.selectSql({
					name: name,
					sql: "select count(*) as num from " + tabName,
					success: async (e) => {
						let a = await this.closeDB(name)
						resolve(e);
					},
					fail: async (e) => {
						let a = await this.closeDB(name)
						reject(e);
					}
				})
			} else {
				plus.sqlite.openDatabase({
					name: name,
					path: path || `_doc/${name}.db`,
					success: (res) => {
						plus.sqlite.selectSql({
							name: name,
							sql: "select count(*) as num from " + tabName,
							success: async (e) => {
								let a = await this.closeDB(name)
								resolve(e);
							},
							fail: async (e) => {
								let a = await this.closeDB(name)
								reject(e);
							}
						})

					},
					fail: async (e) => {
						let a = await this.closeDB(name)
						reject(e);
					}
				});
			}

		})
	}

	// 修改（更新）数据
	// 示例：UPDATE COMPANY SET ADDRESS = 'Texas' WHERE ID = 6;
	// UPDATE 表名 SET 要修改字段 = '修改内容' WHERE 筛选条件 = 6;
	/**
	 * 简单更新
	 * @param {*} name 数据库名
	 * @param {*} tabName 表名
	 * @param {*} setData 设置值 （修改字段 + 修改内容）
	 * @param {*} setName 筛选条件
	 * @param {*} setVal 筛选值
	 * @returns 
	 */
	static updateSqlData(name, tabName, setData, setName, setVal, path = "") {
		return new Promise((resolve, reject) => {
			if (JSON.stringify(setData) !== '{}') {
				let dataKeys = Object.keys(setData)
				let setStr = ''
				dataKeys.forEach((item, index) => {
					// console.log(item, setData[item])
					setStr += (
						`${item} = ${JSON.stringify(setData[item])}${dataKeys.length - 1 !== index ? "," : ""}`
					)
				})
				console.log(setStr)
				let isOpen = this.isOpenDB(name)
				if (isOpen) {
					plus.sqlite.executeSql({
						name: name,
						sql: `update ${tabName} set ${setStr} where ${setName} = "${setVal}"`,
						success: async (e) => {
							let a = await this.closeDB(name)
							resolve(e);
						},
						fail: async (e) => {
							let a = await this.closeDB(name)
							reject(e);
						}
					})
				} else {
					plus.sqlite.openDatabase({
						name: name,
						path: path || `_doc/${name}.db`,
						success: (res) => {
							plus.sqlite.executeSql({
								name: name,
								sql: `update ${tabName} set ${setStr} where ${setName} = "${setVal}"`,
								success: async (e) => {
									let a = await this.closeDB(name)
									resolve(e);
								},
								fail: async (e) => {
									let a = await this.closeDB(name)
									reject(e);
								}
							})

						},
						fail: async (e) => {
							let a = await this.closeDB(name)
							reject(e);
						}
					});
				}

			} else {
				reject("错误")
			}
		});

	}
	//删除表
	static deleteTable(dbName, table, path = "") {
		return new Promise((resolve, reject) => {
			let isOpen = isOpenDB(dbName)
			if (isOpen) {
				plus.sqlite.executeSql({
					name: dbName,
					sql: `DROP TABLE ${table}`,
					success: async (e) => {
						let a = await this.closeDB(dbName)
						resolve(`删除表 ${table}，成功`)
					},
					fail: async (e) => {
						let a = await this.closeDB(dbName)
						reject(e);
					}
				});
			} else {
				plus.sqlite.openDatabase({ //如果数据库存在则打开，不存在则创建。
					name: dbName,
					path: path || `_doc/${dbName}.db`,
					success: (e) => {
						console.log('数据库打开成功');
						//执行 增\删\改 操作的SQL语句
						plus.sqlite.executeSql({
							name: dbName,
							sql: `DROP TABLE ${table}`,
							success: async (e) => {
								let a = await closeDB(dbName)
								resolve(`删除表 ${table}，成功`)
							},
							fail: async (e) => {
								let a = await this.closeDB(dbName)
								reject(e);
							}
						});
					},
					fail: async (e) => {
						let a = await this.closeDB(dbName)
						reject(e);
					}
				});
			}
		})
	}
	/**
	 * @param {Object} dbName
	 * @param {Object} dbsql 执行 增\删\改 操作的SQL语句
	 */
	static executeSql(dbName, dbsql, path = "") {
		console.log(dbsql);
		return new Promise((resolve, reject) => {
			// //判断数据库是否打开
			let bool = plus.sqlite.isOpenDatabase({
				name: dbName,
				path: path || `_doc/${dbName}.db`
			});
			if (bool) {
				plus.sqlite.executeSql({
					name: dbName,
					sql: dbsql,
					success: async (e) => {
						let a = await this.closeDB(dbName)
						resolve(e)
					},
					fail: async (e) => {
						let a = await this.closeDB(dbName)
						reject(e);
					}
				});
			} else {
				plus.sqlite.openDatabase({ //如果数据库存在则打开，不存在则创建。
					name: dbName,
					path: path || `_doc/${dbName}.db`,
					success: (e) => {
						console.log('数据库打开成功');
						//执行 增\删\改 操作的SQL语句
						console.log(dbsql);
						plus.sqlite.executeSql({
							name: dbName,
							sql: dbsql,
							success: async (e) => {
								let a = await this.closeDB(dbName)
								resolve(e)
							},
							fail: async (e) => {
								let a = await this.closeDB(dbName)
								reject(e);
							}
						});
					},
					fail: async (e) => {
						let a = await this.closeDB(dbName)
						reject(e);
					}
				});
			}
		})
	}

	/**
	 * @param {Object} dbName
	 * @param {Object} selectNcDuli
	 */
	static selectSql(dbName, selectNcDuli, path = "") {
		return new Promise((resolve, reject) => {
			let bool = plus.sqlite.isOpenDatabase({
				name: dbName,
				path: path || `_doc/${dbName}.db`
			})
			console.log(bool);
			if (bool) {
				plus.sqlite.selectSql({
					name: dbName,
					sql: selectNcDuli,
					success: async (e) => {
						let a = await this.closeDB(dbName)
						resolve(e)
					},
					fail: async (e) => {
						let a = await this.closeDB(dbName)
						reject(e);
					}
				});
			} else {
				plus.sqlite.openDatabase({
					name: dbName, //这里是数据库的名称
					path: path || `_doc/${dbName}.db`, //_doc是相对路径的应用私有文档目录
					success: (e) => {
						//查询数据
						plus.sqlite.selectSql({
							name: dbName,
							sql: selectNcDuli,
							success: async (e) => {
								let a = await this.closeDB(dbName)
								resolve(e)
							},
							fail: async (e) => {
								let a = await this.closeDB(dbName)
								reject(e);
							}
						});
					},
					fail: async (e) => {
						let a = await this.closeDB(dbName)
						reject(e);
					}
				});
			}
		})
	}

	//关闭数据库
	static closeDB(dbName) {
		return new Promise((resolve, reject) => {
			plus.sqlite.closeDatabase({
				name: dbName,
				success: function(e) {
					console.log('数据库关闭成功');
					resolve(true)
				},
				fail: function(e) {
					console.log('数据库关闭失败');
					reject(false)
				}
			});
		})

	}
}

export default SQLite