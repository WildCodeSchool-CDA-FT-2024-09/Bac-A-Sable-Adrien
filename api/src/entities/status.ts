import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString } from "class-validator";
import { Repo } from "./repos";

@Entity()
export class Statu extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  label: string;

  @OneToMany(() => Repo, (repo) => repo.isPrivate)
  repos?: Repo[];
}
