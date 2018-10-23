This file describes how to run the code in the repository on your local machine

MongoDB must be installed and running as a service on your local machine

Node js must be installed on your machine and added to your path

on the mongoDB database create a database called "energy-viz"

in the energy-viz database create a collection called "Junction" and "Students". The referenced res data is not needed for the MVP

Run "node populateDB.js" and "node populateBISDB.js" form the energy-viz/public/js directory

Run "node index.js" from energy-viz/

NOTE: ensure that the directories in populateDB.js, populateBISDB.js and index.js are correct for your local machine 
NOTE: the csv files for population are found in raw/



