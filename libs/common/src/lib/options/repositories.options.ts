import { QueryOrderEnum } from '../enums/order.enum';

export interface FindAllOptions {
  sort?: string;
  order?: QueryOrderEnum;
  from?: number;
  to?: number;
}

export interface FindAllSearchOptions extends FindAllOptions {
  search?: string;
}
