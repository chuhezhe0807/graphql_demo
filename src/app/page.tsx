"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from '../graphQL/GraphQLClient';

import UserList from '../view/userList';
import PostList from '../view/postList';
import UserManagement from '../view/userManagement';
import PostManagement from '../view/postManagement';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-between py-16 px-4 bg-white dark:bg-black sm:items-start">
        <ApolloProvider client={client}>
          <div className="container w-full">
            <h1 className="text-3xl font-bold mb-8">Next.js + GraphQL + Apollo Client 演示</h1>
            
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">数据展示</h2>
              <UserList />
              <PostList />
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">数据管理</h2>
              <UserManagement />
              <PostManagement />
            </section>
          </div>
        </ApolloProvider>
      </main>
    </div>
  );
}