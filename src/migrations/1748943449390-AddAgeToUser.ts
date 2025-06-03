import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeToUser1748943449390 implements MigrationInterface {
    name = 'AddAgeToUser1748943449390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
    }

}
