const express = require('express');
const app = express();
const port = 3100;
const cors = require('cors')

const userRouter = require('./router/userRouter');

const listRouter = require('./router/listRouter');



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cors());

app.use(userRouter);

app.use(listRouter);

app.listen(port, ()=>{
    console.log(`Serve at http://localhost:${port}`);
});
