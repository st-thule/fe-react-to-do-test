import React from 'react';

import handWave from '@assets/images/hand-wave.png';
import { useSelector } from 'react-redux';
import { RootState } from '@shared/redux/store';

const Header = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  return (
    <div className="dashboard-header">
      <h2 className="title">Welcome {currentUser?.fullName}</h2>
      <img src={handWave} alt="hand wave" />
    </div>
  );
};
export default Header;
