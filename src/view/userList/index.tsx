"use client";

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_USERS, GET_USER } from "../../graphQL/User";

const UserList = () => {
  const { loading, error, data } = useQuery<{ users: { id: string; name: string; email: string }[] }>(GET_USERS);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { data: userData } = useQuery<{ user: { id: string; name: string; email: string; posts: { id: string; title: string }[] } }>(GET_USER, {
    variables: { id: selectedUserId || '' },
    skip: !selectedUserId,
  });

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return (
    <div className="section">
      <h2>用户列表</h2>
      <ul className="list">
        {data?.users.map((user: any) => (
          <li 
            key={user.id} 
            className={selectedUserId === user.id ? 'active' : ''}
            onClick={() => setSelectedUserId(user.id)}
          >
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
      
      {userData?.user && (
        <div className="user-details">
          <h3>{userData.user.name} 的详细信息</h3>
          <p>邮箱: {userData.user.email}</p>
          <h4>发布的文章:</h4>
          <ul>
            {userData.user.posts.map((post: any) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserList;