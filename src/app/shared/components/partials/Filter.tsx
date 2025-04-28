import React, { useRef } from 'react';
import { Input } from './Input';
import { Status } from '@shared/constants/status';

interface IFilterProps {
  onSearch: (keySearch: string) => void;
  onSort: (order: string) => void;
  onFilterStatus: (status: string) => void;
}
export const Filter: React.FC<IFilterProps> = ({
  onSearch,
  onSort,
  onFilterStatus,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value || '';
    onSearch(inputValue);
  };
  return (
    <div className="section-utility utility">
      <form className="form form-search" onSubmit={handleSearch}>
        <Input
          className="input"
          type="text"
          placeHolder="Search"
          ref={inputRef}
        />
      </form>
      <div className="utility-sort">
        <p className="utility-label">Sort by:</p>
        <select
          className="utility-dropdown"
          onChange={(e) => onSort(e.target.value)}
        >
          <option className="utility-option" value="all" disabled>
            All
          </option>
          <option className="utility-option" value="newest">
            Newest
          </option>
          <option className="utility-option" value="oldest">
            Oldest
          </option>
        </select>
      </div>
      <div className="utility-filter">
        <p className="utility-label">Filter by:</p>
        <select
          className="utility-dropdown"
          onChange={(e) => onFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value={Status.NO_STARTED}>Not Started</option>
          <option value={Status.IN_PROGRESS}>In Progress</option>
          <option value={Status.COMPLETED}>Completed</option>
        </select>
      </div>
    </div>
  );
};
