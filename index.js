const express = require('express');
const UserRoutes = require('./routes/User');
const app = express();

app.use(express.json());
app.use(UserRoutes);

app.listen(8000, () => {
    console.log("my server is connected successfully and running on port 8000");
});
