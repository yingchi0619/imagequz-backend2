const {dbConfig} = require('../dbConfig');
let PG = function () {
  console.log("准备数据库连接...");
  this.connectionState = false;
};
PG.prototype.select = function(sqlStr){
    return new Promise((resolve, reject)=>{
        pool.query(sqlStr, function(err_, data){
            resolve({code: 200, data: data.rows});
            pool.end();
        })/* .then(result=>{
            resolve({code: 200, data: result.rows});
            client.end();
        }); */
    });
};
PG.prototype.query = function (sqlStr, values, cb) {
  let typeVal = Object.prototype.toString.call(values);
  if (typeVal === "[object Function]") {
    //查
    // pglogger.info(sqlStr);
    cb = values;
    client.query(sqlStr, function (err, result) {
      // pglogger.info(`结果,err ${err},result:${result}`);
      if (err) {
        cb(err);
      } else {
        if (result.rows !== undefined) {
          cb(result.rows);
        } else {
          cb();
        }
      }
    });
  } else {
    //插入
    // pglogger.info(`${sqlStr},${values}`);
    client.query(sqlStr, values, function (err, result) {
      if (err) {
        cb(err);
      } else {
        if (result.rows !== undefined) {
          cb(result.rows);
        } else {
          cb();
        }
      }
    });
  }
};
module.exports = new PG();
