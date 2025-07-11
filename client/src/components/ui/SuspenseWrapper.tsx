
import { Suspense } from 'react';

const Loader = () => (
    <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
    </div>
);

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => {
    return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default SuspenseWrapper;
