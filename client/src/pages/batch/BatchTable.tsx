import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { Package } from 'lucide-react';
import { toast } from 'sonner';

import {
    useGetAllBatchesQuery,
    useDeleteBatchMutation,
    useMarkBatchExpiredMutation
} from '../../redux/apis/batch.api';

import TableData from '../../components/ui/TableData';
import Loader from '../../components/ui/Loader';

const BatchTable = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [tableData, setTableData] = useState<any[]>([]);

    const { data, isLoading, isSuccess, refetch } = useGetAllBatchesQuery({
        searchQuery: searchQuery.toLowerCase(),
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
    });

    const [deleteBatch] = useDeleteBatchMutation();
    const [markExpired] = useMarkBatchExpiredMutation();

    const fetchData = async () => {
        if (isSuccess) {
            setTableData(data?.result || []);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteBatch(id);
        toast.success('Batch deleted');
        await refetch();
    };

    const handleMarkExpired = async (id: string) => {
        await markExpired(id);
        toast.success('Batch marked as expired');
        await refetch();
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'product.name',
            header: 'Product',
            cell: ({ row }) => row.original.product?.name || 'N/A',
        },
        {
            accessorKey: 'batchNumber',
            header: 'Batch Number',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'stock',
            header: 'Stock',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'mrp',
            header: 'MRP',
            cell: (info) => `₹${info.getValue()}`,
        },
        {
            accessorKey: 'sellingPrice',
            header: 'Selling Price',
            cell: (info) => `₹${info.getValue()}`,
        },
        {
            accessorKey: 'expiryDate',
            header: 'Expiry Date',
            cell: (info) => new Date(info.getValue()).toLocaleDateString(),
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(`/batch-page/${row.original._id}`)}
                        className="text-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row.original._id)}
                        className="text-red-600"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => handleMarkExpired(row.original._id)}
                        className="text-yellow-600"
                    >
                        Mark Expired
                    </button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        fetchData();
    }, [isSuccess, data]);



    if (isLoading) return <Loader />;

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2 mb-2 mt-5">
                    <Package className="h-6 w-6 text-blue-600" />
                    <h2 className="text-lg font-bold">Batches</h2>
                </div>
                <div className="flex gap-2 mt-5">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border px-3 py-1 rounded-md"
                    />
                    <button
                        onClick={() => navigate('/batch-page')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                    >
                        Add
                    </button>
                </div>
            </div>

            <div className="mt-8 flow-root">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <TableData
                            data={tableData}
                            columns={columns}
                            enableSorting={true}
                            onPaginationChange={setPagination}
                            enableGlobalFilter={true}
                            onGlobalFilterChange={searchQuery}
                            initialPagination={pagination}
                            totalPages={data?.pagination?.totalPages}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BatchTable;
