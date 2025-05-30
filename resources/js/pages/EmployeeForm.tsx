import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { FaSave, FaTimes } from 'react-icons/fa'; // ใช้ไอคอนเพิ่มความสวย

type EmployeeFormProps = {
  employee?: {
    id: number;
    name: string;
    position: string;
    salary: number;
    department: string;
    photo?: string;
  };
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee }) => {
  const [name, setName] = useState(employee?.name || '');
  const [position, setPosition] = useState(employee?.position || '');
  const [salary, setSalary] = useState(employee?.salary.toString() || '');
  const [department, setDepartment] = useState(employee?.department || '');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState(employee?.photo ? `/storage/${employee.photo}` : null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfilePhoto(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('salary', salary);
    formData.append('department', department);
    if (profilePhoto) {
      formData.append('photo', profilePhoto);
    }

    const url = employee
      ? `/employees/${employee.id}?_method=PUT`
      : '/employees';

    Inertia.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">{employee ? 'แก้ไขข้อมูลพนักงาน' : 'เพิ่มพนักงานใหม่'}</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">ชื่อ</label>
                <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">ตำแหน่ง</label>
                <input type="text" className="form-control" value={position} onChange={e => setPosition(e.target.value)} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">เงินเดือน</label>
                <input type="number" step="0.01" className="form-control" value={salary} onChange={e => setSalary(e.target.value)} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">แผนก</label>
                <input type="text" className="form-control" value={department} onChange={e => setDepartment(e.target.value)} required />
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label">รูปโปรไฟล์</label>
                <input type="file" accept="image/*" className="form-control" onChange={handlePhotoChange} />
                {preview && (
                  <div className="mt-3 text-center">
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        width: 120,
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: '50%',
                        border: '2px solid #ccc',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="submit" className="btn btn-success">
                <FaSave className="me-1" />
                {employee ? 'บันทึกการแก้ไข' : 'เพิ่มพนักงาน'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => Inertia.visit('/employees')}>
                <FaTimes className="me-1" />
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
