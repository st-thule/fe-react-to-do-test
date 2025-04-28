import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CardComponent } from '@shared/components/partials/Card';
import { DetailComponent } from '@shared/components/partials/DetailComponent';
import { Filter } from '@shared/components/partials/Filter';
import { HeaderAddTask } from '@shared/components/partials/HeaderAddTask';
import { Pagination } from '@shared/components/partials/Pagination';
import { Task } from '@shared/models/Task';
import { RootState } from '@shared/redux/store';

export const MyTask = () => {
  const tasks = useSelector((state: RootState) => state.tasks.taskList);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const userEmail = currentUser?.email;
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 5;

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Search theo title
    if (searchQuery) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter theo status
    if (filterStatus !== 'All') {
      result = result.filter((task) => task.status === filterStatus);
    }

    // Sort theo ngày tạo
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [tasks, searchQuery, filterStatus, sortOrder]);

  // Logic xử lý pagination
  const totalTasks = filteredTasks.length;
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  // Xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedTask(null);
  };

  return (
    <section className="dashboard">
      <div className="container">
        <div className="my-task">
          <section className="section section-todos">
            <div className="section-header">
              <div className="section-title">
                <h2 className="title">To-Do</h2>
              </div>
              <HeaderAddTask tasks={tasks} userEmail={userEmail} />
            </div>

            <div className="section-utility">
              <Filter
                onSearch={(keySearch) => {
                  setSearchQuery(keySearch);
                  setCurrentPage(1);
                }}
                onSort={(order) => {
                  setSortOrder(order);
                  setCurrentPage(1);
                }}
                onFilterStatus={(status) => {
                  setFilterStatus(status);
                  setCurrentPage(1);
                }}
              />
            </div>

            <ul className="list-tasks">
              {paginatedTasks.length > 0 ? (
                paginatedTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    style={{ cursor: 'pointer' }}
                  >
                    <CardComponent className="" task={task} isLink={false} />
                  </div>
                ))
              ) : (
                <p>No tasks found.</p>
              )}
            </ul>

            {totalTasks > 0 && (
              <Pagination
                totalItems={totalTasks}
                itemsPerPage={tasksPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </section>
          {selectedTask && (
            <div className="task-detail-column">
              <DetailComponent
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
