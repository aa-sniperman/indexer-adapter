import { Address } from "@ton/core";
import { base64ToHex } from "./string";

export function castAddressToBuffer(address: Address) {
    const rawStr = address.toRawString().replace(":", "0");
    return Buffer.from(rawStr, "hex");
}

export function base64ToAddress(base64: string, workchain: number) {
    const rawAddress = workchain + ':' + base64ToHex(base64);
    return Address.parse(rawAddress);
}