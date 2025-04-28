import { RootState } from '@shared/redux/store';
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@shared/redux/actions/modalAction';
import { Status } from '@shared/constants/status';
import { Task } from '@shared/models/Task';
import { addTask } from '@shared/redux/actions/taskActions';
import { toast } from 'react-toastify';
import { CardComponent } from '@shared/components/partials/Card';
import { DetailComponent } from '@shared/components/partials/DetailComponent';
import { Filter } from '@shared/components/partials/Filter';
import { Pagination } from '@shared/components/partials/Pagination';

export const MyTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.taskList);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const userEmail = currentUser?.email;
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // State cho search, filter, sort và pagination
  const [searchQuery, setSearchQuery] = useState<string>(''); // Tìm kiếm theo title
  const [filterStatus, setFilterStatus] = useState<string>('All'); // Lọc theo status
  const [sortOrder, setSortOrder] = useState<string>('newest'); // Sắp xếp theo ngày tạo
  const [currentPage, setCurrentPage] = useState<number>(1); // Trang hiện tại
  const tasksPerPage = 5; // Số task mỗi trang

  const handleAddTask = () => {
    dispatch(
      openModal({
        modalType: 'TASK_FORM',
        modalProps: {
          isEdit: false,
          defaultValues: {
            title: '',
            dueDate: '',
            description: '',
            status: Status.NO_STARTED,
          },
          onSubmit: (data: {
            title: string;
            dueDate: string;
            description: string;
            status: Status;
          }) => {
            const newTask: Task = {
              id: (tasks.length + 1).toString(),
              title: data.title,
              description: data.description,
              status: data.status,
              userEmail: userEmail,
              createdAt: new Date().toISOString(),
              dueDate: new Date(data.dueDate).toISOString(),
            };
            dispatch(addTask(newTask));
            toast.success('Add task successfully');
          },
        },
      })
    );
  };

  // Logic xử lý search, filter và sort
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
    setSelectedTask(null); // Ẩn chi tiết task khi đổi trang
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
              <div className="section-action">
                <p className="action" onClick={handleAddTask}>
                  +<span>Add task</span>
                </p>
              </div>
            </div>

            {/* Sử dụng Filter component và thêm dropdown filter status */}
            <div className="section-utility">
              <Filter
                onSearch={(keySearch) => {
                  setSearchQuery(keySearch);
                  setCurrentPage(1); // Reset về trang 1 khi search
                }}
                onSort={(order) => {
                  setSortOrder(order);
                  setCurrentPage(1); // Reset về trang 1 khi sort
                }}
                onFilterStatus={(status) => {
                  setFilterStatus(status);
                  setCurrentPage(1); // Reset về trang 1 khi filter
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

            {/* Sử dụng Pagination component */}
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
