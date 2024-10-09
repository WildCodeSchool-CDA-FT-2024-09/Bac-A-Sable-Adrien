import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { IsString } from "class-validator";
import { Repo } from "./repos";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType() // Decorator to make this class a GraphQL object type
@Entity()
export class Comment extends BaseEntity {
  @Field(() => ID) // Field for GraphQL ID type
  @PrimaryGeneratedColumn()
  id: number;

  @Field() // Simple string field in GraphQL
  @Column()
  @IsString()
  repos_id: string;

  @Field() // Simple string field for the comment content
  @Column()
  @IsString()
  comment: string;

  @Field(() => Repo) // The relation field for GraphQL
  @ManyToOne(() => Repo, (repo) => repo.comments, { nullable: false }) // Make this field non-nullable
  @JoinColumn({ name: "repos_id", referencedColumnName: "id" }) // Specify the foreign key relationship
  repos: Repo;
}
