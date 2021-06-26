const bodyParser = require("body-parser");
const request = require("request");
const express = require("express");
const https = require("https");

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/", function(req, res) {
    var firstName = req.body.Fname;
    var lastName = req.body.Lname;
    var email = req.body.email;
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }
    var jsonData = JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/0c0ce5d260"
    const options = {
        method: "POST",
        auth: "ANYTHING:d6d3053974b273a8b7353fec99b624ea-us6"
    }
    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200)
            res.sendFile(__dirname + "/success.html")
        else res.sendFile(__dirname + "/failure.html")
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData)
    request.end();
})

app.post("/failure", function(req, res) {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
    console.log("SERVER UP AND RUNNING");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/sinup.html")
})

//0c0ce5d260