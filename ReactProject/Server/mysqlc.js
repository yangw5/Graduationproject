// var mysql = require('mysql');
// //连接数据库
// var connection = mysql.createConnection({
// 	host:'localhost',
// 	user:'root',  //用户名
// 	password:'',   //密码
// 	database:'study',
// 	port:'3306'     //端口号
// });
// connection.connect(function(err){
// 	if(err){
// 	  console.log('---:'+err);
// 	  return;
// 	}
// 	console.log('连接succeed');
// });
// // 插入一条数据
// var sql = 'insert into student (id,name,password) values(?,?,?)';
// var param = ['wwwwww','wwwww','wwwww'];
// connection.query(sql,param,function(err,rs){
// 	if(err){
// 		console.log(err.message);
// 		return;
// 	}
// 	console.log('插入数据succeed');
// });
// //执行查询 查询study数据库中的student表的数据
// connection.query('select * from student',function(err,rs){
// 	if(err){
// 		console.log(err);
// 		return;
// 	}
// 	for(var i=0;i<rs.length;i++){
// 		console.log('id:'+rs[i].id+'name:'+rs[i].name+'password:'+rs[i].password);
	
// 	}
// });
// //关闭数据库
// connection.end(function(err){
// 	if(err){
// 	  console.log('---:'+err);
// 	  return;
// 	}
// 	console.log('关闭succeed');
// });









function sqlc(sql){
	var mysql = require('mysql'); //调用MySQL模块
	var aaa = new OptPool();  //初始化连接池对象
	var pool = aaa.getPool(); //创建连接池
	var result=[];//返回数据
	//从连接池获取一个连接
	pool.getConnection(function(err,conn){
		//查询study数据库中的student表的数据
		// var sql = 'select * from user';

		conn.query(sql,function(err,rs){
			if(err){
				console.log(err);
				return;
			}
			for(var i=0;i<rs.length;i++){
				result.push(rs[i]);
				// console.log(rs[i].id+'name:'+rs[i].phone);
			}
			//console.log(result);
			conn.release();//放回连接池
			return result;
		});
	});
//创建一个用于创建连接池的对象
	function OptPool(){
			this.flag = true; //是否连接通过
			this.pool = mysql.createPool({
				host:'127.0.0.1',
				user:'root',
				password:'0505yang',
				database:'graduationproject',
				port:'3306'
			});
			this.getPool = function(){
				if(this.flag){
					//监听connection事件
					this.pool.on('connection',function(connection){
						connection.query('SET SESSION auto increment increme')
						this.flag = false;
					});
				}
				return this.pool;
			}

	}
}

exports.sqlc=sqlc;