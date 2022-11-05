import { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

export const Pages = ({ itemsPerPage, paging, issues }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(issues.length / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <Pagination
      style={{
        display: "flex",
        flexDirection: "center",
        justifyContent: "center",
      }}
    >
      {pages.map((page, key) => (
        <Pagination.Item key={key} onClick={() => paging(page)}>
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};
