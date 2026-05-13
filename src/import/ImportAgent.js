const csv = require('csvtojson');
const fs = require('fs');
const AgentModel = require('../models/AgentModel');
const Database = require('../Database')
require('dotenv').config();

async function ImportAgent(){
    const db = new Database();
    const results = [];
    const agent = new AgentModel();
    const data = await csv().fromFile('./data/agent.csv');
    for (const row of data) {
        results.push({
            _id : row.agent_id,
            name : row.name,
            phone: row.phone,
            email: row.email,
            agency_name: row.agency_name,
            whatsapp: row.whatsapp
        });
    }
    await agent.insertMany(results);
    console.log('Import DOne');
    db.close();
}

ImportAgent();