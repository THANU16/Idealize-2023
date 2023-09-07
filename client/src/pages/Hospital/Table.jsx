import React from "react";

const CommonTable = ({ data, columns }) => {
  // Check if data is an array
  if (!Array.isArray(data)) {
    return <div>No data available.</div>;
  }

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>{item[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommonTable;
