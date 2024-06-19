import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AccountStates } from "./AccountStates";

@Index("latest_account_states_pkey", ["address"], { unique: true })
@Index("latest_account_states_last_tx_lt_idx", ["lastTxLt"], {})
@Entity("latest_account_states", { schema: "public" })
export class LatestAccountStates {
    @Column("bytea", { primary: true, name: "address" })
    address: Buffer;

    @Column("bigint", { name: "last_tx_lt" })
    lastTxLt: string;

    @ManyToOne(() => AccountStates, (accountStates) => accountStates.latestAccountStates)
    @JoinColumn([
        { name: "address", referencedColumnName: "address" },
        { name: "last_tx_lt", referencedColumnName: "lastTxLt" }
    ])
    accountStates: AccountStates;
}
