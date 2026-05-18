const csv = require('csvtojson');
const LocationModel = require('../models/LocationModel');
const Database = require('../Database');
require('dotenv').config();

async function ImportLocation(){
    const db = new Database();
    const loc = new LocationModel();
    const results = [];
    const data = await csv().fromFile('./data/location.csv');
    for (const row of data) {
        results.push({
            _id : row.loc_id,
            city : row.city,
            district: row.district
        });
    }
    await loc.insertMany(results);
    console.log('Import DOne');
    db.close();
}

ImportLocation();