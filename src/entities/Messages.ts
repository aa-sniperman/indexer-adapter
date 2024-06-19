import { Column, Entity, Index } from "typeorm";

@Index("messages_created_lt_idx", ["createdLt"], {})
@Index("messages_src_address_created_lt_idx", ["createdLt", "srcAddress"], {
    unique: true
})
@Index("messages_dst_address_idx", ["dstAddress"], {})
@Index("messages_dst_contract_idx", ["dstContract"], {})
@Index("messages_pkey", ["hash"], { unique: true })
@Index("messages_operation_id_idx", ["operationId"], {})
@Index("messages_operation_name_idx", ["operationName"], {})
@Index("messages_src_address_idx", ["srcAddress"], {})
@Index("messages_src_address_src_tx_lt_idx", ["srcAddress", "srcTxLt"], {})
@Index("messages_src_contract_idx", ["srcContract"], {})
@Entity("messages", { schema: "public" })
export class Messages {
    @Column("enum", {
        name: "type",
        enum: ["EXTERNAL_IN", "EXTERNAL_OUT", "INTERNAL"]
    })
    type: "EXTERNAL_IN" | "EXTERNAL_OUT" | "INTERNAL";

    @Column("bytea", { primary: true, name: "hash" })
    hash: Buffer;

    @Column("bytea", { name: "src_address", nullable: true })
    srcAddress: Buffer | null;

    @Column("bigint", { name: "src_tx_lt", nullable: true })
    srcTxLt: string | null;

    @Column("integer", { name: "src_workchain" })
    srcWorkchain: number;

    @Column("bigint", { name: "src_shard" })
    srcShard: string;

    @Column("integer", { name: "src_block_seq_no" })
    srcBlockSeqNo: number;

    @Column("bytea", { name: "dst_address", nullable: true })
    dstAddress: Buffer | null;

    @Column("bigint", { name: "dst_tx_lt", nullable: true })
    dstTxLt: string | null;

    @Column("integer", { name: "dst_workchain" })
    dstWorkchain: number;

    @Column("bigint", { name: "dst_shard" })
    dstShard: string;

    @Column("integer", { name: "dst_block_seq_no" })
    dstBlockSeqNo: number;

    @Column("boolean", { name: "bounce" })
    bounce: boolean;

    @Column("boolean", { name: "bounced" })
    bounced: boolean;

    @Column("numeric", { name: "amount", nullable: true })
    amount: string | null;

    @Column("boolean", { name: "ihr_disabled" })
    ihrDisabled: boolean;

    @Column("numeric", { name: "ihr_fee", nullable: true })
    ihrFee: string | null;

    @Column("numeric", { name: "fwd_fee", nullable: true })
    fwdFee: string | null;

    @Column("bytea", { name: "body", nullable: true })
    body: Buffer | null;

    @Column("bytea", { name: "body_hash", nullable: true })
    bodyHash: Buffer | null;

    @Column("integer", { name: "operation_id", nullable: true })
    operationId: number | null;

    @Column("character varying", { name: "transfer_comment", nullable: true })
    transferComment: string | null;

    @Column("bytea", { name: "state_init_code", nullable: true })
    stateInitCode: Buffer | null;

    @Column("bytea", { name: "state_init_data", nullable: true })
    stateInitData: Buffer | null;

    @Column("character varying", { name: "src_contract", nullable: true })
    srcContract: string | null;

    @Column("character varying", { name: "dst_contract", nullable: true })
    dstContract: string | null;

    @Column("character varying", { name: "operation_name", nullable: true })
    operationName: string | null;

    @Column("jsonb", { name: "data_json", nullable: true })
    dataJson: object | null;

    @Column("character varying", { name: "error", nullable: true })
    error: string | null;

    @Column("timestamp without time zone", { name: "created_at" })
    createdAt: Date;

    @Column("bigint", { name: "created_lt" })
    createdLt: string;
}
