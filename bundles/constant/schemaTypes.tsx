import { Schema } from "./interface";

export enum SchemaTypes {
    LOAD_SCHEMA = 'LOAD_SCHEMA'
}

export interface SchemaState {
    readonly schema: Schema
}