import React from 'react';

const Card = ({ taskTitle, taskDeadline }) => {
  return (
    <div className="flex justify-between w-full px-4 py-3 my-3 border border-gray-700 rounded-lg hover:bg-gray-50 hover:border-transparent">
      <div className="block">
        <p className="font-bold">
          {taskTitle}
        </p>
        <p>
          Deadline: {taskDeadline}
        </p>
      </div>
      <button className="bg-red-500 px-2 rounded-md text-white font-semibold hover:bg-red-600">
        Delete
      </button>
    </div>
  );
}

export default Card;
