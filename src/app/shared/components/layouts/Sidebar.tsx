import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { navList } from '@shared/constants/nav';
import { AppDispatch, RootState } from '@shared/redux/store';
import logoutIcon from '@assets/icons/logout-icon.svg';
import { logout } from '@shared/redux/actions/authActions';
import { openModal } from '@shared/redux/actions/modalAction';

export const SideBar = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <h2 className="title">
        {currentUser?.fullName}
        <span>{currentUser?.email}</span>
      </h2>

      <div className="sidebar-content">
        <nav className="nav">
          <ul className="list-menus">
            {navList.map((nav) => {
              const isActive =
                location.pathname === nav.href ||
                location.pathname.startsWith(nav.href + '/');
              return (
                <li
                  key={nav.title}
                  className={`list-item ${isActive ? 'menu-active' : ''}`}
                >
                  <Link className="menu" to={nav.href}>
                    <img className="menu-icon" src={nav.icon} alt={nav.title} />
                    <h3 className="menu-title">{nav.title}</h3>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className="sidebar-action action"
          onClick={() => {
            dispatch(
              openModal({
                modalType: 'CONFIRM',
                modalProps: {
                  title: 'Confirm logout',
                  message: 'Are you sure to logout?',
                  onConfirm: () => {
                    dispatch(logout());
                    toast.success('You logged out');
                  },
                },
              })
            );
          }}
        >
          <img src={logoutIcon} alt="Logout icon" />
          <h3 className="action-title">Logout</h3>
        </div>
      </div>
    </aside>
  );
};
