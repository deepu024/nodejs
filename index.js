const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const UserRoutes = require('./routes/User');
const app = express();
const cors = require('cors');

// this is database url
const dataBaseUrl = "mongodb+srv://deepanshu:deepanshu@cluster0.sbmah.mongodb.net/test";

mongoose.connect(dataBaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(UserRoutes);

app.use(express.static(path.join(__dirname, 'profiles')));

app.listen(8000, () => {
    console.log("my server is connected successfully and running on port 8000");
});
