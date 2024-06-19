import { Column, Entity, Index } from "typeorm";

@Index("transactions_address_idx", ["address"], {})
@Index("transactions_address_created_lt_idx", ["address", "createdLt"], {
    unique: true
})
@Index("transactions_workchain_shard_block_seq_no_idx", ["blockSeqNo", "shard", "workchain"], {})
@Index("transactions_created_lt_idx", ["createdLt"], {})
@Index("transactions_pkey", ["hash"], { unique: true })
@Index("transactions_in_msg_hash_idx", ["inMsgHash"], {})
@Entity("transactions", { schema: "public" })
export class Transactions {
    @Column("bytea", { name: "address", nullable: true })
    address: Buffer | null;

    @Column("bytea", { primary: true, name: "hash" })
    hash: Buffer;

    @Column("integer", { name: "workchain" })
    workchain: number;

    @Column("bigint", { name: "shard" })
    shard: string;

    @Column("integer", { name: "block_seq_no" })
    blockSeqNo: number;

    @Column("bytea", { name: "prev_tx_hash", nullable: true })
    prevTxHash: Buffer | null;

    @Column("bigint", { name: "prev_tx_lt", nullable: true })
    prevTxLt: string | null;

    @Column("bytea", { name: "in_msg_hash", nullable: true })
    inMsgHash: Buffer | null;

    @Column("numeric", { name: "in_amount" })
    inAmount: string;

    @Column("smallint", { name: "out_msg_count" })
    outMsgCount: number;

    @Column("numeric", { name: "out_amount" })
    outAmount: string;

    @Column("numeric", { name: "total_fees", nullable: true })
    totalFees: string | null;

    @Column("bytea", { name: "description" })
    description: Buffer;

    @Column("integer", { name: "compute_phase_exit_code" })
    computePhaseExitCode: number;

    @Column("integer", { name: "action_phase_result_code" })
    actionPhaseResultCode: number;

    @Column("enum", {
        name: "orig_status",
        enum: ["UNINIT", "ACTIVE", "FROZEN", "NON_EXIST"]
    })
    origStatus: "UNINIT" | "ACTIVE" | "FROZEN" | "NON_EXIST";

    @Column("enum", {
        name: "end_status",
        enum: ["UNINIT", "ACTIVE", "FROZEN", "NON_EXIST"]
    })
    endStatus: "UNINIT" | "ACTIVE" | "FROZEN" | "NON_EXIST";

    @Column("timestamp without time zone", { name: "created_at" })
    createdAt: Date;

    @Column("bigint", { name: "created_lt" })
    createdLt: string;
}
