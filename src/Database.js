const mongodb = require('mongodb');
require('dotenv').config();

class Database {
  constructor() {
    this.client = new mongodb.MongoClient(process.env.MONGO_URL);
    this.db = null;
  }

  async connect() {
    await this.client.connect();
    console.log('Connected!\n');
  }

  async close() {
    await this.client.close();
    console.log('Bye!');
  }
}

module.exports = Database;