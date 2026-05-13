const csv = require('csvtojson');
const fs = require('fs');
const LocationModel = require('../models/LocationModel');
require('dotenv').config();

async function ImportAgent(){
    const data = await csv().fromFile('./data/agent.csv');
    await LocationModel.insertMany(data);
}