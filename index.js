const mongodb = require('mongodb');
const rl = require('readline-sync');
require('dotenv').config();

const client = new mongodb.MongoClient(process.env.MONGO_URL);

async function main() {
	await client.connect();
	console.log('Connected to Database!');
	
	const db = await client.db('terserah-db').collection('mahasiswa');
	await db.insertOne({nama:'Sakha', npm:'21779907'});
	console.log('Data Inserted!!');
	
	const mahasiswa_arr = await db.find().toArray();
	console.log(mahasiswa_arr);
	console.log('\n');

	mahasiswa_arr.forEach((e,i) => console.log(`${i+1}. ${e.nama} [${e.npm}]`));
	
	const update_mahasiswa = await db.updateOne(
		{npm:'21779907'},
		{$set: {nama:'Devon',npm:'21779909' } }
	)

	console.log(update_mahasiswa);
	console.log(await db.find({npm:'21779909'}).toArray());

	await client.close();
};

main().catch(console.error); 
