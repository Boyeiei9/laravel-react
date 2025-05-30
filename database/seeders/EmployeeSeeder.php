<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('employees')->insert([
            [
                'name' => 'Amorntep Srisuk',
                'position' => 'Software Engineer',
                'salary' => 45000,
                'department' => 'IT',
                'photo' => 'https://i.pinimg.com/736x/fa/71/fa/fa71fa7ff92a422a9d3ee9dfb48fd861.jpg',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Nattapong Wichai',
                'position' => 'Project Manager',
                'salary' => 55000,
                'department' => 'Management',
                'photo' => 'https://randomuser.me/api/portraits/men/20.jpg',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Sirilak Chaiyo',
                'position' => 'UX Designer',
                'salary' => 40000,
                'department' => 'Design',
                'photo' => 'https://randomuser.me/api/portraits/women/15.jpg',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Somchai Jindarat',
                'position' => 'System Analyst',
                'salary' => 42000,
                'department' => 'IT',
                'photo' => 'https://randomuser.me/api/portraits/men/30.jpg',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Kanya Thongdee',
                'position' => 'HR Officer',
                'salary' => 35000,
                'department' => 'HR',
                'photo' => 'https://randomuser.me/api/portraits/women/25.jpg',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Anucha Kamdee',
                'position' => 'QA Tester',
                'salary' => 38000,
                'department' => 'IT',
                'photo' => 'https://randomuser.me/api/portraits/men/35.jpg',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Sasithorn Meechai',
                'position' => 'Marketing Specialist',
                'salary' => 39000,
                'department' => 'Marketing',
                'photo' => 'https://randomuser.me/api/portraits/women/40.jpg',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Pisit Ruengrit',
                'position' => 'DevOps Engineer',
                'salary' => 47000,
                'department' => 'IT',
                'photo' => 'https://randomuser.me/api/portraits/men/50.jpg',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Ploypailin Arunya',
                'position' => 'Graphic Designer',
                'salary' => 36000,
                'department' => 'Design',
                'photo' => 'https://randomuser.me/api/portraits/women/33.jpg',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Chatchai Sangkha',
                'position' => 'Accountant',
                'salary' => 41000,
                'department' => 'Finance',
                'photo' => 'https://randomuser.me/api/portraits/men/60.jpg',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
