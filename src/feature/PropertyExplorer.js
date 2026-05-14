const AgentModel = require('../models/AgentModel');
const LocationModel = require('../models/LocationModel');
const PropertyModel = require('../models/PropertyModel');

class PropertyExplorer {
    constructor(){
        this.am = new AgentModel();
        this.lm = new LocationModel();
        this.pm = new PropertyModel();
    }

    async findByDistrict(district) {
        const loc = await this.lm.findOne({district});
        if (!loc) {
            return [];
        }
        return await this.pm.findAll({loc_id:loc._id});
    }

    async findByCity(city) {
        const loc = await this.lm.findOne({city});
        if (!loc) {
            return [];
        }
        return await this.pm.findAll({loc_id:loc._id});
    }

    async filterByPrice(min = 0,max = Infinity){
        return await this.pm.findAll(
            {
                $and : 
                [{price_idr: {$gte : min}},
                {price_idr: {$lte : max}}]
            }
        );
    }

    async filterByBedrooms(min = 0,max = Infinity){
        return await this.pm.findAll(
            {
                $and : 
                [{bedrooms: {$gte : min}},
                {bedrooms: {$lte : max}}]
            }
        );
    }

    async filterByBathrooms(min = 0,max = Infinity){
        return await this.pm.findAll(
            {
                $and : 
                [{bathrooms: {$gte : min}},
                {bathrooms: {$lte : max}}]
            }
        );
    }

    async filterByStatus(status = 'AVAILABLE'){
        return await this.pm.findAll({status});
    }

    async sortByPrice(urut = -1){
        return await this.pm.findAll({},{price:urut})
    }

    async sortByBuilding(urut = -1){
        return await this.pm.findAll({},{building_size_m2:urut})
    }

    async sortByLand(urut = -1){
        return await this.pm.findAll({},{land_size_m2:urut})
    }
}

async function test() {
   let tes = new PropertyExplorer();
   const result = await tes.sortByLand();
   console.log(result);
   process.exit();
}

test();

module.exports = PropertyExplorer;