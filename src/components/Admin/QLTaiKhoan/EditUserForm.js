import React, { useState } from "react";
import API_ENDPOINTS from "../../../api/user";

const EditUserForm = ({ userToEdit, setShowEditUserForm, fetchUsers }) => {
  const [formData, setFormData] = useState({
    tenNguoiDung: userToEdit.tenNguoiDung,
    matKhau: "",
    email: userToEdit.email,
    ngaySinh: userToEdit.ngaySinh,
    gioiTinh: userToEdit.gioiTinh,
    anhDaiDien: userToEdit.anhDaiDien,
    trangThai: userToEdit.trangThai,
    daXoa: userToEdit.daXoa,
    soDeCu: userToEdit.soDeCu,
    soXu: userToEdit.soXu,
    soChiaKhoa: userToEdit.soChiaKhoa,
    vip: userToEdit.vip,
    ngayHetHanVip: userToEdit.ngayHetHanVip,
    maQuyen: userToEdit.maQuyen,
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
      const response = await fetch(API_ENDPOINTS.SuaTaikhoanByAdmin, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Cập nhật người dùng không thành công");
      }

      const data = await response.json();
      console.log("Cập nhật người dùng thành công:", data);

      // Đóng form sau khi cập nhật thành công
      setShowEditUserForm(false);

      // Cập nhật lại danh sách người dùng
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
        <button
          onClick={() => setShowEditUserForm(false)}
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">Sửa thông tin tài khoản</h2>
        <form onSubmit={handleSubmit}>
          {/* Form content */}
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
