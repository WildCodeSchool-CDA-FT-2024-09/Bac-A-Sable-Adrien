import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { Min, Max, IsString } from "class-validator";

@Entity()
export class Repo extends BaseEntity {
  @PrimaryColumn()
  @IsString()
  id: string;

  @Column()
  @Min(1)
  @Max(2)
  isPrivate: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  url: string;
}
