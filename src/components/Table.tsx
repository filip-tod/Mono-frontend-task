import { useState, useEffect, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { IVehicleModel } from "../interfaces/IVehicleModel";

const VehicleList = () => {
    const [vehicles, setVehicles] = useState<IVehicleModel[]>([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            const response = await fetch('https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels.json');
            const data = await response.json();
            const vehiclesArray = Object.keys(data).map(key => ({
                ...data[key],
                Id: key,  // assuming `Id` is not present in data
            }));
            setVehicles(vehiclesArray);
        };

        fetchVehicles();
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'Id',
                header: 'ID',
            },
            {
                accessorKey: 'MakeId',
                header: 'Make ID',
            },
            {
                accessorKey: 'Name',
                header: 'Name',
            },
            {
                accessorKey: 'Abrv',
                header: 'Abrv',
            },
        ],
        []
    );

    const table = useReactTable({
        data: vehicles,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },  // Initial page size
    });

    return (
        <div>
            <table className="min-w-full">
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="px-6 py-3 border-b-2 border-gray-300">
                                {header.isPlaceholder ? null : (
                                    <div
                                        {...{
                                            onClick: header.column.getToggleSortingHandler(),
                                            style: { cursor: 'pointer' }
                                        }}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{ asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="px-6 py-4 border-b border-gray-200">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    {'<'}
                </button>{' '}
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    {'>'}
                </button>{' '}
                <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>{' '}
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => table.setPageSize(Number(e.target.value))}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default VehicleList;
