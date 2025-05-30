<?php

namespace App\Http\Controllers\Api;


use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class EmployeeController extends Controller
{
    // แสดงรายการพนักงาน พร้อมฟิลเตอร์ ค้นหา
    public function index(Request $request)
    {
        $query = Employee::query();

        if ($request->department) {
            $query->where('department', $request->department);
        }
        if ($request->position) {
            $query->where('position', $request->position);
        }
        if ($request->search) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        $employees = $query->get();

        return Inertia::render('EmployeeList', [
            'employees' => $employees,
            'filters' => $request->only(['search', 'department', 'position']),
        ]);
    }

    // แสดงฟอร์มเพิ่มพนักงาน
    public function create()
    {
        return Inertia::render('EmployeeForm');
    }

    // บันทึกพนักงานใหม่
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'salary' => 'required|numeric',
            'department' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['name', 'position', 'salary', 'department']);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('photos', 'public');
        }

        Employee::create($data);

        return redirect()->route('employees.index')->with('success', 'เพิ่มพนักงานสำเร็จ');
    }

    // แสดงฟอร์มแก้ไข
    public function edit(Employee $employee)
    {
        return Inertia::render('EmployeeForm', [
            'employee' => $employee,
        ]);
    }

    // อัปเดตข้อมูลพนักงาน
    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'salary' => 'required|numeric',
            'department' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['name', 'position', 'salary', 'department']);

        if ($request->hasFile('photo')) {
            if ($employee->photo) {
                Storage::disk('public')->delete($employee->photo);
            }
            $data['photo'] = $request->file('photo')->store('photos', 'public');
        }

        $employee->update($data);

        return redirect()->route('employees.index')->with('success', 'แก้ไขข้อมูลสำเร็จ');
    }

    // ลบพนักงาน
    public function destroy(Employee $employee)
    {
        if ($employee->profile_photo) {
            Storage::disk('public')->delete($employee->profile_photo);
        }
        $employee->delete();

        return redirect()->route('employees.index')->with('success', 'ลบพนักงานสำเร็จ');
    }
}
