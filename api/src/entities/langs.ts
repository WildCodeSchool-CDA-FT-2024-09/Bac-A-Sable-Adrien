import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { IsString } from "class-validator";

@Entity()
export class Lang extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  @IsString()
  label: string;
}
