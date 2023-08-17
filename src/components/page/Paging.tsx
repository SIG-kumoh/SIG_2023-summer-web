import React, { useState } from "react";
import './Paging.css';
import Pagination from "react-js-pagination";


export default function Paging(page:any, count:any, setPage:any) {
    const [curPage, setCurPage] = useState(1);

    const handlePageChange = (curPage: any) => {
        setCurPage(curPage);
    }

    return (
        <Pagination
            activePage={page}
            itemsCountPerPage={2}
            totalItemsCount={10}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={() => {
                handlePageChange(page);
            }}
        />
    );
};
/*
export default function Paging({page, count, setPage}) {
    const [curPage, setCurPage] = useState(1);

    const handlePageChange = (curPage) => {
        setCurPage(curPage);
    }
    return (
        <Pagination
            activePage={page}
            itemsCountPerPage={2}
            totalItemsCount={10}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={() => {
                handlePageChange(page);
            }}
        />
    );
};*/