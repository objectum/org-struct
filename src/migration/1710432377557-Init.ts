import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1710432377557 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`create table emp (
          id serial primary key,
          name varchar(255) not null,
          "parentId" integer,
          foreign key ("parentId") references emp(id) on update cascade on delete restrict
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('drop table emp')
    }
}
