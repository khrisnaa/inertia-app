import { PropsWithChildren } from 'react';
import Navbar from './Partials/Navbar';

const MainLayout = ({ children }: PropsWithChildren) => {
    return (
        <main className="bg-primary text-secondary relative min-h-screen">
            <div className="fixed top-0 flex h-16 w-full items-center px-12">
                <Navbar />
            </div>
            <div className="pt-16">{children}</div>
        </main>
    );
};

export default MainLayout;
