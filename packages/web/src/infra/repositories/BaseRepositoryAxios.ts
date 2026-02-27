import type { IBaseRepository } from "@likkida/shared";
import axios from "axios";

export default abstract class BaseRepositoryAxios<T, K> implements IBaseRepository<T, K> {
  constructor(private baseUrl: string) { }
  findById(_id: string): Promise<K | null> {
    throw new Error("Method not implemented.");
  }
  update(_id: string, _data: Partial<T>): Promise<K> {
    throw new Error("Method not implemented.");
  }
  async create(data: T): Promise<K> {
    const { data: response } = await axios.post<K>(this.baseUrl, data)
    
    return response;
  }
  delete(_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getBaseUrl() {
    return this.baseUrl;
  }
}