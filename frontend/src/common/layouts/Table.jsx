import React from "react";

export function Table({ fields, rows }) {
  return (
    <table className="table table-striped table-bordered text-center">
      <thead className="table-header bg-secondary">
        <tr>
          {fields.map(({ text }, index) => (
            <th key={index}>{text}</th>
          ))}
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
      {rows}
      </tbody>
    </table>
  );
}
