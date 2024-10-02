import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Min, Max, IsString } from "class-validator";
import { Statu } from "./status";
import { Lang } from "./langs";

@Entity()
export class Repo extends BaseEntity {
  @PrimaryColumn()
  @IsString()
  id: string;

  @ManyToOne(() => Statu, (statu) => statu.id)
  @Min(1)
  @Max(3)
  isPrivate: Statu;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  url: string;

  @ManyToMany(() => Lang, (lang) => lang.repos)
  @JoinTable()
  langs: Lang[];
}
