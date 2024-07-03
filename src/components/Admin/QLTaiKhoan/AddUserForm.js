import React, { useState } from "react";
import API_ENDPOINTS from "../../../api/user";

const AddUserForm = ({ setShowAddUserForm, fetchUsers }) => {
  const [formData, setFormData] = useState({
    tenNguoiDung: "",
    matKhau: "",
    email: "",
    ngaySinh: "",
    gioiTinh: "",
    anhDaiDien: "",
    trangThai: true,
    daXoa: false,
    soDeCu: 0,
    soXu: 0,
    soChiaKhoa: 0,
    vip: false,
    ngayHetHanVip: "",
    maQuyen: 2,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_ENDPOINTS.AddUserByAdmin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Thêm người dùng không thành công");
      }

      const data = await response.json();
      console.log("Thêm người dùng thành công:", data);

      // Reset form data
      setFormData({
        tenNguoiDung: "",
        matKhau: "",
        email: "",
        ngaySinh: "",
        gioiTinh: "",
        anhDaiDien: "",
        trangThai: true,
        daXoa: false,
        soDeCu: 0,
        soXu: 0,
        soChiaKhoa: 0,
        vip: false,
        ngayHetHanVip: "",
        maQuyen: 2,
      });

      // Đóng form sau khi thêm thành công
      setShowAddUserForm(false);

      // Cập nhật lại danh sách người dùng
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
        <button
          onClick={() => setShowAddUserForm(false)}
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">Thêm tài khoản mới</h2>
        <form onSubmit={handleSubmit}>
          {/* Form content */}
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
