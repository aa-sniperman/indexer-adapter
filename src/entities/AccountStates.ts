import { Column, Entity, Index, OneToMany } from "typeorm";
import { LatestAccountStates } from "./LatestAccountStates";

@Index("account_states_pkey", ["address", "lastTxLt"], { unique: true })
@Index("account_states_address_idx", ["address"], {})
@Index("account_states_address_workchain_shard_block_seq_no_idx", ["address", "blockSeqNo", "shard", "workchain"], {
    unique: true
})
@Index("account_states_last_tx_hash_key", ["lastTxHash"], { unique: true })
@Index("account_states_last_tx_lt_idx", ["lastTxLt"], {})
@Index("account_states_minter_address_idx", ["minterAddress"], {})
@Index("account_states_owner_address_idx", ["ownerAddress"], {})
@Index("account_states_types_idx", ["types"], {})
@Entity("account_states", { schema: "public" })
export class AccountStates {
    @Column("bytea", { primary: true, name: "address" })
    address: Buffer;

    @Column("integer", { name: "workchain" })
    workchain: number;

    @Column("bigint", { name: "shard" })
    shard: string;

    @Column("integer", { name: "block_seq_no" })
    blockSeqNo: number;

    @Column("boolean", { name: "is_active", nullable: true })
    isActive: boolean | null;

    @Column("enum", {
        name: "status",
        nullable: true,
        enum: ["UNINIT", "ACTIVE", "FROZEN", "NON_EXIST"]
    })
    status: "UNINIT" | "ACTIVE" | "FROZEN" | "NON_EXIST" | null;

    @Column("numeric", { name: "balance", nullable: true })
    balance: string | null;

    @Column("bigint", { primary: true, name: "last_tx_lt" })
    lastTxLt: string;

    @Column("bytea", { name: "last_tx_hash", unique: true })
    lastTxHash: Buffer;

    @Column("bytea", { name: "state_hash", nullable: true })
    stateHash: Buffer | null;

    @Column("bytea", { name: "code", nullable: true })
    code: Buffer | null;

    @Column("bytea", { name: "code_hash", nullable: true })
    codeHash: Buffer | null;

    @Column("bytea", { name: "data", nullable: true })
    data: Buffer | null;

    @Column("bytea", { name: "data_hash", nullable: true })
    dataHash: Buffer | null;

    @Column("int4", { name: "get_method_hashes", nullable: true, array: true })
    getMethodHashes: number[] | null;

    @Column("text", { name: "types", nullable: true, array: true })
    types: string[] | null;

    @Column("bytea", { name: "owner_address", nullable: true })
    ownerAddress: Buffer | null;

    @Column("bytea", { name: "minter_address", nullable: true })
    minterAddress: Buffer | null;

    @Column("jsonb", { name: "executed_get_methods", nullable: true })
    executedGetMethods: object | null;

    @Column("character varying", { name: "content_uri", nullable: true })
    contentUri: string | null;

    @Column("character varying", { name: "content_name", nullable: true })
    contentName: string | null;

    @Column("character varying", { name: "content_description", nullable: true })
    contentDescription: string | null;

    @Column("character varying", { name: "content_image", nullable: true })
    contentImage: string | null;

    @Column("bytea", { name: "content_image_data", nullable: true })
    contentImageData: Buffer | null;

    @Column("numeric", { name: "jetton_balance", nullable: true })
    jettonBalance: string | null;

    @Column("timestamp without time zone", { name: "updated_at" })
    updatedAt: Date;

    @Column("boolean", { name: "fake", default: () => "false" })
    fake: boolean;

    @Column("bytea", { name: "libraries", nullable: true })
    libraries: Buffer | null;

    @OneToMany(() => LatestAccountStates, (latestAccountStates) => latestAccountStates.accountStates)
    latestAccountStates: LatestAccountStates[];
}
