"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    port: parseInt(process.env.PORT || '4000', 10),
    env: process.env.NODE_ENV || 'development',
    redisUrl: process.env.REDIS_URL || '',
    llm: {
        type: process.env.LLM_BACKEND_TYPE || 'internal',
        baseUrl: process.env.LLM_BASE_URL || 'http://localhost:11434',
        apiKey: process.env.LLM_API_KEY || '',
        modelName: process.env.LLM_MODEL_NAME || 'senkron-nsosyal-v1',
    },
    ffmpeg: {
        maxWasmFileSizeMb: 50,
        maxWasmDurationSec: 60,
        maxServerFileSizeMb: 2048,
    },
};
