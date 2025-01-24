export interface DatabaseClient {
  connection: any;
  db: any;
  dbCredentials: object;
  init(): void;
}
