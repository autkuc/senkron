export declare const config: {
    port: number;
    env: string;
    redisUrl: string;
    llm: {
        type: "internal" | "external";
        baseUrl: string;
        apiKey: string;
        modelName: string;
    };
    ffmpeg: {
        maxWasmFileSizeMb: number;
        maxWasmDurationSec: number;
        maxServerFileSizeMb: number;
    };
};
