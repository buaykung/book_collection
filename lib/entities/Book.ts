import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("book_pk", ["id"], { unique: true })
@Entity("book", { schema: "bookcollection" })
export class Book {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "users_id" })
  usersId: number;

  @Column("character varying", { name: "book_name", nullable: true })
  bookName: string | null;

  @Column("character varying", { name: "author_name", nullable: true })
  authorName: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @Column("integer", { name: "created_by", nullable: true })
  createdBy: number | null;

  @Column("integer", { name: "updated_by", nullable: true })
  updatedBy: number | null;
}
