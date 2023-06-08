export type Category = {
  id: number;
  name: string;
  _count?: {
    posts?: number;
  };
};
export type CategoryName = {
  id: number;
  name: string;
};
export type Post = {
  id: number;
  title: string;
  description?: string;
  createdAt: number;
  category: CategoryName;
  tags?: Tag[];
  thumbnailUrl?: string;
};
export type Tag = {
  id: number;
  name: string;
};
