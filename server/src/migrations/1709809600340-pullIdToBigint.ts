import { MigrationInterface, QueryRunner } from "typeorm";

export class PullIdToBigint1709809600340 implements MigrationInterface {
    name = 'PullIdToBigint1709809600340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "PK_d25e988445e4493d39c34db02ab"`);
        await queryRunner.query(`ALTER TABLE "pull" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "pull" ADD "id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "PK_d25e988445e4493d39c34db02ab" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pull" DROP CONSTRAINT "PK_d25e988445e4493d39c34db02ab"`);
        await queryRunner.query(`ALTER TABLE "pull" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "pull" ADD "id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pull" ADD CONSTRAINT "PK_d25e988445e4493d39c34db02ab" PRIMARY KEY ("id")`);
    }

}
