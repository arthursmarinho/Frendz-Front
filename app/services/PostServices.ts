import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Post = {
  id: string;
  postTitle: string;
  userName: string;
  userPhoto: string;
  userUid: string;
  createdAt: string;
};

type CreatePostDto = {
  postTitle: string;
  userName: string;
  userPhoto: string;
  userUid: string;
  idToken: string;
};

export const PostService = {
  async getAll(): Promise<Post[]> {
    const res = await axios.get(`${API_URL}/posts`);
    return res.data;
  },

  async createPost({ idToken, ...data }: CreatePostDto) {
    try {
      const res = await axios.post(`${API_URL}/posts`, data, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return { ok: true, data: res.data };
    } catch (error: any) {
      return { ok: false, data: error?.response?.data || error.message };
    }
  },

  async deletePost(id: string): Promise<Post> {
    const res = await axios.delete(`${API_URL}/posts/${id}`);
    return res.data;
  },
};
