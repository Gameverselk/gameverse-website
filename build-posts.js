const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");

const postsDir = "content/posts";
const output = "posts.json";

const posts = fs.readdirSync(postsDir)
  .filter(file => file.endsWith(".md"))
  .map(file => {
    const content = fs.readFileSync(path.join(postsDir, file), "utf8");
    const parsed = matter(content);

    return {
      title: parsed.data.title || "",
      date: parsed.data.date || "",
      category: parsed.data.category || "",
      description: parsed.data.description || "",
      thumbnail: parsed.data.thumbnail || "",
      body: parsed.content
    };
  });

fs.writeFileSync(output, JSON.stringify(posts, null, 2));
console.log("Game Verse posts generated!");
