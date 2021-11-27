import React from 'react';

const Form = () => {
  return (
    <form>
      <div className="flex justify-around">
        <label className="block w-full mx-1">
          <p className="cursor-pointer">Task</p>
          <input className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-700" type="text" placeholder="Mencuci Baju" />
        </label>
        <label className="block w-full mx-1">
          <p className="cursor-pointer">Deadline</p>
          <input className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-700" type="text" placeholder="12/12/2021" />
        </label>
      </div>
      <input className="w-20 my-3 mx-1 py-2 cursor-pointer bg-gray-700 rounded-lg text-white hover:bg-gray-800 hover:text-white" type="submit" value="Add" />
    </form>
  );
}

export default Form;
