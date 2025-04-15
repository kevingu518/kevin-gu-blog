const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.article.createMany({
      data: [
        {
          slug: 'html',
          title: 'HTML 技術文章',
          content: `
            # HTML 技術文章
            這是一篇關於 HTML 的技術文章。

            \`\`\`html
            <div>
              <h1>Hello World</h1>
              <p>這是一個段落。</p>
            </div>
            \`\`\`
          `,
        },
        {
          slug: 'option1',
          title: 'Option 1 - JavaScript 技巧',
          content: `
            # Option 1 - JavaScript 技巧
            這是一篇關於 JavaScript 的文章。

            \`\`\`javascript
            function greet(name) {
              return \`Hello, \${name}!\`;
            }
            console.log(greet("Grok"));
            \`\`\`
          `,
        },
        {
          slug: 'css',
          title: 'CSS 樣式指南',
          content: `
            # CSS 樣式指南
            這是一篇關於 CSS 的文章。

            \`\`\`css
            .container {
              display: flex;
              justify-content: center;
            }
            \`\`\`
          `,
        },
      ],
      skipDuplicates: true, // 避免重複插入
    });
    console.log('測試數據已插入');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();