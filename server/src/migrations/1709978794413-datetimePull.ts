import { MigrationInterface, QueryRunner } from "typeorm";

export class DatetimePull1709978794413 implements MigrationInterface {
    name = 'DatetimePull1709978794413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "FK_cd6dbdf085e9fcee6e5b5ab6c94"`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "FK_cd6dbdf085e9fcee6e5b5ab6c94" FOREIGN KEY ("gameAccountId") REFERENCES "game_account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "FK_cd6dbdf085e9fcee6e5b5ab6c94"`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "FK_cd6dbdf085e9fcee6e5b5ab6c94" FOREIGN KEY ("gameAccountId") REFERENCES "game_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
