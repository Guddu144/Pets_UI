import React from 'react';
import { useTable } from 'react-table';
import Table from './Table';

const SimpleTable = ({
  records,
  columns,
  onRowClick,
}) => {
  const table = useTable({
    columns,
    data: records,
  });

  return (
    <Table {...table} onRowClick={onRowClick} />
  );

};

export default SimpleTable;
