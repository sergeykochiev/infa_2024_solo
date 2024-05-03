import { MigrationInterface, QueryRunner } from "typeorm";

export class Pull1714406704388 implements MigrationInterface {
    name = 'Pull1714406704388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "PK_d25e988445e4493d39c34db02ab"`);
        await queryRunner.query(`ALTER TABLE "pull" RENAME COLUMN "id" TO "gameId"`);
        await queryRunner.query(`ALTER TABLE "pull" ADD "id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "new_primary_key" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "new_primary_key"`);
        await queryRunner.query(`ALTER TABLE "pull" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "pull" RENAME COLUMN "gameId" TO "id`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "PK_d25e988445e4493d39c34db02ab" PRIMARY KEY ("id")`);
    }

}
