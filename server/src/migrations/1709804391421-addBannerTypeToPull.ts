import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBannerTypeToPull1709804391421 implements MigrationInterface {
    name = 'AddBannerTypeToPull1709804391421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pull" ADD "bannerType" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pull" DROP COLUMN "bannerType"`);
    }

}
