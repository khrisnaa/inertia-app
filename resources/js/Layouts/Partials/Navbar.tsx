import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';

const Navbar = () => {
    const user = usePage().props.auth.user as User;

    return (
        <div className="relative flex w-full justify-between">
            <nav className="flex gap-4 text-xs font-light uppercase">
                <Link
                    href="#"
                    className="transition-colors duration-500 hover:font-normal"
                >
                    Shop
                </Link>
                <Link
                    href="#"
                    className="transition-colors duration-500 hover:font-normal"
                >
                    New Collection
                </Link>
                <Link
                    href="#"
                    className="transition-colors duration-500 hover:font-normal"
                >
                    Catalog
                </Link>
            </nav>
            <div className="absolute left-1/2 -translate-x-1/2">
                <Link href="/" className="uppercase tracking-widest">
                    THE REXUS
                </Link>
            </div>
            {user ? (
                <nav className="flex gap-4 text-xs font-light uppercase">
                    <Link
                        href="#"
                        className="transition-colors duration-500 hover:font-normal"
                    >
                        Cart
                    </Link>
                    <Link
                        href={route('profile.edit')}
                        className="transition-colors duration-500 hover:font-normal"
                    >
                        Profile
                    </Link>
                </nav>
            ) : (
                <nav className="flex gap-4 text-xs font-light uppercase">
                    <Link
                        href={route('login')}
                        className="transition-colors duration-500 hover:font-normal"
                    >
                        Login
                    </Link>
                    <Link
                        href={route('register')}
                        className="transition-colors duration-500 hover:font-normal"
                    >
                        Register
                    </Link>
                </nav>
            )}
        </div>
    );
};

export default Navbar;
