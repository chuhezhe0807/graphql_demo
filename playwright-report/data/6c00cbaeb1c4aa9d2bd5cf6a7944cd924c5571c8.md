# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: list.spec.ts >> 列表展示测试 (Midscene) >> 查看文章列表及详情
- Location: e2e\list.spec.ts:22:7

# Error details

```
Error: Assertion failed: 详情区域显示了文章 "First Post" 的正文内容
Reason: 根据截图，页面展示了“用户列表”和“文章列表”。在“文章列表”中，“First Post (作者: Alice)”被高亮显示，表明它可能被选中。然而，截图中并没有显示任何详情区域或文章正文内容。因此，无法确认详情区域是否显示了“First Post”的正文内容，该陈述为假。
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e4]:
      - heading "Next.js + GraphQL + Apollo Client 演示" [level=1] [ref=e5]
      - generic [ref=e6]:
        - heading "数据展示" [level=2] [ref=e7]
        - generic [ref=e8]:
          - heading "用户列表" [level=2] [ref=e9]
          - list [ref=e10]:
            - listitem [ref=e11] [cursor=pointer]: Alice (alice@example.com)
            - listitem [ref=e12] [cursor=pointer]: Bob (bob@example.com)
            - listitem [ref=e13] [cursor=pointer]: Charlie (charlie@example.com)
        - generic [ref=e14]:
          - heading "文章列表" [level=2] [ref=e15]
          - list [ref=e16]:
            - listitem [ref=e17] [cursor=pointer]: "First Post (作者: Alice)"
            - listitem [ref=e18] [cursor=pointer]: "Second Post (作者: Bob)"
            - listitem [ref=e19] [cursor=pointer]: "Third Post (作者: Charlie)"
          - generic [ref=e20]:
            - heading "First Post" [level=3] [ref=e21]
            - paragraph [ref=e22]: Hello World
            - paragraph [ref=e23]: "作者: Alice (alice@example.com)"
      - generic [ref=e24]:
        - heading "数据管理" [level=2] [ref=e25]
        - generic [ref=e26]:
          - generic [ref=e27]:
            - heading "用户管理" [level=2] [ref=e28]
            - button "创建用户" [ref=e29]
          - table [ref=e30]:
            - rowgroup [ref=e31]:
              - row "ID 姓名 邮箱 操作" [ref=e32]:
                - columnheader "ID" [ref=e33]
                - columnheader "姓名" [ref=e34]
                - columnheader "邮箱" [ref=e35]
                - columnheader "操作" [ref=e36]
            - rowgroup [ref=e37]:
              - row "1 Alice alice@example.com 修改 删除" [ref=e38]:
                - cell "1" [ref=e39]
                - cell "Alice" [ref=e40]
                - cell "alice@example.com" [ref=e41]
                - cell "修改 删除" [ref=e42]:
                  - button "修改" [ref=e43]
                  - button "删除" [ref=e44]
              - row "2 Bob bob@example.com 修改 删除" [ref=e45]:
                - cell "2" [ref=e46]
                - cell "Bob" [ref=e47]
                - cell "bob@example.com" [ref=e48]
                - cell "修改 删除" [ref=e49]:
                  - button "修改" [ref=e50]
                  - button "删除" [ref=e51]
              - row "3 Charlie charlie@example.com 修改 删除" [ref=e52]:
                - cell "3" [ref=e53]
                - cell "Charlie" [ref=e54]
                - cell "charlie@example.com" [ref=e55]
                - cell "修改 删除" [ref=e56]:
                  - button "修改" [ref=e57]
                  - button "删除" [ref=e58]
        - generic [ref=e59]:
          - generic [ref=e60]:
            - heading "文章管理" [level=2] [ref=e61]
            - button "创建文章" [ref=e62]
          - table [ref=e63]:
            - rowgroup [ref=e64]:
              - row "ID 标题 作者 操作" [ref=e65]:
                - columnheader "ID" [ref=e66]
                - columnheader "标题" [ref=e67]
                - columnheader "作者" [ref=e68]
                - columnheader "操作" [ref=e69]
            - rowgroup [ref=e70]:
              - row "1 First Post Alice 修改 删除" [ref=e71]:
                - cell "1" [ref=e72]
                - cell "First Post" [ref=e73]
                - cell "Alice" [ref=e74]
                - cell "修改 删除" [ref=e75]:
                  - button "修改" [ref=e76]
                  - button "删除" [ref=e77]
              - row "2 Second Post Bob 修改 删除" [ref=e78]:
                - cell "2" [ref=e79]
                - cell "Second Post" [ref=e80]
                - cell "Bob" [ref=e81]
                - cell "修改 删除" [ref=e82]:
                  - button "修改" [ref=e83]
                  - button "删除" [ref=e84]
              - row "3 Third Post Charlie 修改 删除" [ref=e85]:
                - cell "3" [ref=e86]
                - cell "Third Post" [ref=e87]
                - cell "Charlie" [ref=e88]
                - cell "修改 删除" [ref=e89]:
                  - button "修改" [ref=e90]
                  - button "删除" [ref=e91]
  - button "Open Next.js Dev Tools" [ref=e97] [cursor=pointer]:
    - img [ref=e98]
  - alert [ref=e101]
```