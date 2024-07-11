import Pagination from 'react-bootstrap/Pagination';
import React, { useEffect } from 'react';

export default function PaginationLocal({ totalPages, currentPage, setCurrentPage, setSearchParams, fetchData, setFetchData, activePage, setActivePage }) {
  
  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage, setActivePage]);

  let items = [];

  const changePage = (page) => {
    setActivePage(page);
    setCurrentPage(page);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", page);
      return newParams;
    });
    setFetchData(!fetchData);
  };

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} onClick={() => changePage(number)} active={number === activePage}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div>
      <Pagination style={{ marginLeft: "15%", paddingTop: "7%" }}>
        <Pagination.Prev onClick={() => {
          if (currentPage > 1) {
            changePage(currentPage - 1);
          }
        }} />
        {items.map(item => item)}
        <Pagination.Next onClick={() => {
          if (currentPage < totalPages) {
            changePage(currentPage + 1);
          }
        }} />
      </Pagination>
    </div>
  );
}