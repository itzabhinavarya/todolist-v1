const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food" , "Cook Food" , "Eat Food"];
let workItems = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get("/", function (req, res) {

    let today = new Date();
    let currentDay = today.getDay();
    let day = "";
    let options = {
        // weekday : 'long',
        year : 'numeric',
        month : 'long',
        day : 'numeric',
    };
    
    let date = today.toLocaleDateString("en-US",options);


    // console.log(currentDay);

    switch (currentDay) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break; 
        default:
            res.send("Fetching Error........")
            break;
    }

    // if (today.getDay() === 0 || today.getDay() === 4) {
    //     day = "Weekend";
    //     //res.render("list",{kindOfDay:day});
    // } else {
    //     day = "Weekday";
    // }

    res.render("list",{
        listTitle:day,
        dateFormat:date,
        newListItems:items,
    }); 
});

app.post("/",function(req,res){
    let item = req.body.newItem;
    
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item)
        // console.log(item);
        res.redirect("/");
    }
  
});


app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work" , newListItems: workItems});
});

app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
    
});


app.get("/about",function(req,res){
    res.render("about");
});


app.listen(3000, function () {
    console.log("Server is running on port 3000");
});