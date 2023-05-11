export interface IPost {
  id: string;
  body: String;
  createdAt: String;
  username: String;
  likeCount: Number;
  commentCount: Number;
  userId: string;
  likes: [ILike];
  comments: [IComment];
}

export interface ILike {
  username: String;
}

export interface IComment {
  id: String;
  username: String;
  createdAt: String;
  body: String;
}

export interface IUser {
  id: String;
  username: String;
  email: String;
  password?: String;
  confirmPassword?: String;
  role: String;
  createdAt: String;
  updatedAt: String;
  token: String;
}
