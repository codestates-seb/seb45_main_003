type PathType = number | string;

function createPath(id: PathType, path: string): string {
  return id === "" ? `/${path}` : `/${path}/${id}`;
}

export const API_PATHS = {
  members: {
    default: (id: PathType) => createPath(id, "members"),
    all: "/members/all",
    auth: {
      name: "/members/auth/name",
      phone: "/members/auth/phone",
      password: "/members/auth/password",
    },
    login: "/members/login",
    mypage: {
      default: "/members/mypage",
      my_reviews: "/members/mypage/reviews",
      wrote: "/members/mypage/reviews/wrote",
      user_reviews: (id: PathType) => createPath(id, "members/reviews"),
    },
  },
  email: {
    auth: "/email/auth",
    send: "/email/auth/send",
  },
  products: {
    default: (id: PathType) => createPath(id, "products"),
    category: (id: PathType) => createPath(id, "products/category"),
  },
  chat: (id: PathType) => createPath(id, "chat"),
  reviews: (id: PathType) => createPath(id, "reviews"),
  wishes: {
    default: (id: PathType) => createPath(id, "wishes"),
    add: "/wishes/add",
  },
};
