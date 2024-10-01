import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { IsString } from "class-validator";

@Entity()
export class Statu extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  @IsString()
  label: string;
}
