import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePemalty1719231060923 implements MigrationInterface {
    name = 'UpdatePemalty1719231060923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`penalties\` CHANGE \`penalty_date\` \`date\` date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`penalties\` CHANGE \`date\` \`penalty_date\` date NOT NULL`);
    }

}
