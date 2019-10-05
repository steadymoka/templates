import { GraphQLResolver, Query, GraphQLEdgesOf, GraphQLListOf, listOf } from "graphity"
import { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLNamedType, GraphQLInt } from "graphql"
import { User } from "../entities/user"

@GraphQLResolver(() => User)
export class UserResolver {

  public users: User[] = []

  @Query({
    returns: user => GraphQLListOf(user as GraphQLNamedType, "users"),
  })
  public getUsers() {
    return listOf(this.users)
  }

  @Query({
    input: {
      name: {
        type: GraphQLNonNull(GraphQLString),
      },
      email: {
        type: GraphQLString,
      },
    },
  })
  public createUser(parent: null, input: { name: string, email?: string | null }) {
    const user = Object.assign(new User(), {
      name: input.name,
      email: input.email || "",
    })
    this.users.push(user)
    return user
  }

}
