import React from 'react';

const Header = () => {
  return (
    <div className="px-3 py-12 flex space-x-4 items-center justify-between">
      <div className="block">
        <p className="text-3xl font-bold">
          Always forget your task?
        </p>
        <p className="text-xl font-bold">
          2GAS help you list it
        </p>
      </div>
      <img src="/task-img.svg" alt="Task" height="300" width="300" />
    </div>
  );
}

export default Header;
