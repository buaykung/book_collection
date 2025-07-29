import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("users_pk", ["id"], { unique: true })
@Index("pass_unique", ["password"], { unique: true })
@Index("users_unique", ["username"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "username", unique: true, length: 100 })
  username: string;

  @Column("character varying", { name: "password", unique: true, length: 255 })
  password: string;

  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("timestamp with time zone", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @Column("integer", { name: "created_by", nullable: true })
  createdBy: number | null;

  @Column("integer", { name: "updated_by", nullable: true })
  updatedBy: number | null;

  @Column("character varying", { name: "name"})
  name: string;

}
