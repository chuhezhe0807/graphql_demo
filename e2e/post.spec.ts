import { expect } from '@playwright/test';
import { test } from './fixture';

test.beforeEach(async ({ page }) => {
  page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  // 确保页面标题可见，确认页面已加载
  await expect(page.locator('h1')).toBeVisible();
});

test.describe('数据管理测试 (Midscene)', () => {
  test('创建、修改和删除用户', async ({ page }) => {
    // 1. 创建用户
    const userSection = page.locator('div.section, section').filter({ has: page.getByRole('heading', { name: '用户管理' }) });
    await userSection.getByRole('button', { name: '创建用户' }).click();

    // 明确等待模态框可见，使用 getByRole('dialog') 配合 accessible name 更鲁棒
    const createModal = page.getByRole('dialog', { name: '创建用户' });
    await expect(createModal).toBeVisible();

    await createModal.locator('#create-name').fill('Midscene 测试人');
    await createModal.locator('#create-email').fill('midscene@test.com');
    await createModal.getByRole('button', { name: '创建', exact: true }).click();

    // 等待模态框消失
    await expect(createModal).not.toBeVisible();

    // 2. 确认用户创建成功
    await expect(userSection.locator('tr').filter({ hasText: 'Midscene 测试人' })).toBeVisible();

    // 3. 修改用户
    const row = userSection.locator('tr').filter({ hasText: 'Midscene 测试人' });
    await row.getByRole('button', { name: '修改' }).click();

    // 等待修改模态框可见
    const updateModal = page.getByRole('dialog', { name: '更新用户' });
    await expect(updateModal).toBeVisible();

    await updateModal.locator('#update-name').fill('Midscene 已修改');
    await updateModal.getByRole('button', { name: '更新', exact: true }).click();

    // 等待模态框消失
    await expect(updateModal).not.toBeVisible();

    // 4. 确认修改成功
    await expect(userSection.locator('tr').filter({ hasText: 'Midscene 已修改' })).toBeVisible();

    // 5. 删除用户
    page.on('dialog', dialog => dialog.accept());
    await userSection.locator('tr').filter({ hasText: 'Midscene 已修改' }).getByRole('button', { name: '删除' }).click();

    // 6. 最终验证
    await expect(userSection.locator('tr').filter({ hasText: 'Midscene 已修改' })).not.toBeVisible();
  });

  test('创建文章并查看', async ({ page }) => {
    // 1. 在管理区域创建文章
    const postSection = page.locator('div.section').filter({ has: page.getByRole('heading', { name: '文章管理' }) });
    const createBtn = postSection.getByRole('button', { name: '创建文章' });
    await createBtn.scrollIntoViewIfNeeded();
    await createBtn.click();

    const createPostModal = page.getByRole('dialog', { name: '创建文章' });
    await expect(createPostModal).toBeVisible();

    await createPostModal.locator('#post-title').fill('Midscene AI 写作');
    await createPostModal.locator('#post-content').fill('这是由 Midscene 自动测试创建的内容');
    await createPostModal.locator('#post-author').selectOption({ index: 1 });
    await createPostModal.getByRole('button', { name: '创建', exact: true }).click();

    // 等待模态框消失
    await expect(createPostModal).not.toBeVisible();

    // 2. 确认文章出现在管理列表
    await postSection.scrollIntoViewIfNeeded();
    await expect(postSection.locator('tr').filter({ hasText: 'Midscene AI 写作' })).toBeVisible();

    // 3. 确认文章出现在上方展示列表
    const displaySection = page.locator('div.section, section').filter({ has: page.getByRole('heading', { name: '文章列表' }) });
    const postInList = displaySection.getByText('Midscene AI 写作');
    await postInList.scrollIntoViewIfNeeded();
    await expect(postInList).toBeVisible();
  });
});

