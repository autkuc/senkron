import express from 'express';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import { config } from './config/env';
import { videoRouter } from './routers/video.router';
import { aiRouter } from './routers/ai.router';
import { quotaRouter } from './routers/quota.router';
import { graphqlSchema } from './graphql/schema';
import { graphqlResolvers } from './graphql/resolvers';

export const app = express();

app.use(cors());
app.use(express.json());

// REST Routers
app.use('/api/video', videoRouter);
app.use('/api/ai', aiRouter);
app.use('/api/quota', quotaRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'senkron-backend',
    env: config.env,
    timestamp: new Date().toISOString(),
  });
});

// GraphQL Endpoint
app.all(
  '/graphql',
  createHandler({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
  })
);

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`⚡ Senkron Backend running at http://localhost:${config.port}`);
    console.log(` GraphQL Endpoint: http://localhost:${config.port}/graphql`);
  });
}
