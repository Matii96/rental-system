export interface IDbSeeder {
  run(): void | Promise<void>;
}
