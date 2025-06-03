import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeToUser1748943415892 implements MigrationInterface {
    name = 'AddAgeToUser1748943415892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
    }

}
