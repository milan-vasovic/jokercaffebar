import { readFile } from 'fs/promises';
import path from 'path';

const postsPath = path.resolve('data/json/posts.json');

class postService {
  static async findPosts() {
    try {
      const data = await readFile(postsPath, 'utf-8');
      const parsed = JSON.parse(data);
      return parsed.posts || [];
    } catch (err) {
      return [];
    }
  }

  static async findPostByTitle(title) {
    try {
      const posts = await this.findPosts();
      const post = posts.find(p => p.title === title);
      return post || null;
    } catch (err) {
      return null;
    }
  }

  static async findSomePosts() {
    try {
      const posts = await this.findPosts();
      const shuffled = posts.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    } catch (err) {
      return [];
    }
  }
}

export default postService;
