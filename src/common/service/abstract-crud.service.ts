// eslint-disable-next-line @typescript-eslint/no-unused-vars

abstract class AbstractCrudService {
  abstract get(): Promise<T[]>;
  abstract getDataById(id: number): Promise<T>;
  abstract edit(id: number): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
