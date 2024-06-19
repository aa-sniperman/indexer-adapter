import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("rescan_tasks_pkey", ["id"], { unique: true })
@Entity("rescan_tasks", { schema: "public" })
export class RescanTasks {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("boolean", { name: "finished" })
    finished: boolean;

    @Column("enum", {
        name: "type",
        enum: [
            "add_interface",
            "upd_interface",
            "del_interface",
            "add_get_method",
            "del_get_method",
            "upd_get_method",
            "upd_operation",
            "del_operation"
        ]
    })
    type:
        | "add_interface"
        | "upd_interface"
        | "del_interface"
        | "add_get_method"
        | "del_get_method"
        | "upd_get_method"
        | "upd_operation"
        | "del_operation";

    @Column("text", { name: "contract_name" })
    contractName: string;

    @Column("text", { name: "changed_get_methods", nullable: true, array: true })
    changedGetMethods: string[] | null;

    @Column("enum", {
        name: "message_type",
        nullable: true,
        enum: ["EXTERNAL_IN", "EXTERNAL_OUT", "INTERNAL"]
    })
    messageType: "EXTERNAL_IN" | "EXTERNAL_OUT" | "INTERNAL" | null;

    @Column("boolean", { name: "outgoing", nullable: true })
    outgoing: boolean | null;

    @Column("integer", { name: "operation_id", nullable: true })
    operationId: number | null;

    @Column("bytea", { name: "last_address", nullable: true })
    lastAddress: Buffer | null;

    @Column("bigint", { name: "last_tx_lt", nullable: true })
    lastTxLt: string | null;

    @Column("timestamp without time zone", { name: "updated_at" })
    updatedAt: Date;

    @Column("timestamp without time zone", { name: "created_at" })
    createdAt: Date;
}
