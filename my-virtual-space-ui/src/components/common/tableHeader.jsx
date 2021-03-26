import React from 'react';

/**
 *
 * Example di colonne visibili e cliccabili
 * columns = [
 *    { path: "cognome", label: "Cognome" },
 *    { path: "nome", label: "Nome" },
 *    { path: "matricolaInterna", label: "Matricola Interna" }
 * ];
 *
 * Example di colonna non visibile e di colonna non cliccabile
 * columns = [
 *    { path: "cognome", label: "Cognome", invisible: true },
 *    { path: "nome", label: "Nome", unclickable: true }
 * ];
 *
 * */

const TableHeader = ({ columns, onSort, sortColumn, customThClass = '' }) => {
  const handleChangeSort = column => {
    const sortColumnCopy = { ...sortColumn };

    if (sortColumnCopy.column === column)
      sortColumnCopy.order = sortColumnCopy.order === 'asc' ? 'desc' : 'asc';
    else {
      sortColumnCopy.column = column;
      sortColumnCopy.order = 'asc';
    }

    onSort(sortColumnCopy);
  };

  const renderSortIcon = column => {
    if (column === sortColumn.column && sortColumn.order === 'asc')
      return <i className="fa fa-sort-asc" />;
    else if (column === sortColumn.column && sortColumn.order === 'desc')
      return <i className="fa fa-sort-desc" />;
    else return <i className="fa fa-sort" />;
  };

  const customClass = column =>
    (!column.unclickable ? 'clickable ' : '') +
    column.customThClass +
    ' ' +
    customThClass;

  return (
    <thead className="thead">
      <tr className="row">
        {columns.map(
          column =>
            !column.invisible && (
              <th
                className={customClass(column)}
                key={column.path}
                onClick={() =>
                  !column.unclickable && handleChangeSort(column.path)
                }
              >
                {column.label}{' '}
                {!column.unclickable && renderSortIcon(column.path)}
              </th>
            ),
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
