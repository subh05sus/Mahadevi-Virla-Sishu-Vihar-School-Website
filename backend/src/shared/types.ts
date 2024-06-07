

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};


export type BlogType = {
  title: string;
  thumbnailImageUrl: string;
  content: string;
  author: string;
  publishDate: string;
};

export type CarouselImageType = {
  [x: string]: string;
  imageUrl: string;
  featuredText:string;
  ButtonLink:string;
};
export type NoticeType = {
  title: string;
  date: string;
  content: string;
};
