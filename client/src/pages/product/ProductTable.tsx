import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { Package } from 'lucide-react';
import { toast } from 'sonner';

import {

    useDeleteProductMutation,
    useBlockProductMutation,
    useUpdateProductStatusMutation,
    useGetAllProductsQuery,
} from '../../redux/apis/product.api';
import TableData from '../../components/ui/TableData';
import Loader from '../../components/ui/Loader';

const ProductTable = () => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [tableData, setTableData] = useState<any[]>([]);

    const { data, isLoading, isSuccess, refetch } = useGetAllProductsQuery({
        searchQuery: searchQuery.toLowerCase(),
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
    });

    const [deleteProduct] = useDeleteProductMutation();
    const [blockProduct] = useBlockProductMutation();
    const [updateStatus, { isSuccess: statusUpdateSuccess, isError: statusUpdateError, error: statusError }] =
        useUpdateProductStatusMutation();

    const fetchData = async () => {
        if (isSuccess) {
            setTableData(data?.result || []);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteProduct(id);
        toast.success('Product deleted');
        await refetch();
    };

    const handleBlockProduct = async (id: string, currentBlockStatus: boolean) => {
        try {
            const response = await blockProduct(id);
            toast.success(currentBlockStatus ? 'Product unblocked' : 'Product blocked');
            await refetch();
        } catch (error) {
            toast.error('Block/unblock failed');
        }
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'name',
            header: 'Product Name',
            cell: (info) => info.getValue(),
        },
        {
            header: 'Supplier',
            cell: ({ row }) => typeof row.original.supplier === 'object'
                ? row.original.supplier?.name ?? 'N/A'
                : 'N/A',
        },
        {
            header: 'Company',
            cell: ({ row }) => typeof row.original.company === 'object'
                ? row.original.company?.name ?? 'N/A'
                : 'N/A',
        },

        {
            accessorKey: 'category',
            header: 'Category',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: (info) => `₹${info.getValue()}`,
        },
        {
            accessorKey: 'stock',
            header: 'Stock',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'batchNumber',
            header: 'Batch',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const currentStatus = row.original.status;

                const handleStatusChange = () => {
                    updateStatus({
                        id: row.original._id,
                        status: currentStatus === 'active' ? 'inactive' : 'active',
                    });
                };

                return (
                    <span
                        onClick={handleStatusChange}
                        className={`cursor-pointer px-3 py-1 rounded-full text-sm font-semibold ${currentStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                    >
                        {currentStatus === 'active' ? 'Active' : 'Inactive'}
                    </span>
                );
            },
        },
        {
            header: 'Actions',
            cell: ({ row }) => {
                const isBlocked = row.original.isBlock;

                return (
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(`/product-page/${row.original._id}`)}
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
                            onClick={() => handleBlockProduct(row.original._id, isBlocked)}
                            className={`font-medium ${isBlocked ? 'text-green-600' : 'text-yellow-600'}`}
                        >
                            {isBlocked ? 'Unblock' : 'Block'}
                        </button>
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        fetchData();
    }, [isSuccess, data]);

    if (isLoading) return <Loader />;

    return (
        <>
            {statusUpdateSuccess && toast.success('Product status updated')}
            {statusUpdateError && toast.error(statusError as string)}

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2 mb-2 mt-5">
                    <Package className="h-6 w-6 text-blue-600" />
                    <h2 className="text-lg font-bold">Products</h2>
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
                        onClick={() => navigate('/product/add')}
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

export default ProductTable;
