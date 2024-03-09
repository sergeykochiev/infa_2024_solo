import { MigrationInterface, QueryRunner } from "typeorm";

export class dupa1709985874275 implements MigrationInterface {
    name = 'dupa1709985874275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "FK_bbc86f10898ba05f98e414b05b9"`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "FK_bbc86f10898ba05f98e414b05b9" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "FK_bbc86f10898ba05f98e414b05b9"`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "FK_bbc86f10898ba05f98e414b05b9" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
