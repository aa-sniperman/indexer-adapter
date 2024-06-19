import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("bun_migrations_pkey", ["id"], { unique: true })
@Entity("bun_migrations", { schema: "public" })
export class BunMigrations {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
    id: string;

    @Column("character varying", { name: "name", nullable: true })
    name: string | null;

    @Column("bigint", { name: "group_id", nullable: true })
    groupId: string | null;

    @Column("timestamp with time zone", {
        name: "migrated_at",
        default: () => "CURRENT_TIMESTAMP"
    })
    migratedAt: Date;
}
