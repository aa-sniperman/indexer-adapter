import { Address } from "@ton/core";
import { DataSource } from "typeorm";
import { DeDustPoolRecord, extractDeDustPoolRecord } from "./types";
import { AccountStates } from "@/entities/AccountStates";
import { castAddressToBuffer } from "@/utils";

export * from './types'

export type DeDustPoolListQueryOptions = {
    limit?: number;
    fromLastTxLt?: number
}

export class DeDustAdapter {
    private dataSource: DataSource
    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    public async getLatest(poolAddress: Address): Promise<DeDustPoolRecord | null> {
        try {
            const record = await this.dataSource
                .getRepository(AccountStates)
                .findOne({
                    where: {
                        address: castAddressToBuffer(poolAddress),
                    },
                    order: {
                        lastTxLt: 'DESC'
                    }
                })

            if (!record?.executedGetMethods) return null;
            return extractDeDustPoolRecord(record)
        } catch (err) {
            return null;
        }
    }

    public async getList(poolAddress: Address, options?: DeDustPoolListQueryOptions): Promise<DeDustPoolRecord[]> {
        try {
            let query = this.dataSource.getRepository(AccountStates).createQueryBuilder('state')
            query = query.where('state.address: address', { address: castAddressToBuffer(poolAddress) })
            if (options?.fromLastTxLt) {
                query = query.where('state.last_tx_lt >= :fromLastTxLt', { fromLastTxLt: options.fromLastTxLt })
            }
            if (options?.limit) {
                query = query.limit(options.limit)
            }

            const records = await query.getMany();
            return records.map(extractDeDustPoolRecord)
        } catch (err) {
            return [];
        }
    }
}