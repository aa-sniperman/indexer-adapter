import { DataSource } from "typeorm";
import { IndexerDBConfig, indexerDataSource } from "./connection/data-source";

export { IndexerDBConfig } from "./connection/data-source"
export class IndexerAdapter {
    readonly dataSource: DataSource;
    constructor(config: IndexerDBConfig) {
        this.dataSource = indexerDataSource(config);
    }

    public static async initialize(config: IndexerDBConfig) {
        const adapter = new IndexerAdapter(config);
        await adapter.dataSource.initialize();
        return adapter;
    }
}