import React from 'react';

export const Header = () => {
  const today = new Date();
  const dayName = today.toLocaleString('en-US', { weekday: 'long' });
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return (
    <header className="header">
      <div className="wrapper">
        <h1 className="logo">
          To<span>-Do</span>
        </h1>
        <div className="header-detail">
          <p className="header-day">{dayName}</p>
          <p className="header-date">{`${day}/${month}/${year}`}</p>
        </div>
      </div>
    </header>
  );
};
