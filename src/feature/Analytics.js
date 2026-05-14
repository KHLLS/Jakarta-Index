const AgentModel = require('../models/AgentModel');
const LocationModel = require('../models/LocationModel');
const PropertyModel = require('../models/PropertyModel');

class Analytics{
    constructor(){
        this.am = new AgentModel();
        this.lm = new LocationModel();
        this.pm = new PropertyModel();
    }

    async rankDistrict(){
        return await this.pm.aggregate([
            {
                $lookup:{
                    from:'location',
                    localField:'loc_id',
                    foreignField:'_id',
                    as:'location'
                }
            },
            {$unwind:'$location'},
            {
                $set:{
                    price_per_m2:{
                        $divide:[
                            '$price_idr',
                            '$land_size_m2'
                        ]
                    }
                }
            },
            {
                $group:{
                    _id:'$location.district',
                    avg_price_per_m2 : {
                        $avg : '$price_per_m2'
                    },
                    total : {
                        $sum:1
                    }
                }
            },
            {$sort:{'avg_price_per_m2':-1}},
            {$limit:10}
        ])
    }

    async priceDistribution(){
        return await this.pm.aggregate([
            {
                $bucket:{
                    groupBy:'$price_idr',
                    boundaries:[
                        0,
                        5_000_000_000,
                        10_000_000_000,
                        20_000_000_000,
                        30_000_000_000,
                        50_000_000_000,
                        999_999_999_999
                    ],
                    default : 'other',
                    output:{
                        'total':{$sum:1},
                        'avg_price':{$avg:'$price_idr'}
                    }
                }
            }
        ])
    }

    async districtComparison(){
        return await this.pm.aggregate([
            {
                $lookup:{
                    from:'location',
                    localField:'loc_id',
                    foreignField:'_id',
                    as:'location'
                }
            },
            {$unwind:'$location'},
            {
                $group:{
                    _id:'$location.city',
                    avg_price:{$avg:'$price_idr'},
                    max_price:{$max:'$price_idr'},
                    min_price:{$min:'$price_idr'},
                    total_listing:{$sum:1}
                }
            },
            {$sort:{'total_listing':-1}}
        ])
    }

    async rankAgent(){
        return await this.pm.aggregate([
            {
                $lookup:{
                    from:'agent',
                    localField:'agent_id',
                    foreignField:'_id',
                    as:'agent'
                }
            },
            {$unwind:'$agent'},
            {
                $group:{
                    _id:'$agent._id',
                    name:{$first:'$agent.name'},
                    total_sold:{
                        $sum:{
                            $cond:[{
                                $eq:['$status','SOLD']},
                            1,0]
                        }}
                }
            },
            {$sort:{'total_sold':-1}}
        ])
    }
}

async function test() {
   let tes = new Analytics();
   const result = await tes.rankAgent();
   console.log(result);
   process.exit();
}

test();

module.exports = Analytics;