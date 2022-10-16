const express = require('express');
const BMIResultService = require('./Services/BMICalculator.js');
const BMIUserDatabaseService = require('./Services/BMIUserDatabaseService');

const app = express();
BMIUserDatabaseService.createDB();

app.listen(3000, () => { console.log('listenning to port 3000'); });

app.use(express.static('public'));
app.use(express.static('node_modules/jquery/dist/'));

app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));

/*routes below*/
app.get("/", (req, res) => { 
    console.log("geting form page...");
    res.render("home");
});

app.post("/", (req, res) => {
    console.log("user submitted form!");

    const name = req.body.name;
    const gender = req.body.gender;
    const height = req.body.height;
    const weight = req.body.weight;
    
    res.redirect(`/result/${name}/${gender}/${height}/${weight}`);
})

app.get("/result/:name/:gender/:height/:weight", 
    async (req, res) =>{
    
    const name = req.params.name;
    const gender = req.params.gender;
    const height = req.params.height;
    const weight = req.params.weight;

    await BMIResultService.updateBMIResult(parseInt(height), parseInt(weight));
    BMIUserDatabaseService.registerUserResult(name, gender, weight, height, BMIResultService,  BMIResultService.GetBMIStatus, BMIResultService.GetBMIValue);

    res.render("resultPage", {data:
        {
            name: name,
            gender: gender,
            weight: weight,
            height: height,
            BMIStatus: BMIResultService.GetBMIStatus,
            BMIValue: BMIResultService.GetBMIValue
        }} 
    );
})

app.post("/home",
    async (req, res) =>{
        res.redirect("/");
});

app.get("/getData", 
    async (req, res) => {
    const result = await BMIUserDatabaseService.getUserData(req.query.name);
    console.log("getting data from database...");

    res.send(result);
    res.end();
});
