import { useState, useEffect, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    Row
} from '@tanstack/react-table';
import { IVehicleModel } from "../interfaces/IVehicleModel";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VehicleList = () => {
    const [vehicles, setVehicles] = useState<IVehicleModel[]>([]);
    const navigate = useNavigate();

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels.json');
            const vehiclesArray = Object.keys(response.data).map(key => ({
                ...response.data[key],
                id: key,
            }));
            setVehicles(vehiclesArray);
        } catch (error) {
            console.error("Failed to fetch vehicles", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels/${id}.json`);
            setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== id));
        } catch (error) {
            console.error("Failed to delete vehicle", error);
        }
    };

    useEffect(() => {
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
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }: { row: Row<IVehicleModel> }) => (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => navigate(`/cars/edit/${row.original.id}`)}
                            className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(row.original.id)}
                            className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ),
            },
        ],
        [navigate]
    );

    const table = useReactTable({
        data: vehicles,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    });

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="px-6 py-3">
                                {header.isPlaceholder ? null : (
                                    <div
                                        {...{
                                            onClick: header.column.getToggleSortingHandler(),
                                            style: { cursor: 'pointer' }
                                        }}
                                        className="flex items-center"
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
                    <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="px-6 py-4">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="pagination py-4 flex justify-between items-center">
                <div>
                    <button
                        className="px-3 py-1 border rounded-l-md bg-gray-200 dark:bg-gray-700"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="px-3 py-1 border bg-gray-200 dark:bg-gray-700"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <button
                        className="px-3 py-1 border bg-gray-200 dark:bg-gray-700"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                    <button
                        className="px-3 py-1 border rounded-r-md bg-gray-200 dark:bg-gray-700"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </button>
                </div>

                <span>
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>{' '}
                </span>

                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => table.setPageSize(Number(e.target.value))}
                    className="border rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <button
                onClick={() => navigate('/cars/new')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add new Car
            </button>
        </div>
    );
};

export default VehicleList;
