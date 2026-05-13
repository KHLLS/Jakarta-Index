const csv = require('csvtojson');
const fs = require('fs');
const PropertyModel = require('../models/PropertyModel');
const Database = require('../Database');
require('dotenv').config();

async function ImportProperty(){
    const db = new Database();
    const pm = new PropertyModel();
    const data = await csv().fromFile('./data/properties.csv');
    await pm.insertMany(data);
    console.log('Import Done');
    db.close();
}

ImportProperty();