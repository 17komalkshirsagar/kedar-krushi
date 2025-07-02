import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import * as ToastPrimitives from "@radix-ui/react-toast"
import { Briefcase } from 'lucide-react';
import {
    useBlockCompanyMutation,
    useDeleteCompanyMutation,
    useGetAllCompaniesQuery,
    useUpdateCompanyStatusMutation,
} from '../../redux/apis/company.api';
import { Toast } from '../../components/ui/toast';
import Loader from '../../components/ui/Loader';
import TableData from '../../components/ui/TableData';
import { useDebounce } from '../../utils/useDebounce';

const CompanyTable = () => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [tableData, setTableData] = useState<any[]>([]);

    const { data: searchData, isLoading, isSuccess, refetch } = useGetAllCompaniesQuery({
        searchQuery: debouncedSearchQuery.toLowerCase(),
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
    });

    const [blockCompany] = useBlockCompanyMutation();
    const [deleteCompany] = useDeleteCompanyMutation();
    const [
        updateStatus,
        {
            data: statusMessage,
            error: statusError,
            isSuccess: statusUpdateSuccess,
            isError: statusUpdateError,
        },
    ] = useUpdateCompanyStatusMutation();

    const fetchData = async () => {
        if (isSuccess) {
            setTableData(searchData.result);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteCompany(id);
    };
    const handleBlockCompany = async (id: string, currentBlockStatus: boolean) => {
        try {
            const response = await blockCompany(id);
            console.log(currentBlockStatus ? "Company unblocked" : "Company blocked", response);
            await refetch();
        } catch (error) {
            console.error("Failed to toggle company block status", error);
        }
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'name',
            header: 'Company Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'mobile',
            header: 'Phone Number',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'address',
            header: 'City',
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
                            onClick={() => navigate(`/company-page/${row.original._id}`)}
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
                            onClick={() => handleBlockCompany(row.original._id, isBlocked)}
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
            {statusUpdateSuccess && <Toast type="success" message={statusMessage} />}
            {statusUpdateError && <Toast type="error" message={statusError as string} />}

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2 mb-2 mt-5">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                    <h2 className="text-lg font-bold">Companies</h2>
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
                        onClick={() => navigate('/company/add')}
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

export default CompanyTable;
