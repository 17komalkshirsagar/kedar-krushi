import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColumnDef, PaginationState } from '@tanstack/react-table'
import { Briefcase } from 'lucide-react'
import { toast } from 'sonner'
import TableData from '../../components/ui/TableData';
import Loader from '../../components/ui/Loader'

import { useDebounce } from '../../utils/useDebounce'

import {
    useGetAllEmployeesQuery,
    useDeleteEmployeeMutation,
    useUpdateEmployeeStatusMutation,
    useBlockEmployeeMutation
} from '../../redux/apis/employee.api'

const EmployeeTable = () => {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const [tableData, setTableData] = useState<any[]>([])

    const { data: employeeData, isLoading, isSuccess, refetch } = useGetAllEmployeesQuery({
        searchQuery: debouncedSearchQuery.toLowerCase(),
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
    })

    const [deleteEmployee, { isSuccess: isDeleteSuccess, error: deleteError }] = useDeleteEmployeeMutation();
    const [blockEmployee, { isSuccess: isBlockSuccess, error: blockError }] = useBlockEmployeeMutation();
    const [updateEmployeeStatus, { isSuccess: isStatusUpdateSuccess, error: statusUpdateError }] = useUpdateEmployeeStatusMutation();

    const fetchData = () => {
        if (isSuccess) {
            setTableData(employeeData.result)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteEmployee(id)
            toast.success("Employee deleted successfully")
            refetch()
        } catch (err) {


            console.log("Failed to delete employee")
        }
    }

    const handleBlockEmployee = async (id: string, isBlocked: boolean) => {
        try {
            await blockEmployee(id)
            refetch()
        } catch (error) {
            toast.error("Failed to toggle block status")
        }
    }

    const handleStatusToggle = async (id: string, currentStatus: string) => {
        try {
            await updateEmployeeStatus({
                id,
                data: {
                    status: currentStatus === 'active' ? 'inactive' : 'active',
                },
            });
            refetch();
        } catch {

            console.log("Failed to update status");
        }
    };

    useEffect(() => {
        if (isDeleteSuccess) {
            toast.success("Employee deleted successfully");
        }
    }, [isDeleteSuccess]);

    useEffect(() => {
        if (isBlockSuccess) {
            toast.success("Employee block/unblock successful");
        }
    }, [isBlockSuccess]);

    useEffect(() => {
        if (isStatusUpdateSuccess) {
            toast.success("Employee status updated");
        }
    }, [isStatusUpdateSuccess]);
    useEffect(() => {
        if (deleteError) {
            toast.error("Failed to delete employee");
        }
    }, [deleteError]);

    useEffect(() => {
        if (blockError) {
            toast.error("Failed to update block status");
        }
    }, [blockError]);

    useEffect(() => {
        if (statusUpdateError) {
            toast.error("Failed to update status");
        }
    }, [statusUpdateError]);

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'name',
            header: 'Employee Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.original.status
                return (
                    <span
                        onClick={() => handleStatusToggle(row.original._id, status)}
                        className={`cursor-pointer px-3 py-1 rounded-full text-sm font-semibold ${status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}
                    >
                        {status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                )
            }
        },
        {
            header: 'Actions',
            cell: ({ row }) => {
                const isBlocked = row.original.isBlock
                return (
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(`/employee-page/${row.original._id}`)}
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
                            onClick={() => handleBlockEmployee(row.original._id, isBlocked)}
                            className={`font-medium ${isBlocked ? 'text-green-600' : 'text-yellow-600'}`}
                        >
                            {isBlocked ? 'Unblock' : 'Block'}
                        </button>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        fetchData()
    }, [isSuccess, employeeData])

    if (isLoading) return <Loader />

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2 mt-5">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                    <h2 className="text-lg font-bold">Employees</h2>
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
                        onClick={() => navigate('/employee-page')}
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
                            totalPages={employeeData?.pagination?.totalPages}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeTable
