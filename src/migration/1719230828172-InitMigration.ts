import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1719230828172 implements MigrationInterface {
    name = 'InitMigration1719230828172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`stripeCustomerId\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`goals\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`start_date\` date NOT NULL, \`frequency\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`penalties\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` decimal(10,2) NOT NULL, \`penalty_date\` date NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`goal_id\` int NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`goals\` ADD CONSTRAINT \`FK_88b78010581f2d293699d064441\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`penalties\` ADD CONSTRAINT \`FK_2f53430a141da1a3daa6379cdd4\` FOREIGN KEY (\`goal_id\`) REFERENCES \`goals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`penalties\` ADD CONSTRAINT \`FK_e66d336be242cc6a462b3b3fbc5\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`penalties\` DROP FOREIGN KEY \`FK_e66d336be242cc6a462b3b3fbc5\``);
        await queryRunner.query(`ALTER TABLE \`penalties\` DROP FOREIGN KEY \`FK_2f53430a141da1a3daa6379cdd4\``);
        await queryRunner.query(`ALTER TABLE \`goals\` DROP FOREIGN KEY \`FK_88b78010581f2d293699d064441\``);
        await queryRunner.query(`DROP TABLE \`penalties\``);
        await queryRunner.query(`DROP TABLE \`goals\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
