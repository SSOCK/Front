declare global {
  type PostType = {
    content: string;
    createdAt: string;
    id: number;
    imageUrl: null | string;
    modifiedAt: null | string;
    title: string;
    member: MemberInfo;
  };
  type MemberInfo = {
    email: string;
    id: number;
    name: string;
    username: string;
  };
}

export {};
