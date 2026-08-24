"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("graphql-http/lib/use/express");
const env_1 = require("./config/env");
const video_router_1 = require("./routers/video.router");
const ai_router_1 = require("./routers/ai.router");
const quota_router_1 = require("./routers/quota.router");
const schema_1 = require("./graphql/schema");
const resolvers_1 = require("./graphql/resolvers");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// REST Routers
exports.app.use('/api/video', video_router_1.videoRouter);
exports.app.use('/api/ai', ai_router_1.aiRouter);
exports.app.use('/api/quota', quota_router_1.quotaRouter);
// Health check
exports.app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'senkron-backend',
        env: env_1.config.env,
        timestamp: new Date().toISOString(),
    });
});
// GraphQL Endpoint
exports.app.all('/graphql', (0, express_2.createHandler)({
    schema: schema_1.graphqlSchema,
    rootValue: resolvers_1.graphqlResolvers,
}));
if (process.env.NODE_ENV !== 'test') {
    exports.app.listen(env_1.config.port, () => {
        console.log(`⚡ Senkron Backend running at http://localhost:${env_1.config.port}`);
        console.log(` GraphQL Endpoint: http://localhost:${env_1.config.port}/graphql`);
    });
}
