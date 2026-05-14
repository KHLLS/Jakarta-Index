const rl = require('readline-sync');
const Analytics = require('../feature/Analytics');
const {
    printDistrictRanking,
    printPriceDistribution,
    printDistrictComparison,
    printAgentRanking,
    printMessage,
    printEmpty
} = require('../Formatter');

class AnalyticsMenu {
    constructor() {
        this.an = new Analytics();
    }

    async analyticsMenu() {
        while (true) {
            console.clear();
            console.log(`
Market Analytics Menu:
1. District Ranking
2. Price Distribution
3. City Comparison
4. Agent Ranking
5. Back
`);
            const pilih = rl.question('Pilih menu: ');

            switch (pilih) {

                case '1': {
                    const result = await this.an.rankDistrict();

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printDistrictRanking(result);
                    break;
                }

                case '2': {
                    const result = await this.an.priceDistribution();

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printPriceDistribution(result);
                    break;
                }

                case '3': {
                    const result = await this.an.cityComparison();

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printDistrictComparison(result);
                    break;
                }

                case '4': {
                    const result = await this.an.rankAgent();

                    if (!result.length) {
                        printEmpty();
                        break;
                    }

                    printAgentRanking(result);
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

module.exports = AnalyticsMenu;