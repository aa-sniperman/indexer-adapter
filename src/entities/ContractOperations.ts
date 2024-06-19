import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ContractInterfaces } from "./ContractInterfaces";

@Index("contract_interfaces_uniq_name", ["contractName", "operationName"], {
    unique: true
})
@Index("contract_operations_pkey", ["contractName", "operationId", "outgoing"], { unique: true })
@Entity("contract_operations", { schema: "public" })
export class ContractOperations {
    @Column("character varying", {
        name: "operation_name",
        nullable: true,
        unique: true
    })
    operationName: string | null;

    @Column("character varying", { primary: true, name: "contract_name" })
    contractName: string;

    @Column("enum", {
        name: "message_type",
        enum: ["EXTERNAL_IN", "EXTERNAL_OUT", "INTERNAL"]
    })
    messageType: "EXTERNAL_IN" | "EXTERNAL_OUT" | "INTERNAL";

    @Column("boolean", { primary: true, name: "outgoing" })
    outgoing: boolean;

    @Column("integer", { primary: true, name: "operation_id" })
    operationId: number;

    @Column("jsonb", { name: "schema", nullable: true })
    schema: object | null;

    @ManyToOne(() => ContractInterfaces, (contractInterfaces) => contractInterfaces.contractOperations)
    @JoinColumn([{ name: "contract_name", referencedColumnName: "name" }])
    contractName2: ContractInterfaces;
}
