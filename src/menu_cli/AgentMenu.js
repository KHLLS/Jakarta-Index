const rl = require('readline-sync');
const AgentModel = require('../models/AgentModel');

const {
    printAgent,
    printMessage,
    printEmpty
} = require('../Formatter');

class AgentMenu {
    constructor() {
        this.am = new AgentModel();
    }

    async agentMenu() {
        while (true) {
            console.clear();
            console.log(`
Agent Management Menu:
1. Show All Agent
2. Find By Name
3. Find By Agency
4. Add Agent
5. Update Agent
6. Delete Agent
7. Back
`);
            const pilih = rl.question('Pilih menu: ');

            switch (pilih) {

                case '1': {
                    const result = await this.am.findAll();

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printAgent(result);
                    break;
                }

                case '2': {
                    const name = rl.question('Name: ');
                    const result = await this.am.findAll({ name });

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printAgent(result);
                    break;
                }

                case '3': {
                    const agency_name = rl.question('Agency: ');
                    const result = await this.am.findAll({ agency_name });

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printAgent(result);
                    break;
                }

                case '4': {
                    const data = {
                        _id: rl.question('Agent ID: '),
                        name: rl.question('Name: '),
                        phone: rl.question('Phone: '),
                        email: rl.question('Email: '),
                        agency_name: rl.question('Agency: '),
                        whatsapp: rl.question('Whatsapp: ')
                    };

                    await this.am.insertOne(data);

                    printMessage('Agent berhasil ditambah');
                    break;
                }

                case '5': {
                    const id = rl.question('Agent ID: ');
                    const data = {};

                    const name = rl.question('New Name: ');
                    if (name) data.name = name;

                    const phone = rl.question('New Phone: ');
                    if (phone) data.phone = phone;

                    const email = rl.question('New Email: ');
                    if (email) data.email = email;

                    const agency_name = rl.question('New Agency: ');
                    if (agency_name) data.agency_name = agency_name;

                    const whatsapp = rl.question('New Whatsapp: ');
                    if (whatsapp) data.whatsapp = whatsapp;

                    await this.am.update(id, data);

                    printMessage('Agent berhasil diupdate');
                    break;
                }

                case '6': {
                    const id = rl.question('Agent ID: ');

                    await this.am.delete(id);

                    printMessage('Agent berhasil dihapus');
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

module.exports = AgentMenu;