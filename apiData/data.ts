import {airGradientData} from "./airGradient";
import {sensorCommunityData} from "./sensorCommunity";

function round(decimalPlace: number, latitude: number, longitude: number): [number, number] {
    if ((latitude !== null || !isNaN(latitude)) && (longitude !== null || !isNaN(longitude))) {
        const factor: number = Math.pow(10, decimalPlace);
        latitude = Math.round(latitude * factor) / factor;
        longitude = Math.round(longitude * factor) / factor;
    }
    return [latitude, longitude];
}

async function standardizeData(): Promise<Map<string, any[]>> {

    let standardizedData: Map<string, any[]> = new Map();
    const [sensorCommunity, airGradient] = await Promise.all([sensorCommunityData(), airGradientData()]);


    sensorCommunity.forEach(sensor  => {
        const [latitude, longitude] = round(2,
            parseFloat(sensor.location.latitude),
            parseFloat(sensor.location.longitude))
        const key = `${latitude},${longitude}`;

        if (!standardizedData.has(key)) {
            standardizedData.set(key, []);
        }

        standardizedData.get(key)!.push(sensor);
    });

    airGradient.forEach(sensor => {
        const [latitude, longitude] = round(2,
            sensor.latitude,
            sensor.longitude)
        const key = `${latitude},${longitude}`;


        if (!standardizedData.has(key)) {
            standardizedData.set(key, []);
        }

        standardizedData.get(key)!.push(sensor);
    })

    return standardizedData;
}

standardizeData().then((map: Map<string, any[]>) => {
    console.log(map);
})