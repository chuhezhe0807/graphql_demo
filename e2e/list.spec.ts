import { expect } from '@playwright/test';
import { test } from './fixture';

test.beforeEach(async ({ page }) => {
  page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  // 确保页面标题可见，确认页面已加载
  await expect(page.locator('h1')).toBeVisible();
});

test.describe('列表展示测试 (Midscene)', () => {
  test('查看用户列表及详情', async ({ page, aiAssert }) => {
    // 1. 混合模式：使用 Playwright 快速点击第一个用户
    const firstUser = page.locator('.section:has-text("用户列表") ul.list li').first();
    const userName = (await firstUser.textContent())?.split('(')[0].trim();
    await firstUser.click();

    // 2. 原生验证：检查详情区域是否包含预期文本
    const details = page.locator('.user-details');
    await details.scrollIntoViewIfNeeded();
    await expect(details).toBeVisible();
    await expect(details).toContainText(userName || '');
    await expect(details.locator('h4')).toContainText('发布的文章');

    // 3. 使用ai验证
    await aiAssert('检查详情区域是否包含 "发布的文章"');
  });

  test('查看文章列表及详情', async ({ page, aiAssert }) => {
    // 1. 混合模式：使用 Playwright 快速点击第一篇文章
    const firstPost = page.locator('.section:has-text("文章列表") ul.list li').first();
    const postTitle = (await firstPost.textContent())?.split('(作者:')[0].trim();
    await firstPost.click();

    // 2. 原生验证：检查详情区域是否包含正文内容
    const details = page.locator('.post-details');
    await details.scrollIntoViewIfNeeded();
    await expect(details).toBeVisible();
    await expect(details).toContainText(postTitle || '');
    await expect(details).toContainText('正文：');

    // 3. 使用ai验证
    await aiAssert('检查详情区域是否包含正文内容');
  });
});

