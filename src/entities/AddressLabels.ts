import { Column, Entity, Index } from "typeorm";

@Index("address_labels_pkey", ["address"], { unique: true })
@Entity("address_labels", { schema: "public" })
export class AddressLabels {
    @Column("bytea", { primary: true, name: "address" })
    address: Buffer;

    @Column("text", { name: "name", nullable: true })
    name: string | null;
}
