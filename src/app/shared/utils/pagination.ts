interface PaginateParams<T> {
  items: T[];
  currentPage: number;
  itemsPerPage: number;
}

interface PaginateResult<T> {
  totalItems: number;
  startIndex: number;
  endIndex: number;
  paginatedItems: T[];
}

export const paginate = <T>({
  items,
  currentPage,
  itemsPerPage,
}: PaginateParams<T>): PaginateResult<T> => {
  const totalItems = items.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    totalItems,
    startIndex,
    endIndex,
    paginatedItems,
  };
};
