import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Repo } from "../entities/repos";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Statu extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @OneToMany(() => Repo, (repo) => repo.status)
  repos?: Repo[];
}
