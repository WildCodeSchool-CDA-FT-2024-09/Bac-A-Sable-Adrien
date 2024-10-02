import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString } from "class-validator";
import { Repo } from "./repos";

@Entity()
export class Lang extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  label: string;

  @ManyToMany(() => Repo, (repo) => repo.langs)
  repos?: Repo[];
}
