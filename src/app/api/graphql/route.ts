import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { NextRequest } from 'next/server';

// 模拟数据
let users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com' },
];

let posts = [
  { id: '1', title: 'First Post', content: 'Hello World', authorId: '1' },
  { id: '2', title: 'Second Post', content: 'GraphQL is awesome', authorId: '2' },
  { id: '3', title: 'Third Post', content: 'Next.js + TypeScript', authorId: '3' },
];

// 定义Schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    # 用户相关操作
    createUser(name: String!, email: String!): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): Boolean
    
    # 文章相关操作
    createPost(title: String!, content: String!, authorId: ID!): Post
    updatePost(id: ID!, title: String, content: String): Post
    deletePost(id: ID!): Boolean
  }
`;

// 定义Resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (_: any, { id }: { id: string }) => users.find(user => user.id === id),
    posts: () => posts,
    post: (_: any, { id }: { id: string }) => posts.find(post => post.id === id),
  },
  User: {
    posts: (user: any) => posts.filter(post => post.authorId === user.id),
  },
  Post: {
    author: (post: any) => users.find(user => user.id === post.authorId),
  },
  Mutation: {
    // 用户相关操作
    createUser: (_: any, { name, email }: { name: string; email: string }) => {
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        email,
      };
      users.push(newUser);
      return newUser;
    },
    updateUser: (_: any, { id, name, email }: { id: string; name?: string; email?: string }) => {
      const user = users.find(u => u.id === id);
      if (!user) throw new Error('User not found');
      if (name) user.name = name;
      if (email) user.email = email;
      return user;
    },
    deleteUser: (_: any, { id }: { id: string }) => {
      const index = users.findIndex(u => u.id === id);
      if (index === -1) throw new Error('User not found');
      users.splice(index, 1);
      // 同时删除该用户的所有文章
      const postIndices = posts.reduce((indices: number[], post, i) => {
        if (post.authorId === id) indices.push(i);
        return indices;
      }, []);
      // 从后往前删除，避免索引偏移
      for (let i = postIndices.length - 1; i >= 0; i--) {
        posts.splice(postIndices[i], 1);
      }
      return true;
    },

    // 文章相关操作
    createPost: (_: any, { title, content, authorId }: { title: string; content: string; authorId: string }) => {
      const user = users.find(u => u.id === authorId);
      if (!user) throw new Error('Author not found');
      const newPost = {
        id: (posts.length + 1).toString(),
        title,
        content,
        authorId,
      };
      posts.push(newPost);
      return newPost;
    },
    updatePost: (_: any, { id, title, content }: { id: string; title?: string; content?: string }) => {
      const post = posts.find(p => p.id === id);
      if (!post) throw new Error('Post not found');
      if (title) post.title = title;
      if (content) post.content = content;
      return post;
    },
    deletePost: (_: any, { id }: { id: string }) => {
      const index = posts.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Post not found');
      posts.splice(index, 1);
      return true;
    },
  },
};

// 创建Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 导出Next.js API handler
const handler = startServerAndCreateNextHandler<NextRequest>(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}