const AgentModel = require('../models/AgentModel');
const LocationModel = require('../models/LocationModel');
const PropertyModel = require('../models/PropertyModel');
const mongodb = require('mongodb')

class PropertyDetail{
    constructor(){
        this.am = new AgentModel();
        this.lm = new LocationModel();
        this.pm = new PropertyModel();
    }

    async findDetailByID(_id){
        return await this.pm.aggregate([
            {$match:{'_id':_id}},
            {
                $lookup:{
                    from:'location',
                    localField:'loc_id',
                    foreignField:'_id',
                    as:'location'
                }
            },
            {
                $lookup:{
                    from:'agent',
                    localField:'agent_id',
                    foreignField:'_id',
                    as:'agent'
                }
            },
            {$unwind:'$location'},
            {$unwind:'$agent'}
        ])
    }

    async findSimilar(_id){
        const prop = await this.pm.findOne({_id});
        const range_price = prop.price_idr * 10 / 100; 
        const range_land = prop.land_size_m2 * 10 / 100; 
        return await this.pm.findAll(
            {loc_id:prop.loc_id,
            price_idr : {
                $gte: prop.price_idr - range_price,
                $lte: prop.price_idr + range_price},
            land_size_m2 : {
                $gte: prop.land_size_m2 - range_land,
                $lte: prop.land_size_m2 + range_land}
            }
        )
    }
}

async function test() {
   let tes = new PropertyDetail();
   const result = await tes.findSimilar(new mongodb.ObjectId('6a044eef6f02700570aad09b'));
   console.log(result);
   process.exit();
}

test();

module.exports = PropertyDetail;
