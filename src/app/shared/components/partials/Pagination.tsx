import React from 'react';
// import leftArrow from '@assets/icons/arrow/left-icon.svg';
// import rightArrow from '@assets/icons/arrow/right-icon.svg';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPage = Math.ceil(totalItems / itemsPerPage);

  const pages: (number | string)[] = [];

  if (totalPage <= 7) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage > 4) {
      pages.push('...');
    }
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPage - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (currentPage < totalPage - 3) {
      pages.push('...');
    }
    pages.push(totalPage);
  }

  const handlePageChange = (page: number | string) => {
    if (page === '...') return;
    onPageChange(Number(page));
  };

  return (
    <div className="section-pagination pagination">
      <ul className="list-pages">
        <li className="list-item">
          <a
            className="page page-border"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage > 1 ? currentPage - 1 : 1);
            }}
          >
            <img src={'leftArrow'} alt="previous" />
          </a>
        </li>
        {pages.map((item, index) => (
          <li
            className={`list-item ${item === currentPage ? 'list-active' : ''}`}
            key={index}
          >
            <a
              className="page"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(item);
              }}
            >
              {item}
            </a>
          </li>
        ))}
        <li className="list-item">
          <a
            className="page page-border"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(
                currentPage < totalPage ? currentPage + 1 : totalPage
              );
            }}
          >
            <img src={'rightArrow'} alt="next" />
          </a>
        </li>
      </ul>
    </div>
  );
};
