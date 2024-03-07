import { MigrationInterface, QueryRunner } from "typeorm";

export class ItemTable1709838364390 implements MigrationInterface {
    name = 'ItemTable1709838364390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "item" ("id" integer NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "rank" integer NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pull" ALTER COLUMN "itemId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "FK_bbc86f10898ba05f98e414b05b9" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "FK_bbc86f10898ba05f98e414b05b9"`);
        await queryRunner.query(`ALTER TABLE "pull" ALTER COLUMN "itemId" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "item"`);
    }

}
