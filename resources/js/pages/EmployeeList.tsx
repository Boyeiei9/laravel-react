import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { FaSearch, FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';

type Employee = {
  id: number;
  name: string;
  position: string;
  salary: number;
  department: string;
  photo?: string;
};

type Props = {
  employees: Employee[];
  filters: {
    search?: string;
    department?: string;
    position?: string;
  };
  flash?: {
    success?: string;
  };
};

const EmployeeList: React.FC<Props> = ({ employees, filters, flash }) => {
  const [search, setSearch] = useState(filters.search || '');
  const [department, setDepartment] = useState(filters.department || '');
  const [position, setPosition] = useState(filters.position || '');

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (department) params.append('department', department);
    if (position) params.append('position', position);

    window.location.href = `/employees?${params.toString()}`;
  };

  const handleDelete = (id: number) => {
    if (!confirm('ต้องการลบพนักงานคนนี้หรือไม่?')) return;
    Inertia.delete(`/employees/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">📋 รายชื่อพนักงาน</h2>

      {flash?.success && (
        <div className="alert alert-success">{flash.success}</div>
      )}

      {/* Filter Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="ค้นหาชื่อ"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="แผนก"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="ตำแหน่ง"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="col-md-3 d-flex gap-2">
              <button className="btn btn-primary w-50" onClick={handleFilter}>
                <FaSearch className="me-1" /> ค้นหา
              </button>
              <button
                className="btn btn-success w-50"
                onClick={() => Inertia.visit('/employees/create')}
              >
                <FaUserPlus className="me-1" /> เพิ่มพนักงาน
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th className="text-center">รูปโปรไฟล์</th>
              <th>ชื่อ</th>
              <th>ตำแหน่ง</th>
              <th>เงินเดือน</th>
              <th>แผนก</th>
              <th className="text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  ไม่มีข้อมูลพนักงาน
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td className="text-center">
                    {emp.photo ? (
                      <img
                        src={`/storage/${emp.photo}`}
                        alt={emp.name}
                        className="rounded-circle"
                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                      />
                    ) : (
                      <span className="text-muted">ไม่มีรูป</span>
                    )}
                  </td>
                  <td>{emp.name}</td>
                  <td>{emp.position}</td>
                  <td>{emp.salary.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td>{emp.department}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => Inertia.visit(`/employees/${emp.id}/edit`)}
                    >
                      <FaEdit /> แก้ไข
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(emp.id)}
                    >
                      <FaTrash /> ลบ
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
