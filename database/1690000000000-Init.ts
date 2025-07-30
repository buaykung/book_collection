import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1690000000000 implements MigrationInterface {
  name = 'Init1690000000000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR(100) UNIQUE NOT NULL,
        "password" VARCHAR NOT NULL,
        "name" VARCHAR NOT NULL,
        "created_at" TIMESTAMPTZ DEFAULT now(),
        "updated_at" TIMESTAMPTZ,
        "deleted_at" TIMESTAMPTZ,
        "created_by" INT,
        "updated_by" INT
      );
      CREATE TABLE "role" (
        "id" SERIAL PRIMARY KEY,
        "users_id" INT UNIQUE,
        "role" VARCHAR NOT NULL
      );
      CREATE TABLE "book" (
        "id" SERIAL PRIMARY KEY,
        "users_id" INT,
        "book_name" VARCHAR NOT NULL,
        "author_name" VARCHAR NOT NULL,
        "created_at" TIMESTAMPTZ DEFAULT now(),
        "updated_at" TIMESTAMPTZ,
        "deleted_at" TIMESTAMPTZ,
        "created_by" INT,
        "updated_by" INT
      );
      ALTER TABLE "role" ADD CONSTRAINT "fk_role_user" FOREIGN KEY("users_id") REFERENCES "users"("id");
      ALTER TABLE "book" ADD CONSTRAINT "fk_book_user" FOREIGN KEY("users_id") REFERENCES "users"("id");
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "book";
      DROP TABLE "role";
      DROP TABLE "users";
    `)
  }
}