import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store';

import { Task } from '@shared/models/Task';
import { CardComponent } from '@shared/components/Card';
import { DetailComponent } from '@shared/components/DetailComponent';
import { HeaderAddTask } from '@shared/components/HeaderAddTask';
import { Filter } from '@shared/components/Filter';
import { Pagination } from '@shared/components/Pagination';
import { paginate } from '@shared/utils/pagination';
import { SortKey } from '@shared/utils/sort';

const MyTask = () => {
  const tasks = useSelector((state: RootState) => state.tasks.taskList);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const userEmail = currentUser?.email;
  const userId = currentUser.id;
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>(SortKey.NEWEST);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 5;

  // filter task
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
      return sortOrder === SortKey.NEWEST ? dateB - dateA : dateA - dateB;
    });
    return result;
  }, [tasks, searchQuery, filterStatus, sortOrder]);

  // pagination
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
              <HeaderAddTask tasks={tasks} userId={userId} />
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

export default MyTask;
