export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDate: string;
  AWSDateTime: string;
  AWSEmail: string;
  AWSIPAddress: string;
  AWSJSON: string;
  AWSPhone: string;
  AWSTime: string;
  AWSTimestamp: number;
  AWSURL: string;
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
};


export type MutationCreatePostArgs = {
  post: PostInput;
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  id: Scalars['ID'];
  publishedAt?: Maybe<Scalars['AWSDateTime']>;
  title: Scalars['String'];
};

export type PostInput = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  listBooks?: Maybe<Array<Maybe<Book>>>;
  post?: Maybe<Post>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};
