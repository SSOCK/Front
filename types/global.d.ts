declare global {
  type PostType = {
    content: string;
    createdAt: string;
    id: number;
    imageUrls: string[];
    modifiedAt: null | string;
    title: string;
    member: MemberInfo;
    likes: number;
    comments: Comment[];
  };
  type MemberInfo = {
    email: string;
    id: number;
    name: string;
    username: string;
    profilePicture: string;
  };
  type Comment = {
    id: number;
    content: string;
    username: string;
    createdAt: string;
    postId: number;
  };
}

export {};
