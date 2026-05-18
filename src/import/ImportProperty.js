const csv = require('csvtojson');
const PropertyModel = require('../models/PropertyModel');
const Database = require('../Database');
require('dotenv').config();

async function ImportProperty(){
    const results = [];
    const db = new Database();
    const pm = new PropertyModel();
    const data = await csv().fromFile('./data/properties.csv');
    for (const row of data) {
        results.push({
            _id : row._id,
            title : row.title,
            price_idr: Number(row.price_idr),
            bedrooms: Number(row.bedrooms),
            bathrooms: Number(row.bathrooms),
            garage: Number(row.garage),
            land_size_m2: Number(row.land_size_m2),
            building_size_m2: Number(row.building_size_m2),
            status : row.status,
            loc_id: row.loc_id,
            agent_id: row.agent_id,
            njop_per_district: Number(row.njop_per_district),
        });
    }
    await pm.insertMany(results);
    console.log('Import Done');
    db.close();
}

ImportProperty();