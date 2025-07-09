import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { ReactNode } from 'react';

const Protected = ({ roles = ['admin'], compo, }: { roles?: string[]; compo: ReactNode; }) => {
    const { admin } = useSelector((state: RootState) => state.auth);

    if (!admin) {
        return <Navigate to="/login" replace />;
    }

    return roles.includes(admin.role)
        ? <>{compo}</>
        : <Navigate to="/unauthorized" replace />;
};

export default Protected;
