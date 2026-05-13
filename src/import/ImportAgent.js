const csv = require('csvtojson');
const fs = require('fs');
const AgentModel = require('../models/AgentModel');
require('dotenv').config();

async function ImportAgent(){
    const data = await csv().fromFile('./data/agent.csv');
    await AgentModel.insertMany(data);
}