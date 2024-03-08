import { MigrationInterface, QueryRunner } from "typeorm";

export class username1709908218802 implements MigrationInterface {
    name = 'username1709908218802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "login" TO "username"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" TO "UQ_78a916df40e02a9deb1c4b75edb"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" TO "UQ_a62473490b3e4578fd683235c5e"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "username" TO "login"`);
    }

}
