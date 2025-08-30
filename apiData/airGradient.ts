export interface AirGradient {
    locationId: number;
    locationName: string;
    publicLocationName: string;
    latitude: number;
    longitude: number;
    offline: boolean;
    pm01: number;
    pm02: number;
    pm10: number;
    pm003Count: number;
    atmp: number;
    rhum: number;
    rco2: number;
    tvoc: number;
    wifi: number;
    timestamp: string;
    tvocIndex: number;
    noxIndex: number;
    heatindex: number;
    publicPlaceName: string | null;
    publicPlaceUrl: string | null;
    publicContributorName: string | null;
    timezone: string;
    model: string;
    firmwareVersion: string;
}

export async function airGradientData() {
    try {
        const result: Response = await fetch(
            "https://api.airgradient.com/public/api/v1/world/locations/measures/current",
            {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "GET",
            }
        );

        const data: AirGradient[] = await result.json();
        return data;
    } catch (error) {
        console.log("Failed to fetch: " + error)
        throw error;
    }
}