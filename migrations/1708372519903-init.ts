import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1708372519903 implements MigrationInterface {
    name = 'Init1708372519903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "planet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "population" integer NOT NULL, "climate" character varying NOT NULL, "terrain" character varying NOT NULL, "currentLocationLat" double precision NOT NULL, "currentLocationLon" double precision NOT NULL, CONSTRAINT "PK_cb7506671ad0f19d6287ee4bfb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "character" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "species" character varying NOT NULL, "forceSensitive" boolean NOT NULL DEFAULT false, "currentLocationId" uuid, "starshipId" uuid, CONSTRAINT "PK_6c4aec48c564968be15078b8ae5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "starship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "model" character varying NOT NULL, "capacity" integer NOT NULL, "currentLocationLat" double precision NOT NULL, "currentLocationLon" double precision NOT NULL, CONSTRAINT "PK_398cab92a55d977f03881dda8e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "starship_enemies_starship" ("starshipId_1" uuid NOT NULL, "starshipId_2" uuid NOT NULL, CONSTRAINT "PK_93d0d06db45d21b5e4e7d66bb81" PRIMARY KEY ("starshipId_1", "starshipId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3e559afc37d4cfbc4d3400072e" ON "starship_enemies_starship" ("starshipId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_6db96925966d46e98774c6cc93" ON "starship_enemies_starship" ("starshipId_2") `);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "FK_a2dc3f6acc037c0e369072bc1da" FOREIGN KEY ("currentLocationId") REFERENCES "planet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "FK_6fb7a68d1a94e3fc1c21ab821ff" FOREIGN KEY ("starshipId") REFERENCES "starship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "starship_enemies_starship" ADD CONSTRAINT "FK_3e559afc37d4cfbc4d3400072ec" FOREIGN KEY ("starshipId_1") REFERENCES "starship"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starship_enemies_starship" ADD CONSTRAINT "FK_6db96925966d46e98774c6cc93f" FOREIGN KEY ("starshipId_2") REFERENCES "starship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "starship_enemies_starship" DROP CONSTRAINT "FK_6db96925966d46e98774c6cc93f"`);
        await queryRunner.query(`ALTER TABLE "starship_enemies_starship" DROP CONSTRAINT "FK_3e559afc37d4cfbc4d3400072ec"`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "FK_6fb7a68d1a94e3fc1c21ab821ff"`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "FK_a2dc3f6acc037c0e369072bc1da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6db96925966d46e98774c6cc93"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3e559afc37d4cfbc4d3400072e"`);
        await queryRunner.query(`DROP TABLE "starship_enemies_starship"`);
        await queryRunner.query(`DROP TABLE "starship"`);
        await queryRunner.query(`DROP TABLE "character"`);
        await queryRunner.query(`DROP TABLE "planet"`);
    }

}
