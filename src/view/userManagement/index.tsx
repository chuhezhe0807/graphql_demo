import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from '../../graphQL/User';

const UserManagement = () => {
  const { data, refetch } = useQuery<{ users: { id: string; name: string; email: string }[] }>(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({ variables: formData });
      refetch();
      setFormData({ name: '', email: '' });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('创建用户失败:', error);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    try {
      await updateUser({ variables: { id: currentUser.id, ...formData } });
      refetch();
      setIsUpdateModalOpen(false);
      setCurrentUser(null);
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('更新用户失败:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('确定要删除这个用户吗？')) {
      try {
        await deleteUser({ variables: { id } });
        refetch();
      } catch (error) {
        console.error('删除用户失败:', error);
      }
    }
  };

  const openUpdateModal = (user: { id: string; name: string; email: string }) => {
    setCurrentUser(user);
    setFormData({ name: user.name, email: user.email });
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="section">
      <div className="flex justify-between items-center mb-4">
        <h2>用户管理</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          创建用户
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">姓名</th>
            <th className="border p-2">邮箱</th>
            <th className="border p-2">操作</th>
          </tr>
        </thead>
        <tbody>
          {data?.users.map(user => (
            <tr key={user.id}>
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <button
                  onClick={() => openUpdateModal(user)}
                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-2"
                >
                  修改
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 创建用户模态框 */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="create-user-title">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 id="create-user-title" className="text-xl mb-4">创建用户</h3>
            <form onSubmit={handleCreateUser}>
              <div className="mb-4">
                <label htmlFor="create-name" className="block mb-2">姓名</label>
                <input
                  id="create-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="create-email" className="block mb-2">邮箱</label>
                <input
                  id="create-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border p-2"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  创建
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 更新用户模态框 */}
      {isUpdateModalOpen && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="update-user-title">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 id="update-user-title" className="text-xl mb-4">更新用户</h3>
            <form onSubmit={handleUpdateUser}>
              <div className="mb-4">
                <label htmlFor="update-name" className="block mb-2">姓名</label>
                <input
                  id="update-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="update-email" className="block mb-2">邮箱</label>
                <input
                  id="update-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border p-2"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  更新
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;