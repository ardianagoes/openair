export interface location {
    id: number;
    latitude: string;
    longitude: string;
    altitude: string;
    country: string;
    exact_location: number;
    indoor: number;
}

export interface sensorModelType {
    id: number;
    name: string;
    manufacturer: string;
}

export interface sensorModel {
    id: number;
    pin: string;
    sensor_type: sensorModelType;
}

export interface sensorData {
    id: number;
    value: string;
    value_type: string;
}

export interface sensorCommunity {
    id: number;
    sampling_rate: string | null;
    timestamp: string;
    location: location;
    sensor: sensorModel;
    sensordatavalues: sensorData[];
}

export async function sensorCommunityData(){
    try {
        const result: Response = await fetch(
            "https://data.sensor.community/static/v2/data.json",
            {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "GET",
            }
        );

        const data: sensorCommunity[] = await result.json();
        return data;
    } catch (error) {
        console.log("Failed to fetch: " + error);
        throw error;
    }
}
