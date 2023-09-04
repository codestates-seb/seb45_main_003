type PathType = number | string;

function createPath(id: PathType, path: string): string {
  return `/${path}/${id}`;
}

export const API_PATHS = {
  members: {
    default: (id: PathType) => createPath(id, "default"),
    all: "/members/all",
    auth: {
      name: "/members/auth/name",
      phone: "/members/auth/phone",
      password: "/members/auth/password",
    },
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
  products: (id: PathType) => createPath(id, "products"),
  chat: (id: PathType) => createPath(id, "chat"),
  reviews: (id: PathType) => createPath(id, "reviews"),
  wishes: {
    default: (id: PathType) => createPath(id, "wishes"),
    add: "/wishes/add",
  },
};
