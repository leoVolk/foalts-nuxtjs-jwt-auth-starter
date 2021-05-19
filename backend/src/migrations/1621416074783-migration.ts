import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1621416074783 implements MigrationInterface {
    name = 'migration1621416074783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
