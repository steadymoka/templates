import { Field, GraphQLEntity } from "graphity"
import { GraphQLString, GraphQLInt } from "graphql"
import { Column, Entity, HashKey, GeneratedValue, Index } from "dynamom"


@Entity({
  name: process.env.NODE_ENV === "dev"
    ? "..user"
    : "user",
})
@Index<User>({ name: "index__social_id", hash: ["socialId"], range: ["updatedAt"] })
@GraphQLEntity()
export class User {

  @Column()
  @Field(type => GraphQLString)
  @HashKey() @GeneratedValue({ strategy: "uuid" })
  public id!: string

  @Column()
  @Field(type => GraphQLString)
  public name!: string | null

  @Column()
  @Field(type => GraphQLString)
  public email!: string | null

  @Column()
  @Field(type => GraphQLString)
  public image!: string | null

  @Column()
  public token!: string | null

  @Column({ name: "social_id" })
  public socialId!: string | null

  @Column({ name: "social_type" })
  public socialType!: string | null

  @Column({ name: "created_at" })
  @Field(type => GraphQLInt)
  public createdAt!: number

  @Column({ name: "updated_at" })
  @Field(type => GraphQLInt)
  public updatedAt!: number

}
