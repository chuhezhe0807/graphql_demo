import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_POSTS, GET_USERS, CREATE_POST, UPDATE_POST, DELETE_POST } from '../../graphQL/User';

const PostManagement = () => {
  const { data: postsData, refetch: refetchPosts } = useQuery<{ posts: { id: string; title: string; content: string; author: { id: string; name: string } }[] }>(GET_POSTS);
  const { data: usersData } = useQuery<{ users: { id: string; name: string }[] }>(GET_USERS);
  const [createPost] = useMutation(CREATE_POST);
  const [updatePost] = useMutation(UPDATE_POST);
  const [deletePost] = useMutation(DELETE_POST);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<{ id: string; title: string; content: string; authorId: string } | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '', authorId: '' });

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost({ variables: formData });
      refetchPosts();
      setFormData({ title: '', content: '', authorId: usersData?.users[0]?.id || '' });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('创建文章失败:', error);
    }
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost) return;
    try {
      await updatePost({ variables: { id: currentPost.id, title: formData.title, content: formData.content } });
      refetchPosts();
      setIsUpdateModalOpen(false);
      setCurrentPost(null);
      setFormData({ title: '', content: '', authorId: usersData?.users[0]?.id || '' });
    } catch (error) {
      console.error('更新文章失败:', error);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('确定要删除这篇文章吗？')) {
      try {
        await deletePost({ variables: { id } });
        refetchPosts();
      } catch (error) {
        console.error('删除文章失败:', error);
      }
    }
  };

  const openUpdateModal = (post: { id: string; title: string; content: string; author: { id: string } }) => {
    setCurrentPost({ 
      id: post.id, 
      title: post.title, 
      content: post.content, 
      authorId: post.author.id 
    });
    setFormData({ title: post.title, content: post.content, authorId: post.author.id });
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="section">
      <div className="flex justify-between items-center mb-4">
        <h2>文章管理</h2>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          创建文章
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">标题</th>
            <th className="border p-2">作者</th>
            <th className="border p-2">操作</th>
          </tr>
        </thead>
        <tbody>
          {postsData?.posts.map(post => (
            <tr key={post.id}>
              <td className="border p-2">{post.id}</td>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.author.name}</td>
              <td className="border p-2">
                <button 
                  onClick={() => openUpdateModal(post)}
                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-2"
                >
                  修改
                </button>
                <button 
                  onClick={() => handleDeletePost(post.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 创建文章模态框 */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl mb-4">创建文章</h3>
            <form onSubmit={handleCreatePost}>
              <div className="mb-4">
                <label className="block mb-2">标题</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">内容</label>
                <textarea 
                  value={formData.content} 
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full border p-2"
                  rows={4}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">作者</label>
                <select 
                  value={formData.authorId} 
                  onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                  className="w-full border p-2"
                  required
                >
                  <option value="">选择作者</option>
                  {usersData?.users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
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

      {/* 更新文章模态框 */}
      {isUpdateModalOpen && currentPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl mb-4">更新文章</h3>
            <form onSubmit={handleUpdatePost}>
              <div className="mb-4">
                <label className="block mb-2">标题</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">内容</label>
                <textarea 
                  value={formData.content} 
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full border p-2"
                  rows={4}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">作者</label>
                <select 
                  value={formData.authorId} 
                  onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                  className="w-full border p-2"
                  disabled
                >
                  {usersData?.users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
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

export default PostManagement;