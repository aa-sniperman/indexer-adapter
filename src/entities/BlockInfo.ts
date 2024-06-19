import { Column, Entity, Index } from "typeorm";

@Index("block_info_file_hash_key", ["fileHash"], { unique: true })
@Index("block_info_master_block_id_idx", ["masterSeqNo", "masterShard", "masterWorkchain"], {})
@Index("block_info_root_hash_key", ["rootHash"], { unique: true })
@Index("block_info_pkey", ["seqNo", "shard", "workchain"], { unique: true })
@Index("block_info_workchain_seq_no_idx", ["seqNo", "workchain"], {})
@Entity("block_info", { schema: "public" })
export class BlockInfo {
    @Column("integer", { primary: true, name: "workchain" })
    workchain: number;

    @Column("bigint", { primary: true, name: "shard" })
    shard: string;

    @Column("integer", { primary: true, name: "seq_no" })
    seqNo: number;

    @Column("bytea", { name: "file_hash", unique: true })
    fileHash: Buffer;

    @Column("bytea", { name: "root_hash", unique: true })
    rootHash: Buffer;

    @Column("integer", { name: "master_workchain", nullable: true })
    masterWorkchain: number | null;

    @Column("bigint", { name: "master_shard", nullable: true })
    masterShard: string | null;

    @Column("integer", { name: "master_seq_no", nullable: true })
    masterSeqNo: number | null;

    @Column("timestamp without time zone", { name: "scanned_at" })
    scannedAt: Date;
}
