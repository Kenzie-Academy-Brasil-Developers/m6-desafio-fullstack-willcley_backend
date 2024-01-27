import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1706368243460 implements MigrationInterface {
    name = 'CreateTables1706368243460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullname" character varying(50) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "phones" json NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullname" character varying(50) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "emails" json NOT NULL, "phones" json NOT NULL, "clientId" uuid, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "password" character varying(120) NOT NULL, "clientId" uuid, CONSTRAINT "UQ_3cbf51004f0706ac67ff8c22dbf" UNIQUE ("email"), CONSTRAINT "PK_a54dcebef8d05dca7e839749571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_8039454fab552403d5579cf7423" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emails" ADD CONSTRAINT "FK_1e6847fb0976153891bc666015f" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emails" DROP CONSTRAINT "FK_1e6847fb0976153891bc666015f"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_8039454fab552403d5579cf7423"`);
        await queryRunner.query(`DROP TABLE "emails"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
