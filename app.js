const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {
    addPage,
    editPage,
    main,
    userList,
    userPages,
    wikiPage
} = require('./views');

const morgan = require('morgan');
const {db, Page, User} = require('./models');

const app = express();

db.authenticate().
then(() => {
    console.log("connected to the database");
})

app.use(morgan("dev"));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//load our static files
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res, next) => {
    res.send(main())
})

//Create tables
const init = async () => {
    await db.User.sync();
    await db.Page.sync();

    app.listen(2000, function () {
        console.log('server is listening on port 2000')
    })
}