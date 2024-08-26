import { useState, useEffect, useMemo, useCallback } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    Row,
    SortingState,
    PaginationState,
} from '@tanstack/react-table';
import { IVehicleModel } from "../interfaces/IVehicleModel";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VehicleList = () => {
    const [vehicles, setVehicles] = useState<IVehicleModel[]>([]);
    const [lastVisible, setLastVisible] = useState<IVehicleModel | null>(null);
    const [loading, setLoading] = useState(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
    const navigate = useNavigate();

    const fetchVehicles = useCallback(async (isNextPage = false) => {
        setLoading(true);

        try {
            let query = `https://mono-react-app-default-rtdb.firebaseio.com/VehicleModels.json?orderBy="${sorting[0]?.id || 'Name'}"&limitToFirst=${pagination.pageSize + 1}`;

            if (isNextPage && lastVisible) {
                // @ts-ignore
                query += `&startAt="${lastVisible[sorting[0]?.id || 'Name']}"`;
            }

            const response = await axios.get(query);

            const vehiclesArray = Object.keys(response.data).map(key => ({
                ...response.data[key],
                id: key,
            }));

            if (vehiclesArray.length > pagination.pageSize) {
                setLastVisible(vehiclesArray[pagination.pageSize - 1]);
                vehiclesArray.pop(); // Ukloni dodatni item koji služi za proveru postojanja sledeće stranice
            } else {
                setLastVisible(null);
            }

            if (isNextPage) {
                setVehicles(prevVehicles => [...prevVehicles, ...vehiclesArray]);
            } else {
                setVehicles(vehiclesArray);
            }

        } catch (error) {
            console.error("Failed to fetch vehicles", error);
        } finally {
            setLoading(false);
        }
    }, [sorting, pagination.pageSize, lastVisible]);

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
                accessorKey: 'id',
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
        manualPagination: true,
        manualSorting: true,
        pageCount: -1, // Ukupan broj stranica nije poznat
        state: {
            pagination,
            sorting,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
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
                        onClick={() => {
                            setPagination(prev => ({ ...prev, pageIndex: 0 }));
                            fetchVehicles();
                        }}
                        disabled={pagination.pageIndex === 0}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="px-3 py-1 border bg-gray-200 dark:bg-gray-700"
                        onClick={() => {
                            setPagination(prev => ({ ...prev, pageIndex: Math.max(prev.pageIndex - 1, 0) }));
                            fetchVehicles(true);
                        }}
                        disabled={pagination.pageIndex === 0}
                    >
                        {'<'}
                    </button>
                    <button
                        className="px-3 py-1 border bg-gray-200 dark:bg-gray-700"
                        onClick={() => {
                            setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
                            fetchVehicles(true);
                        }}
                        disabled={!lastVisible}
                    >
                        {'>'}
                    </button>
                    <button
                        className="px-3 py-1 border rounded-r-md bg-gray-200 dark:bg-gray-700"
                        onClick={() => {
                            setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
                            fetchVehicles(true);
                        }}
                        disabled={!lastVisible}
                    >
                        {'>>'}
                    </button>
                </div>

                <span>
                    Page{' '}
                    <strong>
                        {pagination.pageIndex + 1}
                    </strong>
                </span>

                <select
                    value={pagination.pageSize}
                    onChange={e => setPagination(prev => ({ ...prev, pageSize: Number(e.target.value) }))}
                    className="border rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                >
                    {[10, 20, 30, 40, 50].map(size => (
                        <option key={size} value={size}>
                            Show {size}
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
            <span>
                {loading}
            </span>
        </div>
    );
};

export default VehicleList;
