import { expect } from '@playwright/test';
import { test } from './fixture';

test.beforeEach(async ({ page }) => {
  page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
});

test.describe('数据管理测试 (Midscene)', () => {
  test('创建、修改和删除用户', async ({ page, ai, aiAssert, aiQuery }) => {
    // 1. 创建用户
    await ai('点击 "创建用户" 按钮');
    await ai('在姓名输入框输入 "Midscene 测试人"');
    await ai('在邮箱输入框输入 "midscene@test.com"');
    await ai('点击对话框中的 "创建" 或 "提交" 按钮');

    // 2. 确认用户创建成功
    await aiAssert('用户列表中应该出现了 "Midscene 测试人"');

    // 3. 修改用户
    await ai('在 "Midscene 测试人" 这一行点击 "修改" 按钮');
    await ai('将姓名改为 "Midscene 已修改"');
    await ai('点击 "保存" 或 "更新" 按钮');

    // 4. 确认修改成功
    await aiAssert('用户列表中原本的 "Midscene 测试人" 变成了 "Midscene 已修改"');

    // 5. 删除用户
    page.on('dialog', dialog => dialog.accept()); // 处理 window.confirm
    await ai('在 "Midscene 已修改" 这一行点击 "删除" 按钮');

    // 6. 确认删除成功
    await aiAssert('用户列表中不再有 "Midscene 已修改"');
  });

  test('创建文章并查看', async ({ page, ai, aiAssert, aiQuery }) => {
    // 1. 在管理区域创建文章
    // 管理区域通常在页面下方，可能需要滚动
    await ai('向下滚动到 "数据管理" 区域');
    await ai('点击 "创建文章" 按钮');
    await ai('输入文章标题为 "Midscene AI 写作"');
    await ai('输入文章内容为 "这是由 Midscene 自动测试创建的内容"');
    await ai('选择第一个作者');
    await ai('点击 "创建" 按钮');

    // 2. 确认文章出现在文章管理列表
    await aiAssert('文章管理列表中出现了标题为 "Midscene AI 写作" 的行');

    // 3. 确认文章也出现在页面顶部的展示列表中
    await ai('向上滚动到页面顶部的 "数据展示" 区域');
    await aiAssert('页面上的展示区域 "文章列表" 中出现了 "Midscene AI 写作"');
  });
});

