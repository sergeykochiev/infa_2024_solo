import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1709733343438 implements MigrationInterface {
    name = 'Init1709733343438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pull" ("id" integer NOT NULL, "bannerId" integer NOT NULL, "itemId" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL, "gameAccountId" integer, CONSTRAINT "PK_d25e988445e4493d39c34db02ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game_account" ("id" SERIAL NOT NULL, "uid" integer NOT NULL, "userId" integer, CONSTRAINT "PK_f8b2a59999f721d451269fac3b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "FK_cd6dbdf085e9fcee6e5b5ab6c94" FOREIGN KEY ("gameAccountId") REFERENCES "game_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game_account" ADD CONSTRAINT "FK_0671ca6673c117aba89807a0ac4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game_account" DROP CONSTRAINT "FK_0671ca6673c117aba89807a0ac4"`);
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "FK_cd6dbdf085e9fcee6e5b5ab6c94"`);
        await queryRunner.query(`DROP TABLE "game_account"`);
        await queryRunner.query(`DROP TABLE "pull"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
