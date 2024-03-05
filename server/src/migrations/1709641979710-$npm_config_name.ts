import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1709641979710 implements MigrationInterface {
    name = ' $npmConfigName1709641979710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pull" ("id" integer NOT NULL, "bannerId" integer NOT NULL, "itemId" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL, CONSTRAINT "PK_d25e988445e4493d39c34db02ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game_account" ("id" SERIAL NOT NULL, "uid" integer NOT NULL, CONSTRAINT "PK_f8b2a59999f721d451269fac3b2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "game_account"`);
        await queryRunner.query(`DROP TABLE "pull"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
