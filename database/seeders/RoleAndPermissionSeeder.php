<?php

namespace Database\Seeders;

use App\Models\Artisan;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            //  Permissions untuk Member dan Artisan
            'buy product',

            // Permissions untuk Admin dan Artisan
            'create product',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $adminRole = Role::create(['name' => 'admin']);
        $artisanRole = Role::create(['name' => 'artisan']);
        $memberRole = Role::create(['name' => 'member']);

        $memberRole->givePermissionTo('buy product');

        $artisanRole->givePermissionTo(['buy product', 'create product']);

        $adminRole->givePermissionTo(['create product']);

        $adminUser = User::create([
            'name' => 'Admin',
            'username' => "admin",
            'email' => 'admin@example.com',
            'password' => bcrypt('Admin123'),
            'email_verified_at' => now()
        ]);
        $adminUser->assignRole('admin');

        // Membuat Artisan
        $artisanUser = User::create([
            'id' => \Illuminate\Support\Str::uuid(),
            'name' => 'John Doe',
            'username' => 'artisan_john',
            'email' => 'artisan@example.com',
            'password' => bcrypt('Artisan123'),
            'email_verified_at' => now()
        ]);
        $artisanUser->assignRole('artisan');

        Artisan::create([
            'id' => \Illuminate\Support\Str::uuid(),
            'user_id' => $artisanUser->id,
            'bio'            => 'Seorang pengrajin sepatu handmade.',
            'location'       => 'Bali, Indonesia',
            'phone'          => '08123456789',
            'instagram_url'  => 'https://instagram.com/artisan_john',
            'facebook_url'   => 'https://facebook.com/artisan_john',
            'twitter_url'    => 'https://twitter.com/artisan_john',
            'pinterest_url'  => 'https://pinterest.com/artisan_john',


        ]);

        $memberUser = User::create([
            'id' => \Illuminate\Support\Str::uuid(),
            'name' => 'Jane Smith',
            'username' => 'member_jane',
            'email' => 'member@example.com',
            'password' => bcrypt('Member123'),
            'email_verified_at' => now()
        ]);
        $memberUser->assignRole('member');
    }
}
