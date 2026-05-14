function printProperty(data = []) {
    data.forEach((item, index) => {
        console.log(`
${index + 1}. ${item._id}
Title            : ${item.title}
Price            : ${item.price_idr}
Bedrooms         : ${item.bedrooms}
Bathrooms        : ${item.bathrooms}
Garage           : ${item.garage}
Land Size        : ${item.land_size_m2}
Building Size    : ${item.building_size_m2}
Status           : ${item.status}
Location ID      : ${item.loc_id}
Agent ID         : ${item.agent_id}
`);
    });
}

function printPropertyDetail(data = []) {
    data.forEach((item, index) => {
        console.log(`
${index + 1}. ${item._id}

=== PROPERTY ===
Title            : ${item.title}
Price            : ${item.price_idr}
Bedrooms         : ${item.bedrooms}
Bathrooms        : ${item.bathrooms}
Garage           : ${item.garage}
Land Size        : ${item.land_size_m2}
Building Size    : ${item.building_size_m2}
Status           : ${item.status}

=== LOCATION ===
City             : ${item.location.city}
District         : ${item.location.district}
Province         : ${item.location.province}

=== AGENT ===
Name             : ${item.agent.name}
Agency           : ${item.agent.agency_name}
Phone            : ${item.agent.phone}
Whatsapp         : ${item.agent.whatsapp}
Email            : ${item.agent.email}
`);
    });
}

function printLocation(data = []) {
    data.forEach((item, index) => {
        console.log(`
${index + 1}. ${item._id}
City             : ${item.city}
District         : ${item.district}
Province         : ${item.province}
`);
    });
}

function printAgent(data = []) {
    data.forEach((item, index) => {
        console.log(`
${index + 1}. ${item._id}
Name             : ${item.name}
Agency           : ${item.agency_name}
Phone            : ${item.phone}
Whatsapp         : ${item.whatsapp}
Email            : ${item.email}
`);
    });
}

function printDistrictRanking(data = []) {
    data.forEach((item, index) => {
        console.log(`
${index + 1}. ${item._id}
Average Price/m2 : ${Math.round(item.avg_price_per_m2)}
Total Listing    : ${item.total}
`);
    });
}

function printPriceDistribution(data = []) {
    data.forEach((item, index) => {
        console.log(`
${index + 1}. Range ${item._id}
Total Listing    : ${item.total}
Average Price    : ${Math.round(item.avg_price)}
`);
    });
}

function printDistrictComparison(data = []) {
    data.forEach((item, index) => {
        console.log(`
${index + 1}. ${item._id}
Average Price    : ${Math.round(item.avg_price)}
Maximum Price    : ${item.max_price}
Minimum Price    : ${item.min_price}
Total Listing    : ${item.total_listing}
`);
    });
}

function printAgentRanking(data = []) {
    data.forEach((item, index) => {
        console.log(`
${index + 1}. ${item.name}
Agent ID         : ${item._id}
Total Sold       : ${item.total_sold}
`);
    });
}

function printMessage(message = '') {
    console.log(`
================================
${message}
================================
`);
}

function printEmpty() {
    console.log(`
================================
Data tidak ditemukan
================================
`);
}

module.exports = {
    printProperty,
    printPropertyDetail,
    printLocation,
    printAgent,
    printDistrictRanking,
    printPriceDistribution,
    printDistrictComparison,
    printAgentRanking,
    printMessage,
    printEmpty
};