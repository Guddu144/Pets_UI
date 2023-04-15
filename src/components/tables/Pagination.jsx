import React from 'react';
import Paginate from 'react-paginate';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';

const Pagination = ({ page, from, to, totalResults, totalPages, onPageChange }) => {
  return (
    <div className="p-3 mt-3 flex items-center justify-between rounder bg-gray-50 mb-8">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          disabled={page == 0}
          onClick={() => onPageChange(page - 1)}
          className="disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          {('Previous')}
        </button>
        <button
          disabled={page === totalPages - 1}
          onClick={() => onPageChange(page + 1)}
          className="disabled:opacity-50 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          {('Next')}
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-400">
            Showing <span className="font-semibold">{ from }</span> to <span className="font-semibold">{ to }</span> of{' '}
            <span className="font-semibold">{ totalResults }</span> results
          </p>
        </div>
        <div>
          <Paginate
            forcePage={page}
            onPageChange={({ selected }) => onPageChange(selected)}
            containerClassName="relative z-0 inline-flex rounded-md space-x-2"
            previousLabel={<IconChevronLeft size={18} />}
            nextLabel={<IconChevronRight size={18} />}
            pageCount={totalPages}
            nextLinkClassName="relative inline-flex items-center px-2 py-1 text-md text-gray-500 hover:bg-gray-50"
            previousLinkClassName="relative inline-flex items-center px-2 py-1 text-sm text-gray-500 hover:bg-gray-50"
            pageLinkClassName="text-gray-500 relative inline-flex items-center px-2 py-1 rounded-md text-sm font-medium hover:bg-blue-100"
            activeLinkClassName="bg-blue-500 text-white relative inline-flex items-center px-2 py-1 rounded-md text-sm font-medium hover:bg-blue-100"
          />
        </div>
      </div>
    </div >
  );
};

export default Pagination;
