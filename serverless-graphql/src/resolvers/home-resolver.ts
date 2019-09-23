import { GraphQLResolver, Query } from "graphity"
import { GraphQLString, GraphQLObjectType, GraphQLNonNull } from "graphql"

const pkg = require("../../package.json") // eslint-disable-line

@GraphQLResolver(() => GraphQLObjectType)
export class HomeResolver {

  @Query({
    returns: () => new GraphQLObjectType({
      name: "info",
      fields: {
        version: { type: GraphQLNonNull(GraphQLString) },
        node_env: { type: GraphQLNonNull(GraphQLString) },
      },
    }),
  })
  public info() {
    return {
      version: pkg.version,
      node_env: process.env.NODE_ENV,
    }
  }

}
