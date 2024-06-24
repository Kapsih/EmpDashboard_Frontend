import Pagination from 'react-bootstrap/Pagination';

import React, { useState } from 'react'

export default function PaginationLocal({totalPages, currentPage, setCurrentPage, setSearchParams, handleSubmit}) {
    const [active, setActive] = useState(currentPage)  
    let items = [];
for (let number = 1; number <= totalPages; number++) {
  items.push(
    <Pagination.Item key={number} onClick={()=>{setActive(number)
        setCurrentPage(number)
        setSearchParams(prev=>{
            prev.set("page", number)
            return prev
        })
        setSearchParams(prev=>{
          const newParams = new URLSearchParams(prev);
          newParams.set("page", number);
          return newParams
      })
       
    }} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}
  return (
    <div>
    <Pagination>
    {items.map((item)=>{
        return item
    })}
    </Pagination>
  
  </div>
  )
}
