import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { Briefcase } from 'lucide-react';

import Loader from '../../components/ui/Loader';
import TableData from '../../components/ui/TableData';
import { Toast } from '../../components/ui/toast';
import { useDebounce } from '../../utils/useDebounce';
import {
    useGetAllDeliveriesQuery,
    useDeleteDeliveryMutation,
    useUpdateDeliveryStatusMutation,
    useBlockDeliveryMutation
} from '../../redux/apis/delivery.api';

const DeliveryTable = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [tableData, setTableData] = useState<any[]>([]);

    const { data: deliveries, isLoading, isSuccess, refetch } = useGetAllDeliveriesQuery({
        searchQuery: debouncedSearchQuery.toLowerCase(),
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
    });

    const [deleteDelivery] = useDeleteDeliveryMutation();
    const [blockDelivery] = useBlockDeliveryMutation();
    const [updateDeliveryStatus, {
        data: statusMessage,
        error: statusError,
        isSuccess: statusUpdateSuccess,
        isError: statusUpdateError,
    }] = useUpdateDeliveryStatusMutation();

    const fetchData = () => {
        if (isSuccess) {
            setTableData(deliveries.result);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteDelivery(id);
        refetch();
    };

    const handleBlockDelivery = async (id: string, currentBlockStatus: boolean) => {
        try {
            const response = await blockDelivery(id);
            console.log(currentBlockStatus ? "Delivery unblocked" : "Delivery blocked", response);
            await refetch();
        } catch (error) {
            console.error("Failed to toggle delivery block status", error);
        }
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'address',
            header: 'Address',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const currentStatus = row.original.status;
                const handleStatusChange = () => {
                    const nextStatus = currentStatus === 'Pending' ? 'Delivered' : 'Pending';
                    updateDeliveryStatus({
                        id: row.original._id,
                        data: { status: nextStatus }
                    });
                };
                return (
                    <span
                        onClick={handleStatusChange}
                        className={`cursor-pointer px-3 py-1 rounded-full text-sm font-semibold ${currentStatus === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'}`}
                    >
                        {currentStatus}
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
                            onClick={() => navigate(`/delivery-page/${row.original._id}`)}
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
                            onClick={() => handleBlockDelivery(row.original._id, isBlocked)}
                            className={`font-medium ${isBlocked ? 'text-green-600' : 'text-yellow-600'}`}
                        >
                            {isBlocked ? 'Unblock' : 'Block'}
                        </button>
                    </div>
                );
            }
        }
    ];

    useEffect(() => {
        fetchData();
    }, [isSuccess, deliveries]);

    if (isLoading) return <Loader />;

    return (
        <>
            {statusUpdateSuccess && <Toast type="success" message={statusMessage.message} />}
            {statusUpdateError && <Toast type="error" message={statusError as string} />}

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2 mt-5">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                    <h2 className="text-lg font-bold">Deliveries</h2>
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
                        onClick={() => navigate('/delivery/add')}
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
                            totalPages={deliveries?.pagination?.totalPages}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeliveryTable;
