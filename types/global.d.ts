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
    comments: string[];
  };
  type MemberInfo = {
    email: string;
    id: number;
    name: string;
    username: string;
  };
}

export {};
