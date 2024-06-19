import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("bun_migration_locks_pkey", ["id"], { unique: true })
@Index("bun_migration_locks_table_name_key", ["tableName"], { unique: true })
@Entity("bun_migration_locks", { schema: "public" })
export class BunMigrationLocks {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
    id: string;

    @Column("character varying", {
        name: "table_name",
        nullable: true,
        unique: true
    })
    tableName: string | null;
}
