import React from 'react';
import styled from 'styled-components';
import { useTable, useSortBy, usePagination } from 'react-table';
import makeData from './makeData';
import contents from './content.json';
import './App.css';
const data1 = JSON.parse(contents);
console.log(data1);
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      :nth-child(even) {
        background: #ccc;
      }
    }
    th {
      background: green;
    }
    th,
    td {
      margin: 0;
      padding: 1rem 2rem;
    }
  }
`;
let content = '';
let _props = {};
function modalShow(row) {
  content = row[9].value;
  _props.show();
  console.log(_props);
  console.log(content);
}
function modalHide() {
  _props.hide();
}
function Table({ columns, data }) {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: [{ pageIndex, pageSize }]
  } = useTable(
    {
      columns,
      data
    },
    useSortBy,
    usePagination
  );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20);
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                if (column.Header === 'Content') return;
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                return (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {page.map(
            (row, i) =>
              prepareRow(row) || (
                <tr
                  onDoubleClick={() => modalShow(row.cells)}
                  {...row.getRowProps()}
                >
                  {row.cells.map(cell => {
                    if (cell.column.Header === 'Content') return;
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              )
          )}
        </tbody>
      </table>
      <br />
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
Table.pageSize = 20;
function App(props) {
  console.log(props);
  const columns = React.useMemo(
    () => [
      {
        Header: 'File',
        accessor: 'file'
      },
      {
        Header: 'Line',
        accessor: 'line'
      },
      {
        Header: 'Id',
        accessor: 'id'
      },
      {
        Header: 'Subid',
        accessor: 'subid'
      },
      {
        Header: 'Severity',
        accessor: 'severity'
      },
      {
        Header: 'Msg',
        accessor: 'msg'
      },
      {
        Header: 'Identifier',
        accessor: 'identifier'
      },
      {
        Header: 'Web_identify',
        accessor: 'web_identify'
      },
      {
        Header: 'Func_info',
        accessor: 'func_info'
      },
      {
        Header: 'Content',
        accessor: 'content'
      }
    ],
    []
  );
  _props = props;
  const data = React.useMemo(() => makeData(200), []);

  if (props.flag) {
    return (
      <Styles>
        <div className="module">
          <button className="delete" onClick={() => modalHide()}>
            {' '}
            x{' '}
          </button>
          <h3>错误信息</h3>
          <div className="content">
            <p>{content}</p>
          </div>
        </div>
        <Table columns={columns} data={data} />
      </Styles>
    );
  }
  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  );
}

export default App;
