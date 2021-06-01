const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Admin = require('./routes/Admin.route');
const Employee = require('./routes/Employee.route');

const app = express();

mongoose.connect('mongodb+srv://alishan:ali123@cluster0.sgtcb.mongodb.net/EMS', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Connected to Database"))
    .catch(err => {
        console.error("Couldnot connect to Database", err);
        process.exit();
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/admin', Admin);
app.use('/employee', Employee);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App is running on ${port} ...`);
});