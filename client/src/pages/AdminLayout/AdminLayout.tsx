
import { Outlet } from 'react-router-dom'

import Sidebar from './Sidebar'

const AdminLayout = () => {
    return <>

        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                {/* <Navbar /> */}
                <main className="p-4 overflow-y-auto flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    </>
}

export default AdminLayout
