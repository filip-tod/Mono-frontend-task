import React, { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Table as LibraryTable,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
  useCustom,
} from '@table-library/react-table-library/table';
import { usePagination } from '@table-library/react-table-library/pagination';

const BASE_URL = 'https://mono-react-app-default-rtdb.firebaseio.com';

interface TableProps {
  endpoint: string;
  columns: Array<{ accessorKey: string; header: string }>;
  onAdd?: () => void;
  onEdit?: (id: string) => void;
}

interface DataNode {
  [key: string]: any;
  id: string;
}

interface FetchParams {
  search: string;
  filter: boolean;
  page?: number;
}

const Table: React.FC<TableProps> = ({ endpoint, columns, onAdd, onEdit }) => {
  const [data, setData] = useState<{ nodes: DataNode[]; totalPages: number }>({
    nodes: [],
    totalPages: 0,
  });
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<boolean>(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(
    async (params: FetchParams) => {
      let url = `${BASE_URL}/${endpoint}.json`;

      if (params.search) {
        url += `?search=${params.search}`;
      }
      if (params.filter) {
        url += `${params.search ? '&' : '?'}filter=${params.filter}`;
      }
      if (params.page !== undefined) {
        url += `${params.search || params.filter ? '&' : '?'}page=${params.page}`;
      }

      const result = await axios.get(url);

      const dataArray: DataNode[] = result.data
        ? Object.entries(result.data).map(([key, value]) => {
          // Provjerimo je li `value` objekt
          if (typeof value === 'object' && value !== null) {
            return { ...value, id: key };
          }
          return { id: key }; // Osiguramo da uvijek vratimo objekt s 'id'
        })
        : [];

      setData({
        nodes: dataArray,
        totalPages: Math.ceil(dataArray.length / 10),
      });
    },
    [endpoint]
  );

  useEffect(() => {
    fetchData({ search, filter });
  }, [fetchData, search, filter]);

  const pagination = usePagination(
    data,
    {
      state: {
        page: 0, // Početna stranica
      },
      onChange: (_, state) => fetchData({ search, filter, page: state.page }),
    },
    {
      isServer: true,
    }
  );

  useCustom('search', data, {
    state: { search },
    onChange: (_, state) => {
      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        fetchData({ search: state.search, filter, page: pagination.state.page });
      }, 500);
    },
  });

  useCustom('filter', data, {
    state: { filter },
    onChange: (_, state) => fetchData({ search, filter: state.filter, page: pagination.state.page }),
  });

  return (
    <div>
      <div>
        <label htmlFor="search">
          Search:
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <label htmlFor="filter">
          <input
            id="filter"
            type="checkbox"
            checked={filter}
            onChange={(e) => setFilter(e.target.checked)}
          />
          Only "Ask HN"
        </label>
      </div>

      <LibraryTable data={data.nodes} pagination={pagination}>
        {(tableList : any) => (
          <>
            <Header>
              <HeaderRow>
                {columns.map(({ header }) => (
                  <HeaderCell key={header}>{header}</HeaderCell>
                ))}
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item : any) => (
                <Row key={item.id} item={item} onClick={() => onEdit && onEdit(item.id)}>
                  {columns.map(({ accessorKey }) => (
                    <Cell key={accessorKey}>{item[accessorKey]}</Cell>
                  ))}
                </Row>
              ))}
            </Body>
          </>
        )}
      </LibraryTable>

      {onAdd && <button onClick={onAdd}>Add New</button>}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Total Pages: {data.totalPages}</span>
        <span>
          Page:{' '}
          {Array.from({ length: data.totalPages }, (_, index) => (
            <button
              key={index}
              type="button"
              style={{
                fontWeight: pagination.state.page === index ? 'bold' : 'normal',
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Table;
