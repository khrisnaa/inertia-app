import AvatarInput from '@/Components/AvatarInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { User } from '@/types';
import { Transition } from '@headlessui/react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user as User;

    const {
        data,
        setData,
        post,
        patch,
        put,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        router.post(route('profile.update'), {
            _method: 'patch',
            ...data,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-secondary text-lg font-medium">
                    Profile Information
                </h2>

                <p className="text-secondary mt-1 text-sm">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form
                onSubmit={submit}
                encType="multipart/form-data"
                className="mt-6 w-full space-y-6"
            >
                <div>
                    <AvatarInput
                        id="avatar"
                        name="avatar"
                        className="mt-1 block w-full"
                        defaultValue={user.avatar}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            setData('avatar', file || null);
                        }}
                    />

                    <InputError className="mt-2" message={errors.avatar} />
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="off"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="username" value="Username" />

                        <TextInput
                            id="username"
                            className="mt-1 block w-full"
                            value={data.username}
                            onChange={(e) =>
                                setData('username', e.target.value)
                            }
                            required
                            isFocused
                            autoComplete="off"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.username}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="off"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button disabled={processing} variant="secondary">
                        Save
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-secondary text-sm">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
