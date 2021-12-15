const userRouter = require('express').Router();
const {customers} = require('../filter/customers');
const { v4 } = require('uuid');
const PGSql = require('../dbConfig/dbConfig');

const objAssign = function(objA, objB){
    if(objA && objB){
        Object.keys(objA).forEach(v=>{
            objA[v] = objB[v] || objA[v];
        })
    }
}

userRouter
    .post('/login', (req, res)=>{
        let getInfo =  req.body;
        console.log(getInfo)
        let j = {
            code: 403,
            msg: 'user or password error'
        }
        let loginSelectStr = {
            // give the query a unique name
            name: 'loginSelect',
            text: 'SELECT * FROM customers WHERE name = $1',
            values: [getInfo.userName]
        }
        PGSql.query(loginSelectStr).then(selectResult=>{
            let getRows = selectResult.rows;
            if(getRows.length){
                let getRow = getRows.find(v=>{
                    return v.password === getInfo.password;
                });
                if(getRow){
                    delete getRow.password;
                    j.code = 200;
                    j.msg = 'login success';
                    j.userInfo = getRow;
                }else{
                    j.code = 201;
                    j.msg = 'Incorrect password';
                }
            }else{
                j.code = 202;
                j.msg = 'The current account is not registered, please register';
            }
            res.send(j);
        });
    })
    .post('/signup', (req, res)=>{
        let getInfo = req.body;
        let j = {};
        let signSelectStr = {
            // give the query a unique name
            name: 'signSelect',
            text: 'SELECT * FROM customers'
        }
        PGSql.query(signSelectStr).then(selectResult=>{
            let getRows = selectResult.rows;
            if(getRows.length){
                let getHaveUse = getRows.find(v=>{
                    let mark = false;
                    if(v.email === getInfo.email){
                        j.errorType = 'email';
                        mark = true;
                    }
                    if(v.name === getInfo.userName){
                        j.errorType = 'userName';
                        mark = true;
                    }
                    if(v.phone === getInfo.phone){
                        j.errorType = 'phone';
                        mark = true;
                    }
                    return mark;
                });
                if(getHaveUse){
                    j.code = 403;
                    j.msg = 'User already exists';
                    res.send(j);
                }
            }
            if(j.code !== 403){
                let signInsertStr = {
                    name: 'signInsert',
                    text: 'INSERT INTO customers(id, name, email, password, phone, sex) VALUES($1, $2, $3, $4, $5, $6)',
                    values: [v4(), getInfo.userName, getInfo.email, getInfo.password, getInfo.phone, getInfo.sex === 1 ? 't': 'f', ]
                }
                PGSql.query(signInsertStr).then((insetResult)=>{
                    let successInfo = signInsertStr.values;
                    j.userInfo = {
                        id: successInfo[0],
                        name: successInfo[1],
                        email: successInfo[2],
                        phone: successInfo[4],
                        sex: successInfo[5]
                    };
                    j.code = 200;
                    j.msg = 'Sign in success!';
                    res.send(j);
                });
            }

        });
    })

module.exports = userRouter
