import React from "react";
import './Paging.css';
import Pagination from "react-js-pagination";


export default function Paging({page, count, itemsCountPerPage, setPage}: {page: number, count: number, itemsCountPerPage: number, setPage: any}) {
    return (
        <Pagination
            activePage={page}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={count}
            pageRangeDisplayed={10}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={setPage}
        />
    );
};