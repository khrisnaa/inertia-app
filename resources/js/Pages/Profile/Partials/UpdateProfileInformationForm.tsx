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
    console.log(user);
    const role = user.roles[0].name;

    const { data, setData, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: null as File | null,
        ...(role == 'artisan' && {
            bio: user.artisan?.bio || '',
            location: user.artisan?.location || '',
            phone: user.artisan?.phone || '',
            instagram_url: user.artisan?.instagram_url || '',
            facebook_url: user.artisan?.facebook_url || '',
            twitter_url: user.artisan?.twitter_url || '',
            pinterest_url: user.artisan?.pinterest_url || '',
        }),
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
                <h2 className="text-lg font-medium text-secondary">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-secondary">
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

                {role == 'artisan' && (
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <InputLabel htmlFor="bio" value="Bio" />
                            <TextInput
                                id="bio"
                                className="mt-1 block w-full"
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                required
                                isFocused
                                autoComplete="off"
                            />
                            <InputError className="mt-2" message={errors.bio} />
                        </div>

                        <div>
                            <InputLabel htmlFor="location" value="Location" />
                            <TextInput
                                id="location"
                                className="mt-1 block w-full"
                                value={data.location}
                                onChange={(e) =>
                                    setData('location', e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="off"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.location}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="phone" value="Phone" />
                            <TextInput
                                id="phone"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                required
                                autoComplete="off"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.phone}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="instagram_url"
                                value="Instagram URL"
                            />
                            <TextInput
                                id="instagram_url"
                                className="mt-1 block w-full"
                                value={data.instagram_url}
                                onChange={(e) =>
                                    setData('instagram_url', e.target.value)
                                }
                                autoComplete="off"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.instagram_url}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="facebook_url"
                                value="Facebook URL"
                            />
                            <TextInput
                                id="facebook_url"
                                className="mt-1 block w-full"
                                value={data.facebook_url}
                                onChange={(e) =>
                                    setData('facebook_url', e.target.value)
                                }
                                autoComplete="off"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.facebook_url}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="twitter_url"
                                value="Twitter URL"
                            />
                            <TextInput
                                id="twitter_url"
                                className="mt-1 block w-full"
                                value={data.twitter_url}
                                onChange={(e) =>
                                    setData('twitter_url', e.target.value)
                                }
                                autoComplete="off"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.twitter_url}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="pinterest_url"
                                value="Pinterest URL"
                            />
                            <TextInput
                                id="pinterest_url"
                                className="mt-1 block w-full"
                                value={data.pinterest_url}
                                onChange={(e) =>
                                    setData('pinterest_url', e.target.value)
                                }
                                autoComplete="off"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.pinterest_url}
                            />
                        </div>
                    </div>
                )}

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
                        <p className="text-sm text-secondary">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
