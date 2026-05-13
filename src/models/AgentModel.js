const database = require('../Database');
const mongodb = require('mongodb');

class AgentModel{
    constructor() {
        this.client = new mongodb.MongoClient(process.env.MONGO_URL);
        this.col = this.client.db(process.env.DB).collection('agent');
    }
    
    async findAll(filter = {}) {
        return await this.col.find(filter).toArray();
    }

    async findOne(filter = {}){
        return await this.col.findOne(filter);
    }
    
    async insertOne(data) {
        return await this.col.insertOne(data);
    }

    async insertMany(data) {
        return await this.col.insertMany(data);
    }
    
    async delete(id){
        return await this.col.deleteOne({_id:id});
    }
    
    async update(id,data){
        return await this.col.updateOne(
          {_id:id},
          {$set : data}
       )
    }
}

module.exports = AgentModel;