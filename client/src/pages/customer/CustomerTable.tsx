import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { Briefcase } from 'lucide-react';
import { toast } from 'sonner';

import {
    useGetAllCustomersQuery,
    useDeleteCustomerMutation,
    useUpdateCustomerStatusMutation,
    useBlockCustomerMutation
} from '../../redux/apis/customer.api';

import { Toast } from '../../components/ui/toast';
import Loader from '../../components/ui/Loader';
import TableData from '../../components/ui/TableData';
import { useDebounce } from '../../utils/useDebounce';
const CustomerTable = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [tableData, setTableData] = useState<any[]>([]);


    const { data: searchData, isLoading, isSuccess, refetch } = useGetAllCustomersQuery({
        searchQuery: debouncedSearchQuery.toLowerCase(),
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
    });
    const [expandedCustomerId, setExpandedCustomerId] = useState<string | null>(null);

    const [blockCustomer, { isSuccess: isBlockSuccess, isError: isBlockError, isLoading: isBlockLoading }] = useBlockCustomerMutation();
    const [deleteCustomer, { isSuccess: isDeleteSuccess, isError: isDeleteError, isLoading: isDeleteLoading }] = useDeleteCustomerMutation();
    const [
        updateCustomerStatus,
        {
            data: statusMessage,
            error: statusError,
            isSuccess: statusUpdateSuccess,
            isError: statusUpdateError,
        },
    ] = useUpdateCustomerStatusMutation();

    const fetchData = () => {
        if (isSuccess) {
            setTableData(searchData.result);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteCustomer(id);
    };
    const handleBlockCustomer = async (id: string, currentBlockStatus: boolean) => {
        try {
            const response = await blockCustomer(id);
            console.log(currentBlockStatus ? "Customer unblocked" : "Customer blocked", response);

            await refetch();
        } catch (error) {
            console.error("Failed to toggle customer block status", error);
        }
    };



    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'name',
            header: 'Customer Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'mobile',
            header: 'Phone Number',
            cell: (info) => info.getValue(),
        },
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
                    updateCustomerStatus({
                        id: row.original._id,
                        status: currentStatus === 'active' ? 'inactive' : 'active',
                    });
                };
                useEffect(() => {
                    if (isBlockSuccess) {
                        toast.success("Customer blocked successfully");
                    }
                }, [isBlockSuccess]);
                useEffect(() => {
                    if (isDeleteSuccess) {
                        toast.success("Customer deleted successfully");
                    }
                }, [isDeleteSuccess]);
                useEffect(() => {
                    if (isBlockError) {
                        toast.error(" Failed to block Customer");
                    }
                }, [isBlockError]);

                useEffect(() => {
                    if (isDeleteError) {
                        toast.error(" Customer delete successfully");
                    }
                }, [isDeleteError,]);

                useEffect(() => {
                    if (isBlockLoading) {
                        toast.info("Blocking Customer...",)
                    }
                }, [isBlockLoading]);


                useEffect(() => {
                    if (isDeleteLoading) {
                        toast.info("Blocking Customer...",);

                    }
                }, [isDeleteLoading]);
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
                //const customerId = row.original._id;

                return (
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(`/admin/customer/${row.original._id}`)}
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
                            onClick={() => handleBlockCustomer(row.original._id, isBlocked)}
                            className={`font-medium ${isBlocked ? 'text-green-600' : 'text-yellow-600'}`}
                        >
                            {isBlocked ? 'Unblock' : 'Block'}
                        </button>
                        <button
                            onClick={() => navigate('/admin/notification', {
                                state: { customerId: row.original._id }
                            })}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Notify
                        </button>


                    </div>
                );
            }
        }

    ];

    useEffect(() => {
        fetchData();
    }, [isSuccess, searchData]);

    if (isLoading) return <Loader />;

    return (
        <>
            {statusUpdateSuccess && <Toast type="success" message={statusMessage.message} />}
            {statusUpdateError && <Toast type="error" message={statusError as string} />}

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2 mt-5">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                    <h2 className="text-lg font-bold">Customers</h2>
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
                        onClick={() => navigate('/admin/customer')}
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
                            expandedCustomerId={expandedCustomerId}
                            onExpand={(id: any) => setExpandedCustomerId(prev => (prev === id ? null : id))}
                        />

                    </div>
                </div>
            </div>
        </>
    );
};


export default CustomerTable


