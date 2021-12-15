const listRouter = require('express').Router();
const {flowers} = require('../filter/flowers');
const {quizzes} = require('../filter/data');
const {scores} = require('../filter/scores');

const PGSql = require('../dbConfig/dbConfig');
// 插入花的数据到数据库
const createFlowers = function(i){
    let flowerInsertStr = {
        name: 'flowerInsert',
        text: 'INSERT INTO flowers(id, name, picture) VALUES($1, $2, $3)',
        values: [i+1, flowers[i].name, flowers[i].picture]
    }
    PGSql.query(flowerInsertStr).then((insetResult)=>{
        if(i<flowers.length-1){
            createFlowers(i+1);
        }
    });
}
listRouter.get('/FLOWS', (req, res)=>{
    let flowersSelectStr = {
        // give the query a unique name
        name: 'flowersSelect',
        text: 'SELECT * FROM flowers ORDER BY id DESC'
    }
    PGSql.query(flowersSelectStr).then(selectResult=>{
        let getRows = selectResult.rows;
        res.send({
            code: 200,
            list:getRows
        });
    });
});

listRouter.get('/Test', (req, res)=>{
    res.send({
        code: 200,
        list:quizzes
    });
});

listRouter.get('/Quz', (req, res)=>{
    let getList = quizzes.find(v=>{
        return v.id = req.query.id
    })
    res.send({
        code: 200,
        list:getList
    });
});

listRouter.post('/Score', (req, res)=>{
    console.log(req.body)
    res.send({
        code: 200
    });
});

module.exports = listRouter;
