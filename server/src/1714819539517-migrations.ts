import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1714819539517 implements MigrationInterface {
    name = 'Migrations1714819539517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "FK_44cfb56ecfa3c8ac09ec5ea2c62"`);
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "FK_bbc86f10898ba05f98e414b05b9"`);
        await queryRunner.query(`ALTER TABLE "game_account" DROP CONSTRAINT "FK_0671ca6673c117aba89807a0ac4"`);
        await queryRunner.query(`DROP INDEX "public"."user_primary_idx"`);
        await queryRunner.query(`DROP INDEX "public"."pull_itemid_foreign_idx"`);
        await queryRunner.query(`DROP INDEX "public"."pull_primary_idx"`);
        await queryRunner.query(`DROP INDEX "public"."item_primary_idx"`);
        await queryRunner.query(`DROP INDEX "public"."game_account_primary_idx"`);
        await queryRunner.query(`DROP INDEX "public"."banner_primary_idx"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "creationdate"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "pull_id_seq" OWNED BY "pull"."id"`);
        await queryRunner.query(`ALTER TABLE "pull" ALTER COLUMN "id" SET DEFAULT nextval('"pull_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "FK_bbc86f10898ba05f98e414b05b9" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "FK_44cfb56ecfa3c8ac09ec5ea2c62" FOREIGN KEY ("bannerId") REFERENCES "banner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game_account" ADD CONSTRAINT "FK_0671ca6673c117aba89807a0ac4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game_account" DROP CONSTRAINT "FK_0671ca6673c117aba89807a0ac4"`);
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "FK_44cfb56ecfa3c8ac09ec5ea2c62"`);
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "FK_bbc86f10898ba05f98e414b05b9"`);
        await queryRunner.query(`ALTER TABLE "pull" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "pull_id_seq"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "creationdate" TIMESTAMP`);
        await queryRunner.query(`CREATE INDEX "banner_primary_idx" ON "banner" ("id") `);
        await queryRunner.query(`CREATE INDEX "game_account_primary_idx" ON "game_account" ("id") `);
        await queryRunner.query(`CREATE INDEX "item_primary_idx" ON "item" ("id") `);
        await queryRunner.query(`CREATE INDEX "pull_primary_idx" ON "pull" ("id") `);
        await queryRunner.query(`CREATE INDEX "pull_itemid_foreign_idx" ON "pull" ("itemId") `);
        await queryRunner.query(`CREATE INDEX "user_primary_idx" ON "user" ("id") `);
        await queryRunner.query(`ALTER TABLE "game_account" ADD CONSTRAINT "FK_0671ca6673c117aba89807a0ac4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "FK_bbc86f10898ba05f98e414b05b9" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "FK_44cfb56ecfa3c8ac09ec5ea2c62" FOREIGN KEY ("bannerId") REFERENCES "banner"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
