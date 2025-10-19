'use client';

import { useState, useEffect } from 'react';
import { UserPlus, Download, RefreshCw } from 'lucide-react';
import { showToast } from '@/lib/toast';
import { api } from '@/lib/api';
import type { User, CreateUserDto, UpdateUserDto, EmailVerificationDetail, PaginationMeta } from '@/types/user';
import UserTable from '@/components/UserTable';
import UserModal from '@/components/UserModal';
import VerificationModal from '@/components/VerificationModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import UserChart from '@/components/UserChart';
import Pagination from '@/components/Pagination';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [verificationData, setVerificationData] = useState<EmailVerificationDetail | null>(null);

  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const fetchUsers = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      const response = await api.users.getAll(page, limit);
      setUsers(response.data);
      setPagination(response.pagination);

      // Fetch all users for the chart (without pagination)
      if (page === 1) {
        const allResponse = await api.users.getAll(1, 1000);
        setAllUsers(allResponse.data);
      }
    } catch (err) {
      showToast.error(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (data: CreateUserDto | UpdateUserDto) => {
    try {
      if (selectedUser) {
        await api.users.update(selectedUser.id, data as UpdateUserDto);
        showToast.success('User updated successfully');
      } else {
        await api.users.create(data as CreateUserDto);
        showToast.success('User created successfully');
      }
      await fetchUsers(currentPage, itemsPerPage);
    } catch (err) {
      showToast.error(err instanceof Error ? err.message : 'Failed to save user');
      throw err; // Re-throw so the modal can handle it
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      await api.users.delete(userToDelete.id);
      showToast.success('User deleted successfully');
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      await fetchUsers(currentPage, itemsPerPage);
    } catch (err) {
      showToast.error(err instanceof Error ? err.message : 'Failed to delete user');
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleVerifyEmail = async (id: string) => {
    try {
      const data = await api.users.verifyEmail(id);
      setVerificationData(data);
      setIsVerificationModalOpen(true);
      showToast.success('Email verification generated');
    } catch (err) {
      showToast.error(err instanceof Error ? err.message : 'Failed to verify email');
    }
  };

  const handleExportUsers = async () => {
    try {
      showToast.loading('Exporting users...', { id: 'export-users' });
      const blob = await api.users.export();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.pb';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showToast.success('Users exported successfully', { id: 'export-users' });
    } catch (err) {
      showToast.error(err instanceof Error ? err.message : 'Failed to export users', { id: 'export-users' });
    }
  };

  const openCreateModal = () => {
    setSelectedUser(null);
    setIsUserModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage users with cryptographic email verification
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <UserPlus size={18} />
              <span>New User</span>
            </button>
            <button
              onClick={handleExportUsers}
              disabled={users.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={18} />
              <span>Export</span>
            </button>
            <button
              onClick={() => fetchUsers(currentPage, itemsPerPage)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats and Chart Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Stats Cards */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-sm font-medium text-gray-600">Total Users</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">{pagination?.total || 0}</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-sm font-medium text-gray-600">Active</div>
                <div className="mt-2 text-3xl font-bold text-green-600">
                  {allUsers.filter(u => u.status === 'active').length}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-sm font-medium text-gray-600">Admins</div>
                <div className="mt-2 text-3xl font-bold text-purple-600">
                  {allUsers.filter(u => u.role === 'admin').length}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-sm font-medium text-gray-600">Inactive</div>
                <div className="mt-2 text-3xl font-bold text-gray-400">
                  {allUsers.filter(u => u.status === 'inactive').length}
                </div>
              </div>
            </div>

            {/* Chart */}
            <UserChart users={allUsers.length > 0 ? allUsers : users} />

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <UserTable
                users={users}
                onEdit={handleEditUser}
                onDelete={handleDeleteClick}
                onVerify={handleVerifyEmail}
              />
              {pagination && (
                <Pagination pagination={pagination} onPageChange={handlePageChange} />
              )}
            </div>
          </div>
        )}
      </div>

      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleCreateUser}
        user={selectedUser}
      />

      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => {
          setIsVerificationModalOpen(false);
          setVerificationData(null);
        }}
        verification={verificationData}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        userEmail={userToDelete?.email || ''}
      />
    </div>
  );
}
