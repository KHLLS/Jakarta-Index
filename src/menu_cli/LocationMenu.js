const rl = require('readline-sync');
const LocationModel = require('../models/LocationModel');

const {
    printLocation,
    printMessage,
    printEmpty
} = require('../Formatter');

class LocationMenu {
    constructor() {
        this.lm = new LocationModel();
    }

    async locationMenu() {
        while (true) {
            console.clear();
            console.log(`
Location Management Menu:
1. Show All Location
2. Find By City
3. Find By District
4. Add Location
5. Update Location
6. Delete Location
7. Back
`);
            const pilih = rl.question('Pilih menu: ');

            switch (pilih) {

                case '1': {
                    const result = await this.lm.findAll();

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printLocation(result);
                    break;
                }

                case '2': {
                    const city = rl.question('City: ');
                    const result = await this.lm.findAll({ city });

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printLocation(result);
                    break;
                }

                case '3': {
                    const district = rl.question('District: ');
                    const result = await this.lm.findAll({ district });

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printLocation(result);
                    break;
                }

                case '4': {
                    const data = {
                        _id: rl.question('Location ID: '),
                        city: rl.question('City: '),
                        district: rl.question('District: '),
                        province: rl.question('Province: ')
                    };

                    await this.lm.insertOne(data);

                    printMessage('Location berhasil ditambah');
                    break;
                }

                case '5': {
                    const id = rl.question('Location ID: ');
                    const data = {};

                    const city = rl.question('New City: ');
                    if (city) data.city = city;

                    const district = rl.question('New District: ');
                    if (district) data.district = district;

                    const province = rl.question('New Province: ');
                    if (province) data.province = province;

                    await this.lm.update(id, data);

                    printMessage('Location berhasil diupdate');
                    break;
                }

                case '6': {
                    const id = rl.question('Location ID: ');

                    await this.lm.delete(id);

                    printMessage('Location berhasil dihapus');
                    break;
                }

                case '7':
                    return;

                default:
                    printMessage('Menu tidak valid');
            }

            rl.question('\nEnter untuk lanjut');
        }
    }
}

module.exports = LocationMenu;