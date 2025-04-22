export interface Page<T> {
    content: T[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    number: number;
    sort?: string;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  }
  
  export type Pageable = {
    pageNumber: number;
    pageSize: number;
    sort?: string;
    offset?: number;
    paged?: boolean;
    unpaged?: boolean;
  };
  
  export type MinifiedPageable = {
    size: number;
    page: number;
    sort?: string[] | string;
  };
  
  