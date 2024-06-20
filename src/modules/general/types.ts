import { AccountStates } from "@/entities/AccountStates";

export interface GeneralStateRecord {
    isActive: boolean,
    tonBalance: string,
    lastTxLt: string,
    lastTxHash: Buffer
}

export function extractGeneralStateRecord(state: AccountStates): GeneralStateRecord {
    return {
        isActive: state.isActive ?? false,
        tonBalance: state.balance ?? '0',
        lastTxHash: state.lastTxHash,
        lastTxLt: state.lastTxLt
    }
}