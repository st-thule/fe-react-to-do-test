import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { AppDispatch, RootState } from '@app/store';
import { openModal } from '@app/store/actions/modalAction';
import { ModalTypes } from '@shared/utils/modal-type';
import { navList } from '@shared/constants/nav';
import logoutIcon from '@assets/icons/logout-icon.svg';
import { AuthContext, AuthProvider } from '@shared/context/auth.context';

export const SideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const userContext = useContext(AuthContext);
  const userId = userContext.getCurrentUserId();

  console.log(userId);

  return (
    <aside className="sidebar">
      <h2 className="title">
        {/* {currentUser?.fullName}
        <span>{currentUser?.email}</span> */}
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
                modalType: ModalTypes.CONFIRM,
                modalProps: {
                  title: 'Confirm logout',
                  message: 'Are you sure to logout?',
                  onConfirm: () => {
                    // dispatch(logout());
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
