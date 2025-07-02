import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { Briefcase } from 'lucide-react';

import {
    useGetAllSuppliersQuery,
    useDeleteSupplierMutation,
    useUpdateSupplierStatusMutation,
    useBlockSupplierMutation,
} from '../../redux/apis/supplier.api';

import Loader from '../../components/ui/Loader';
import TableData from '../../components/ui/TableData';
import { Toast } from '../../components/ui/toast';
import { useDebounce } from '../../utils/useDebounce';

const SupplierTable = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [tableData, setTableData] = useState<any[]>([]);

    const { data: searchData, isLoading, isSuccess, refetch } = useGetAllSuppliersQuery({
        searchQuery: debouncedSearchQuery.toLowerCase(),
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
    });

    const [blockSupplier] = useBlockSupplierMutation();
    const [deleteSupplier] = useDeleteSupplierMutation();

    const [
        updateSupplierStatus,
        {
            data: statusMessage,
            error: statusError,
            isSuccess: statusUpdateSuccess,
            isError: statusUpdateError,
        },
    ] = useUpdateSupplierStatusMutation();

    const fetchData = () => {
        if (isSuccess) {
            setTableData(searchData.result);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteSupplier(id);
        refetch();
    };

    const handleBlockSupplier = async (id: string, currentBlockStatus: boolean) => {
        try {
            await blockSupplier(id);
            await refetch();
        } catch (error) {
            console.error("Failed to toggle supplier block status", error);
        }
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'name',
            header: 'Supplier Name',
        },
        {
            accessorKey: 'mobile',
            header: 'Phone Number',
        },
        {
            accessorKey: 'address',
            header: 'Address',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const currentStatus = row.original.status;
                const handleStatusChange = () => {
                    updateSupplierStatus({
                        id: row.original._id,
                        status: currentStatus === 'active' ? 'inactive' : 'active',
                    });
                };
                return (
                    <span
                        onClick={handleStatusChange}
                        className={`cursor-pointer px-3 py-1 rounded-full text-sm font-semibold ${currentStatus === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
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
                            onClick={() => navigate(`/supplier-page/${row.original._id}`)}
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
                            onClick={() => handleBlockSupplier(row.original._id, isBlocked)}
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
    }, [isSuccess, searchData]);

    if (isLoading) return <Loader />;

    return (
        <>
            {statusUpdateSuccess && <Toast type="success" message={statusMessage?.message} />}
            {statusUpdateError && <Toast type="error" message={statusError as string} />}

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2 mt-5">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                    <h2 className="text-lg font-bold">Suppliers</h2>
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
                        onClick={() => navigate('/supplier-page')}
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
                            totalPages={searchData?.pagination?.totalPages}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SupplierTable;
