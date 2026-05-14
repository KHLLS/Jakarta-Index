const database = require('../Database');
const mongodb = require('mongodb');

class PropertyModel{
    constructor() {
        this.client = new mongodb.MongoClient(process.env.MONGO_URL);
        this.col = this.client.db(process.env.DB).collection('property');
    }
    
    async findAll(filter = {},sort = {},limit = 10) {
        return await this.col.find(filter).sort(sort).limit(limit).toArray();
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

    async aggregate(agg = []){
        return await this.col.aggregate(agg).toArray();
    }
}

module.exports = PropertyModel;