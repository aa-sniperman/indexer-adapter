import { Address } from "@ton/core";

export type StonFiPoolData = {
    reserve0: number;
    reserve1: number;
    token0_address: Address;
    token1_address: Address;
    lp_fee: number;
    protocol_fee: number;
    ref_fee: number;
    protocol_fee_address: Address;
    collected_token0_protocol_fee: number;
    collected_token1_protocol_fee: number;
};