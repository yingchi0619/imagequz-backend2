const { Pool } = require("pg");

// 数据库配置
var config = {
  user: "postgres",
  host: "localhost",
  database: "imagequiz",
  password: "123456",
  port: 5432,

  // 扩展属性
  max: 20, // 连接池最大连接数
  idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
};

// 创建连接池
var pool = new Pool(config);

// let client = new pg.Client(config);

module.exports = pool;
