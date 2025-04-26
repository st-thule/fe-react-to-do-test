import React from 'react';

export const Header = () => {
  const today = new Date();

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayName = dayNames[today.getDay()];

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
