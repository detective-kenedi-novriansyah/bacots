import { Message, Schema } from ".";

export enum SchemaTypes {
  LOAD_SCHEMA = "LOAD_SCHEMA",
  SCHEMA_FAILURE = "SCHEMA_FAILURE",
}

export interface SchemaState {
  readonly schema: Schema;
  readonly message: Message;
}
