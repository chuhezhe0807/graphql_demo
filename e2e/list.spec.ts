import { expect } from '@playwright/test';
import { test } from './fixture';

test.beforeEach(async ({ page }) => {
  page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
});

test.describe('列表展示测试 (Midscene)', () => {
  test('查看用户列表及详情', async ({ page, ai, aiAssert, aiQuery }) => {
    // 1. 获取并点击第一个用户
    const firstUserName = await aiQuery('string, 获取用户列表中的第一个用户的名字');
    console.log('第一个用户:', firstUserName);
    
    await ai(`点击用户列表中的 "${firstUserName}"`);
    
    // 2. 滚动并验证详情区域
    // 详情区域通常出现在列表下方，可能需要滚动才能完整显示
    await ai('向下滚动以确保能看到详情区域');
    await aiAssert(`详情区域显示了 "${firstUserName}" 的详细信息，包括邮箱和发布的文章`);
  });

  test('查看文章列表及详情', async ({ page, ai, aiAssert, aiQuery }) => {
    // 1. 获取并点击第一篇文章
    const firstPostTitle = await aiQuery('string, 获取文章列表中的第一个文章的标题');
    console.log('第一篇文章:', firstPostTitle);
    
    await ai(`点击文章列表中的 "${firstPostTitle}"`);
    
    // 2. 滚动并验证详情内容
    await ai('向下滚动到详情展示区域');
    await aiAssert(`详情区域显示了文章 "${firstPostTitle}" 的正文内容`);
  });
});

