import { Column, Entity, Index, OneToMany } from "typeorm";
import { ContractOperations } from "./ContractOperations";

@Index("contract_interfaces_addresses_key", ["addresses"], { unique: true })
@Index("contract_interfaces_code_key", ["code"], { unique: true })
@Index("contract_interfaces_get_method_hashes_idx", ["getMethodHashes"], {
    unique: true
})
@Index("contract_interfaces_pkey", ["name"], { unique: true })
@Entity("contract_interfaces", { schema: "public" })
export class ContractInterfaces {
    @Column("character varying", { primary: true, name: "name" })
    name: string;

    @Column("bytea", {
        name: "addresses",
        nullable: true,
        unique: true,
        array: true
    })
    addresses: Buffer[] | null;

    @Column("bytea", { name: "code", nullable: true, unique: true })
    code: Buffer | null;

    @Column("text", { name: "get_methods_desc", nullable: true })
    getMethodsDesc: string | null;

    @Column("int4", { name: "get_method_hashes", nullable: true, array: true })
    getMethodHashes: number[] | null;

    @OneToMany(() => ContractOperations, (contractOperations) => contractOperations.contractName2)
    contractOperations: ContractOperations[];
}
