const mongodb = require('mongodb');
require('dotenv').config();

async function setupIndex() {
    const client = new mongodb.MongoClient(process.env.MONGO_URL);
    await client.connect();
    const db = client.db(process.env.DB);
    const property = db.collection('property');
    const location = db.collection('location');
    const agent = db.collection('agent');
    await property.createIndex({loc_id:1});
    await property.createIndex({agent_id:1});
    await property.createIndex({status:1});
    await property.createIndex({price_idr:1});
    await property.createIndex({land_size_m2:-1});
    await property.createIndex({loc_id:1,price_idr:-1});
    await location.createIndex({district:1});
    await location.createIndex({city:1});
    await agent.createIndex({name:1});
    await agent.createIndex({agency_name:1});
    console.log('Done');
    process.exit();
}

setupIndex();