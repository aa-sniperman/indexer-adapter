import { DataSource } from "typeorm";
import path from "path";


export type IndexerDBConfig = {
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    schema: string,
}

export const indexerDataSource = (config: IndexerDBConfig) => new DataSource({
    type: 'postgres',
    ...config,
    entities: [path.join(__dirname, "../indexer-entities/*{.js,.ts}")],
    synchronize: false,
    extra: {
        connectionLimit: 15,
        queueLimit: 0,
        waitForConnections: true
    }
});
