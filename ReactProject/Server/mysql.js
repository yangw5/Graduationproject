'use strict';
const mysql  = require( 'mysql' );//导入mysql模块

var pool  = mysql.createPool( {//创建连接池对象
    connectionLimit : 50,
    host            : '127.0.0.1',//主机地址
    user            : 'root',//用户名
    password    : '0505yang',//密码
    database     : 'graduationproject',//数据库名称
    port:'3306',//主机地址端口
    multipleStatements : true  //是否允许执行多条sql语句
} );
//将结果已对象数组返回
var row=( sql , ...params )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    });
};
//返回一个对象
var first=( sql , ...params )=>{
    return new Promise(function(resolve,reject){//异步操作
        pool.getConnection(function(err,connection){//创建连接
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){//语句查询
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve( res[0] || null );
            });
        });
    });
};
//返回单个查询结果
var single=(sql , ...params )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject( error );
                    return;
                }
                for( let i in res[0] )
                {
                    resolve( res[0][i] || null );
                    return;
                }
                resolve(null);
            });
        });
    });
}
//执行代码，返回执行结果
var execute=(sql , ...params )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return; 
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve( res );
            });
        });
    });
}

//模块导出
module.exports = {
    ROW     : row ,
    FIRST   : first ,
    SINGLE  : single ,
    EXECUTE : execute 
}