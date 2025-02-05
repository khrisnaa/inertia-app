import { Config } from 'ziggy-js';

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

export interface Artisan {
    bio: string;
    location: string;
    phone?: string;
    instagram_url?: string;
    facebook_url?: string;
    twitter_url?: string;
    pinterest_url?: string;
}
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    avatar?: string;
    email_verified_at?: string;
    roles: Role[];
    artisan?: Artisan;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
