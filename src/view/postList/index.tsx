"use client";

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_POSTS, GET_POST } from "../../graphQL/Posts";
import { GET_USER_TEST } from 'graphQL/graphQL/User';


const PostList = () => {
  const { loading, error, data } = useQuery<{ posts: { id: string; title: string; content: string; author: { id: string; name: string; email: string } }[] }>(GET_POSTS);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const { data: postData } = useQuery<{ post: { id: string; title: string; content: string; author: { id: string; name: string; email: string } } }>(GET_POST, {
    variables: { id: selectedPostId || '' },
    skip: !selectedPostId,
  });

  // useQuery(GET_USER_TEST);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return (
    <div className="section">
      <h2>文章列表</h2>
      <ul className="list">
        {data?.posts.map((post: any) => (
          <li 
            key={post.id} 
            className={selectedPostId === post.id ? 'active' : ''}
            onClick={() => setSelectedPostId(post.id)}
          >
            {post.title} (作者: {post.author.name})
          </li>
        ))}
      </ul>
      
      {postData?.post && (
        <div className="post-details">
          <h3>{postData.post.title}</h3>
          <p>{postData.post.content}</p>
          <p>作者: {postData.post.author.name} ({postData.post.author.email})</p>
        </div>
      )}
    </div>
  );
};

export default PostList;