"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlSchema = void 0;
const graphql_1 = require("graphql");
exports.graphqlSchema = (0, graphql_1.buildSchema)(`
  type TokenUsage {
    promptTokens: Int!
    completionTokens: Int!
    totalTokens: Int!
  }

  type GenerationResult {
    content: String!
    hashtags: [String!]!
    characterCount: Int!
    maxCharacters: Int!
    modelUsed: String!
    tokenUsage: TokenUsage!
  }

  type VideoRouteDecision {
    strategy: String!
    reason: String!
    estimatedRenderTimeMs: Int!
    serverFallbackAvailable: Boolean!
  }

  type QuotaStatus {
    userId: String!
    isGuest: Boolean!
    tier: String!
    requestsPerMinuteLimit: Int!
    requestsRemaining: Int!
    dailyAllowance: Int!
    dailyRemaining: Int!
    resetSeconds: Int!
  }

  type Query {
    quotaStatus(userId: String!, isGuest: Boolean): QuotaStatus!
    videoRouteDecision(fileSizeBytes: Float!, durationSeconds: Float!): VideoRouteDecision!
  }

  type Mutation {
    generatePostDraft(topic: String!, tone: String, userId: String!, isGuest: Boolean): GenerationResult!
  }
`);
