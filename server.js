const express = require("express");
const exphbs = require("express-handlebars");

// Listening port
const port = process.env.PORT || 8080;

// Import patient.json
const patientData = require('./data/patient.json');

// Set up express and handlebars
const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')

// Call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + port);
}

// Start Server
app.listen(port, onHttpStart);

// Functions
let getName = (data) => {
  return `${data.name.given} ${data.name.family}`;
}

let getOrganization = (data) => {
  return `${data.managingOrganization.display}`;
}

let getGender = (data) => {
  let gender = data.gender.charAt(0).toUpperCase() + data.gender.slice(1)
  return gender;
}

let getNumberOfConditions = (data) => {
  return data.conditions.length;
}

let getConditions = (data) => {
  return data.conditions;
}

// Setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req, res){

  res.render("index", {

    title: `SeamlessMD`,
    name: getName(patientData),
    organization: getOrganization(patientData),
    gender: getGender(patientData),
    numberOfConditions: getNumberOfConditions(patientData),
    conditions: getConditions(patientData)

  });
});