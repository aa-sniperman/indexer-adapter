import { base64ToAddress } from "@/utils";
import { Address, external } from "@ton/core"
import { GeneralStateRecord, extractGeneralStateRecord } from "@/modules";
import { AccountStates } from "@/entities/AccountStates";

export enum DeDustAssetType {
    NATIVE = 0b0000,
    JETTON = 0b0001
}

export class DeDustAsset {
    readonly type: DeDustAssetType
    readonly address?: Address

    constructor(jsonData: any) {
        switch (jsonData.type) {
            case 'native': {
                this.type = DeDustAssetType.NATIVE;
                break;
            }
            case 'jetton': {
                this.type = DeDustAssetType.JETTON;
                this.address = base64ToAddress(jsonData.address, jsonData.workchain)
                break;
            }
            default: {
                throw new Error('Invalid Json data for DeDust asset')
            }
        }
    }
}

export interface DeDustPoolData {
    assets: [DeDustAsset, DeDustAsset],
    protocolFees: [number, number],
    reserves: [number, number],
    tradeFees: [number, number],
    version: number,
    isStable: boolean
}

export function extractDeDustPoolData(dedustV2Methods: {
    name: string, returns: any[]
}[]): DeDustPoolData {

    let assets: [DeDustAsset, DeDustAsset] | undefined = undefined;
    let protocolFees: [number, number] | undefined = undefined;
    let reserves: [number, number] | undefined = undefined;
    let tradeFees: [number, number] | undefined = undefined;
    let version: number | undefined = undefined;
    let isStable: boolean | undefined = undefined;

    for (const { name, returns } of dedustV2Methods) {
        switch (name) {
            case 'get_assets': {
                assets = [new DeDustAsset(returns[0]), new DeDustAsset(returns[1])]
                break;
            }
            case 'get_protocol_fees': {
                protocolFees = [returns[0], returns[1]]
                break;
            }
            case 'get_reserves': {
                reserves = [returns[0], returns[1]]
                break;
            }
            case 'get_trade_fee': {
                tradeFees = [returns[0], returns[1]]
                break;
            }
            case 'get_version': {
                version = returns[0]
                break;
            }
            case 'is_stable': {
                isStable = returns[0]
                break;
            }
        }
    }

    if (assets && protocolFees && reserves && tradeFees && version !== undefined && isStable !== undefined) {
        const data: DeDustPoolData = {
            assets,
            protocolFees,
            reserves,
            tradeFees,
            version,
            isStable
        }
        return data
    }

    throw new Error('Can not parse executed get methods to DeDust pool data')
}

export interface DeDustPoolRecord extends GeneralStateRecord {
    data: DeDustPoolData
}

export function extractDeDustPoolRecord(record: AccountStates): DeDustPoolRecord {
    return {
        ...extractGeneralStateRecord(record),
        data: extractDeDustPoolData((record.executedGetMethods as any).dedust_v2_pool as any)
    }
}