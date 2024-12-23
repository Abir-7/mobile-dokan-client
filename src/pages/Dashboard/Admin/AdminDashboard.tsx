/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../redux/api/authApi/authApi";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { data } = useGetAllUsersQuery("");

  const [openModal, setOpenModal] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null);

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDeleteClick = (email: string) => {
    setEmailToDelete(email); // Store email for deletion
    setOpenModal(true); // Open modal when delete button is clicked
  };

  const confirmDelete = async () => {
    console.log(emailToDelete, "emailToDelete");
    if (emailToDelete) {
      const response = await deleteUser({ data: emailToDelete }); // Trigger delete mutation with email
      if (response?.data?.success) {
        toast.success("User deleted successfully");
      }
      setOpenModal(false); // Close modal after deletion
    }
  };

  const cancelDelete = () => {
    setOpenModal(false); // Close modal without deleting
  };

  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((user: any) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDeleteClick(user.email)} // Pass email for deletion
                >
                  Delete
                </button>
                {/* Option to set as seller if user is a customer */}
                {user.role === "customer" && (
                  <button className="btn btn-primary btn-sm ml-2">
                    Set as Seller
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {openModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl">
              Are you sure you want to delete the user with email:{" "}
              {emailToDelete}?
            </h2>
            <div className="modal-action">
              <button className="btn" onClick={cancelDelete}>
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={confirmDelete}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
