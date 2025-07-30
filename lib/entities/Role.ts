import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Index("role_pk", ["id"], { unique: true })
@Entity("role", { schema: "bookcollection" })
export class Role {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "users_id" })
  usersId: number;

  @OneToOne(() => Users, (user) => user.role, { onDelete: "CASCADE" })
  @JoinColumn({ name: "users_id" })
  user: Users;

  @Column("character varying", { name: "name", nullable: true })
  name: string | null;

  @Column("enum", { name: "role", nullable: true, enum: ["admin", "author"] })
  role: "admin" | "author" | null;

}
