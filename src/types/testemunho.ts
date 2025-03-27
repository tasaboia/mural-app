export enum Category {
  CURA = "CURA",
  PROVISAO = "PROVISAO",
  SALVACAO = "SALVACAO",
  LIBERTACAO = "LIBERTACAO",
  FAMILIA = "FAMILIA",
  MINISTERIO = "MINISTERIO",
  OUTRO = "OUTRO"
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN"
}

export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Testimony {
  id: string;
  title: string;
  content: string;
  anonymous: boolean;
  approved: boolean;
  category: Category;
  authorId?: string;
  author?: User;
  amens?: Amen[];
  createdAt: string;
  updatedAt: string;
}

export interface Amen {
  id: string;
  testimonyId: string;
  userId: string;
  createdAt: string;
}

export interface CreateTestimonyDTO {
  title: string;
  content: string;
  anonymous?: boolean;
  category: Category;
}

export interface UpdateTestimonyDTO {
  title?: string;
  content?: string;
  anonymous?: boolean;
  approved?: boolean;
  category?: Category;
} 