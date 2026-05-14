const rl = require('readline-sync');
const Database = require('./src/Database');
// const PropertyMenu = require('./src/menu_cli/PropertyMenu');
// const AnalyticsMenu = require('./src/menu_cli/AnalyticsMenu');
// const AgentMenu = require('./src/menu_cli/AgentMenu');
// const LocationMenu = require('./src/menu_cli/LocationMenu');
const mongodb = require('mongodb');

async function main() {
    // const db = new Database();
    // const pm = new PropertyMenu();
    // const anm = new AnalyticsMenu();
    // const agm = new AgentMenu();
    // const lm = new LocationMenu();
    // await db.connect();
    
    while (true) {
        console.clear()
        console.log('Jakarta Property Index Menu:\n1. Property Explorer\n2. Property Detail\n3. Market Analytics\n4. Data Management\n5. Exit');
        const pilih = await rl.question('Pilih menu: ');
        switch (pilih) {
            case '1':
                await pm.propertyExplorerMenu();
                break;

            case '2':
                await pm.propertyDetailMenu();
                break;

            case '3':
                await anm.analyticsMenu();
                break;

            case '4':
                while (true) {
                    console.clear();
                    console.log('Data Management Menu:\n1. Manage Property\n2. Manage Agent\n3. Manage Location\n4. Back');
                    const manage = rl.question('Pilih menu: ');

                    switch (manage) {
                        case '1':
                            await pm.managementMenu();
                            break;

                        case '2':
                            await agm.agentMenu();
                            break;

                        case '3':
                            await lm.locationMenu();
                            break;

                        case '4':
                            break;

                        default:
                            console.log('Menu tidak valid');
                        }

                        if (manage === '4'){
                            break;
                        }
                }
                break;

            case '5':
                console.log('Program selesai');
                process.exit();

            default:
                console.log('Menu tidak valid');

        }
        rl.question('Enter Untuk Kembali Ke Main Menu');

    }
}
main().catch(console.error);