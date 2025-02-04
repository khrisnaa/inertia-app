<?php

namespace Database\Seeders;

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
            'username'=> "admin",
            'email' => 'admin@example.com',
            'password' => bcrypt('Admin123'),
        ]);

        $adminUser->assignRole('admin');
    }
}
