const rl = require('readline-sync');
const PropertyExplorer = require('../feature/PropertyExplorer');
const PropertyDetail = require('../feature/PropertyDetail');
const PropertyModel = require('../models/PropertyModel');

const {
    printProperty,
    printPropertyDetail,
    printMessage,
    printEmpty
} = require('../Formatter');

class PropertyMenu {
    constructor() {
        this.pe = new PropertyExplorer();
        this.pd = new PropertyDetail();
        this.pm = new PropertyModel();
    }

    async propertyExplorerMenu() {
        while (true) {
            console.clear();
            console.log(`
Property Explorer Menu:
1. Find By District
2. Find By City
3. Filter By Price
4. Filter By Bedrooms
5. Filter By Bathrooms
6. Filter By Status
7. Sort By Price
8. Sort By Building Size
9. Sort By Land Size
10. Back
`);
            const pilih = rl.question('Pilih menu: ');

            switch (pilih) {

                case '1': {
                    const district = rl.question('District: ');
                    const result = await this.pe.findByDistrict(district);

                    if (!result.length) {
                        printEmpty();
                        break;
                    }
                    printProperty(result);
                    break;
                }

                case '2': {
                    const city = rl.question('City: ');
                    const result = await this.pe.findByCity(city);

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printProperty(result);
                    break;
                }

                case '3': {
                    const min = rl.questionInt('Min Price: ');
                    const max = rl.questionInt('Max Price: ');
                    const result = await this.pe.filterByPrice(min, max);

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printProperty(result);
                    break;
                }

                case '4': {
                    const min = rl.questionInt('Min Bedrooms: ');
                    const max = rl.questionInt('Max Bedrooms: ');
                    const result = await this.pe.filterByBedrooms(min, max);

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printProperty(result);
                    break;
                }

                case '5': {
                    const min = rl.questionInt('Min Bathrooms: ');
                    const max = rl.questionInt('Max Bathrooms: ');
                    const result = await this.pe.filterByBathrooms(min, max);

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printProperty(result);
                    break;
                }

                case '6': {
                    const status = rl.question('Status: ');
                    const result = await this.pe.filterByStatus(status);

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printProperty(result);
                    break;
                }

                case '7': {
                    const urut = rl.questionInt('1 ASC | -1 DESC: ');
                    const result = await this.pe.sortByPrice(urut);

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printProperty(result);
                    break;
                }

                case '8': {
                    const urut = rl.questionInt('1 ASC | -1 DESC: ');
                    const result = await this.pe.sortByBuilding(urut);

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printProperty(result);
                    break;
                }

                case '9': {
                    const urut = rl.questionInt('1 ASC | -1 DESC: ');
                    const result = await this.pe.sortByLand(urut);

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printProperty(result);
                    break;
                }

                case '10':
                    return;

                default:
                    printMessage('Menu tidak valid');
            }
            rl.question('\nEnter untuk lanjut');
        }
    }

    async propertyDetailMenu() {
        while (true) {
            console.clear();
            console.log(`
Property Detail Menu:
1. Find Detail By ID
2. Find Similar Property
3. Back
`);
            const pilih = rl.question('Pilih menu: ');

            switch (pilih) {

                case '1': {
                    const id = rl.question('Property ID: ');
                    const result = await this.pd.findDetailByID(id);

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printPropertyDetail(result);
                    break;
                }

                case '2': {
                    const id = rl.question('Property ID: ');
                    const result = await this.pd.findSimilar(id);

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printProperty(result);
                    break;
                }

                case '3':
                    return;

                default:
                    printMessage('Menu tidak valid');
            }
            rl.question('\nEnter untuk lanjut');
        }
    }

    async managementMenu() {
        while (true) {
            console.clear();
            console.log(`
Property Management Menu:
1. Show All Property
2. Add Property
3. Update Property
4. Delete Property
5. Back
`);
            const pilih = rl.question('Pilih menu: ');

            switch (pilih) {

                case '1': {
                    const result = await this.pm.findAll();

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printProperty(result);
                    break;
                }

                case '2': {
                    const data = {
                        _id: rl.question('Property ID: '),
                        title: rl.question('Title: '),
                        price_idr: rl.questionInt('Price: '),
                        bedrooms: rl.questionInt('Bedrooms: '),
                        bathrooms: rl.questionInt('Bathrooms: '),
                        garage: rl.questionInt('Garage: '),
                        land_size_m2: rl.questionInt('Land Size: '),
                        building_size_m2: rl.questionInt('Building Size: '),
                        status: rl.question('Status: '),
                        loc_id: rl.question('Location ID: '),
                        agent_id: rl.question('Agent ID: ')
                    };
                    const agent = await this.pe.am.findOne({_id: data.agent_id});
                    const location =await this.pe.lm.findOne({_id: data.loc_id});

                    if (!agent) {
                        printMessage('Agent tidak ditemukan');
                        break;
                    }

                    if (!location) {
                        printMessage('Location tidak ditemukan');
                        break;
                    }

                    await this.pm.insertOne(data);

                    printMessage('Property berhasil ditambah');
                    break;
                }

                case '3': {
                    const id = rl.question('Property ID: ');
                    const data = {};

                    const title = rl.question('New Title: ');
                    if (title) data.title = title;

                    const price = rl.question('New Price: ');
                    if (price) data.price_idr = Number(price);

                    await this.pm.update(id, data);

                    printMessage('Property berhasil diupdate');
                    break;
                }

                case '4': {
                    const id = rl.question('Property ID: ');

                    await this.pm.delete(id);

                    printMessage('Property berhasil dihapus');
                    break;
                }

                case '5':
                    return;

                default:
                    printMessage('Menu tidak valid');
            }

            rl.question('\nEnter untuk lanjut');
        }
    }
}

module.exports = PropertyMenu;