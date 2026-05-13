const Databse = require('./Database');
const mongodb = require('mongodb');

class ProductModel {
  constructor() {
    this.client = new mongodb.MongoClient(process.env.MONGO_URL);
    this.col = this.client.db('demo-db').collection('products');
  }

  async findAll() {
    return await this.col.find().toArray();
  }

  async insertOne(name, price) {
    return await this.col.insertOne({ name: name, price: price });
  }

  async delete(id){
    return await this.col.deleteOne({_id:id});
  }

  async update(id,name,price){
    return await this.col.updateOne(
      {_id:id},
      {$set:{name:name,price:price}}
    )
  }
}

module.exports = ProductModel;