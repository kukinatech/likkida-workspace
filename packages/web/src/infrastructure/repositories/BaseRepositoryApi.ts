import type { IBaseRepository } from "@likkida/shared";
import axios from "axios";

export default class BaseRepositoryApi<T> implements IBaseRepository<T> {

  constructor(private baseUrl: string) { }
  findById(_id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
  update(_id: string, _data: Partial<T>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create(_data: T): Promise<void> {
    await axios.post(this.baseUrl, _data)
  }
  delete(_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}