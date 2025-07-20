import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("role_pk", ["id"], { unique: true })
@Entity("role", { schema: "public" })
export class Role {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "users_id" })
  usersId: number;

  @Column("character varying", { name: "name", nullable: true })
  name: string | null;

  @Column("enum", { name: "role", nullable: true, enum: ["admin", "author"] })
  role: "admin" | "author" | null;
}
