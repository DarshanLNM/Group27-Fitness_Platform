const path = require('path');

const userRoutes = require("./users");
const postRoutes = require("./posts");
const commentRoutes = require("./comments");
const reportRoutes = require("./reports");
const homePageRoutes = require("./homePage");
const bmiRoutes = require("./bmiCalculator");

const constructorMethod = app => 
{
    app.use("/users", userRoutes);
    app.use("/posts", postRoutes);
    app.use("/comments", commentRoutes);
    app.use("/reports", reportRoutes);
    app.use("/homePage", homePageRoutes);
    app.use("/bmicalculator", bmiRoutes); 
    
    app.get('/', (req, res) => 
    {
        res.redirect('http://localhost:3000/homePage');
    });

    app.use("*", (req, res) => 
    {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
