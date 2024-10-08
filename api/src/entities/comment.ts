import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString } from "class-validator";
import { Repo } from "./repos";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  repos_id: string;

  @Column()
  @IsString()
  comment: string;

  @ManyToOne(() => Repo, (repo) => repo.id)
  repos?: Repo;
}
