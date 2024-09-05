import { config } from "./config";

export const getSystemState = (): Promise<any | null> => {
    return fetch(config.DEVICE_URL + "/json/state", { method: "GET" })
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error fetching state: ", error);
            return null;
        });
};

export const getPresets = (): Promise<any[] | null> => {
    return fetch(config.DEVICE_URL + "/presets.json", { method: "GET" })
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error fetching presets: ", error);
            return null;
        });
};

export const getPalettes = (): Promise<any[] | null> => {
    return fetch(config.DEVICE_URL + "/json/pal.json", { method: "GET" })
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error fetching palettes: ", error);
            return null;
        });
};
