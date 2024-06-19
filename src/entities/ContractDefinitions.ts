import { Column, Entity, Index } from "typeorm";

@Index("contract_definitions_pkey", ["name"], { unique: true })
@Entity("contract_definitions", { schema: "public" })
export class ContractDefinitions {
    @Column("text", { primary: true, name: "name" })
    name: string;

    @Column("jsonb", { name: "schema" })
    schema: object;
}
