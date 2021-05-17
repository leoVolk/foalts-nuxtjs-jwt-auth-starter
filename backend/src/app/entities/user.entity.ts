import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { hashPassword } from "@foal/core";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  async setPassword(password: string) {
    this.password = await hashPassword(password);
  }
}
