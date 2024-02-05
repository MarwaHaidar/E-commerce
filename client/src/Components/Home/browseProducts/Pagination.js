// Pagination.js
import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';


const Pagination = ({ productsPerPage, totalProducts, onPageChange }) => {
    const pageCount = Math.ceil(totalProducts / productsPerPage);

    const handlePageClick = (selectedPage) => {
        onPageChange(selectedPage.selected);
    };

    return (
        <ReactPaginate
            className="pagination"
            breakLabel=". . ."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="previous"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
