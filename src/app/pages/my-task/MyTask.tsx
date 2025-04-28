import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@shared/redux/store';
import { Task } from '@shared/models/Task';
import { CardComponent } from '@shared/components/partials/Card';
import { DetailComponent } from '@shared/components/partials/DetailComponent';
import { HeaderAddTask } from '@shared/components/partials/HeaderAddTask';
import { Filter } from '@shared/components/partials/Filter';
import { Pagination } from '@shared/components/partials/Pagination';
import { paginate } from '@shared/utils/pagination'; // Import hàm paginate

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
    if (searchQuery) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterStatus !== 'All') {
      result = result.filter((task) => task.status === filterStatus);
    }
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    return result;
  }, [tasks, searchQuery, filterStatus, sortOrder]);

  // Sử dụng hàm paginate
  const { totalItems: totalTasks, paginatedItems: paginatedTasks } = paginate({
    items: filteredTasks,
    currentPage,
    itemsPerPage: tasksPerPage,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedTask(null);
  };

  return (
    <section className="my-task">
      <div className="container task-layout">
        <div className="task-list-column">
          <section className="section section-todos">
            <div className="section-header">
              <div className="section-title">
                <h2 className="title">To-Do</h2>
              </div>
              <HeaderAddTask tasks={tasks} userEmail={userEmail || ''} />
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
        </div>
        {selectedTask && (
          <div className="task-detail-column">
            <DetailComponent
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
            />
          </div>
        )}
      </div>
    </section>
  );
};
