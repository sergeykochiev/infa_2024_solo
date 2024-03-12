import { MigrationInterface, QueryRunner } from "typeorm";

export class Banner1710273832399 implements MigrationInterface {
    name = 'Banner1710273832399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pull" ("id" bigint NOT NULL, "timestamp" TIMESTAMP NOT NULL, "gameAccountId" integer, "itemId" integer, "bannerId" integer, CONSTRAINT "PK_d25e988445e4493d39c34db02ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."item_type_enum" AS ENUM('Character', 'Light Cone')`);
        await queryRunner.query(`CREATE TYPE "public"."item_rank_enum" AS ENUM('3', '4', '5')`);
        await queryRunner.query(`CREATE TABLE "item" ("id" integer NOT NULL, "name" character varying NOT NULL, "type" "public"."item_type_enum" NOT NULL, "rank" "public"."item_rank_enum" NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game_account" ("id" SERIAL NOT NULL, "uid" integer NOT NULL, "userId" integer, CONSTRAINT "PK_f8b2a59999f721d451269fac3b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."banner_type_enum" AS ENUM('1', '11', '12')`);
        await queryRunner.query(`CREATE TABLE "banner" ("id" integer NOT NULL, "name" character varying, "type" "public"."banner_type_enum" NOT NULL, CONSTRAINT "PK_6d9e2570b3d85ba37b681cd4256" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_banners_banner" ("itemId" integer NOT NULL, "bannerId" integer NOT NULL, CONSTRAINT "PK_6ec1e93421bdf04a06cc9f57015" PRIMARY KEY ("itemId", "bannerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9ab60b5eef2c3c025113edef67" ON "item_banners_banner" ("itemId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7024b6ee879dbb189b584f39fc" ON "item_banners_banner" ("bannerId") `);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "FK_cd6dbdf085e9fcee6e5b5ab6c94" FOREIGN KEY ("gameAccountId") REFERENCES "game_account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "FK_bbc86f10898ba05f98e414b05b9" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "FK_44cfb56ecfa3c8ac09ec5ea2c62" FOREIGN KEY ("bannerId") REFERENCES "banner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game_account" ADD CONSTRAINT "FK_0671ca6673c117aba89807a0ac4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_banners_banner" ADD CONSTRAINT "FK_9ab60b5eef2c3c025113edef670" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "item_banners_banner" ADD CONSTRAINT "FK_7024b6ee879dbb189b584f39fcc" FOREIGN KEY ("bannerId") REFERENCES "banner"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_banners_banner" DROP CONSTRAINT "FK_7024b6ee879dbb189b584f39fcc"`);
        await queryRunner.query(`ALTER TABLE "item_banners_banner" DROP CONSTRAINT "FK_9ab60b5eef2c3c025113edef670"`);
        await queryRunner.query(`ALTER TABLE "game_account" DROP CONSTRAINT "FK_0671ca6673c117aba89807a0ac4"`);
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "FK_44cfb56ecfa3c8ac09ec5ea2c62"`);
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "FK_bbc86f10898ba05f98e414b05b9"`);
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "FK_cd6dbdf085e9fcee6e5b5ab6c94"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7024b6ee879dbb189b584f39fc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9ab60b5eef2c3c025113edef67"`);
        await queryRunner.query(`DROP TABLE "item_banners_banner"`);
        await queryRunner.query(`DROP TABLE "banner"`);
        await queryRunner.query(`DROP TYPE "public"."banner_type_enum"`);
        await queryRunner.query(`DROP TABLE "game_account"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TYPE "public"."item_rank_enum"`);
        await queryRunner.query(`DROP TYPE "public"."item_type_enum"`);
        await queryRunner.query(`DROP TABLE "pull"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
