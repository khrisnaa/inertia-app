import MainLayout from '@/Layouts/MainLayout';
import { User } from '@/types';
import { usePage } from '@inertiajs/react';

const Index = () => {
    const user = usePage().props.auth.user as User;
    return (
        <MainLayout>
            <p>{user?.name}</p>
        </MainLayout>
    );
};

export default Index;
