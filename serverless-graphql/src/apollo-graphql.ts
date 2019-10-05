import "source-map-support/register"

import express from "express"
import cors from "cors"
import { ApolloServer } from "apollo-server-express"
import { createServer, proxy } from "aws-serverless-express"
import { APIGatewayEvent, Context } from "aws-lambda" // eslint-disable-line
import { parse } from "graphql"
import { createSchema } from "graphity"
import { createExpressAdapter } from "@graphity/restful"
import { Container } from "@graphity/container"
import { dynamom } from "./providers/dynamom-provider"
import { jwt } from "./providers/jwt-provider"
import { HomeResolver } from "./resolvers/home-resolver"
import { UserResolver } from "./resolvers/user-resolver"

const container = new Container()
container.setToGlobal()
container.register(dynamom)
container.register(jwt)

const app = express()

const schema = createSchema({
  resolvers: [
    HomeResolver,
    UserResolver,
  ],
  create: async (ctor) => {
    await container.boot()
    return container.create(ctor)
  },
})

const apollo = new ApolloServer({
  schema,
  context(ctx) {
    return {
      authorization: ctx.req.headers.authorization,
    }
  },
  formatError(error) {
    return {
      message: error.message,
      locations: error.locations,
      path: error.path,
    }
  },
})

apollo.applyMiddleware({ app })

app.use(cors())
app.use(createExpressAdapter(schema, {
  endpoints: [
    {
      method: "GET",
      path: "/",
      query: () => ({
        document: parse("query { info { version\nnode_env } }"),
      }),
    },
  ],
}))

const server = createServer(app)

export function graphql(event: APIGatewayEvent, ctx: Context) {
  proxy(server, event, ctx)
}
