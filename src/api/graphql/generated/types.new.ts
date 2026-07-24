export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type IBoard = {
  __typename?: 'Board';
  artistName: Scalars['String']['output'];
  boardAddress?: Maybe<IBoardAddress>;
  commentCount: Scalars['Int']['output'];
  comments?: Maybe<Array<Maybe<IBoardComment>>>;
  contents: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  genre?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  likeCount: Scalars['Int']['output'];
  mt20id?: Maybe<Scalars['String']['output']>;
  posterUrl?: Maybe<Scalars['String']['output']>;
  showDate?: Maybe<Scalars['DateTime']['output']>;
  showName: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<IUser>;
};

export type IBoardAddress = {
  __typename?: 'BoardAddress';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  jibunAddress?: Maybe<Scalars['String']['output']>;
  placeName?: Maybe<Scalars['String']['output']>;
  roadAddress?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  x?: Maybe<Scalars['String']['output']>;
  y?: Maybe<Scalars['String']['output']>;
};

export type IBoardAddressInput = {
  jibunAddress?: InputMaybe<Scalars['String']['input']>;
  placeName?: InputMaybe<Scalars['String']['input']>;
  roadAddress?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  y?: InputMaybe<Scalars['String']['input']>;
};

export type IBoardComment = {
  __typename?: 'BoardComment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<IUser>;
};

export type ICreateBoardCommentInput = {
  content: Scalars['String']['input'];
};

export type ICreateBoardInput = {
  artistName: Scalars['String']['input'];
  boardAddressInput?: InputMaybe<IBoardAddressInput>;
  contents: Scalars['String']['input'];
  genre?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  mt20id?: InputMaybe<Scalars['String']['input']>;
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  showDate?: InputMaybe<Scalars['DateTime']['input']>;
  showName: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type ICreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type IFileManager = {
  __typename?: 'FileManager';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  isUsed: Scalars['Boolean']['output'];
  size?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type IFollow = {
  __typename?: 'Follow';
  createdAt: Scalars['DateTime']['output'];
  follower?: Maybe<Array<Maybe<IUser>>>;
  following?: Maybe<Array<Maybe<IUser>>>;
  id: Scalars['ID']['output'];
};

export type IMutation = {
  __typename?: 'Mutation';
  /**  팔로우 기능 */
  addFollow?: Maybe<Scalars['Boolean']['output']>;
  createBoard: IBoard;
  createBoardComment: IBoardComment;
  /**  User mutation */
  createUser: IUser;
  deleteBoard: Scalars['ID']['output'];
  deleteBoardComment: Scalars['ID']['output'];
  deleteBoards: Array<Scalars['ID']['output']>;
  likeBoard: Scalars['Int']['output'];
  loginUser: IToken;
  logoutUser: Scalars['Boolean']['output'];
  resetUserPassword: Scalars['Boolean']['output'];
  restoreAccessToken: IToken;
  /**  등록되어 있으면 해제, 없으면 등록 (토글) — 로그인 필수 */
  togglePerformanceSubscription: Scalars['Boolean']['output'];
  updateBoard: IBoard;
  updateBoardComment: IBoardComment;
  updateUser: IUser;
};


export type IMutationAddFollowArgs = {
  followerId: Scalars['ID']['input'];
};


export type IMutationCreateBoardArgs = {
  createBoardInput: ICreateBoardInput;
};


export type IMutationCreateBoardCommentArgs = {
  boardId: Scalars['ID']['input'];
  createBoardCommentInput: ICreateBoardCommentInput;
};


export type IMutationCreateUserArgs = {
  createUserInput: ICreateUserInput;
};


export type IMutationDeleteBoardArgs = {
  boardId: Scalars['ID']['input'];
};


export type IMutationDeleteBoardCommentArgs = {
  commentId: Scalars['ID']['input'];
};


export type IMutationDeleteBoardsArgs = {
  boardIds: Array<Scalars['ID']['input']>;
};


export type IMutationLikeBoardArgs = {
  boardId: Scalars['ID']['input'];
};


export type IMutationLoginUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type IMutationResetUserPasswordArgs = {
  password: Scalars['String']['input'];
};


export type IMutationTogglePerformanceSubscriptionArgs = {
  mt20id: Scalars['String']['input'];
};


export type IMutationUpdateBoardArgs = {
  boardId: Scalars['ID']['input'];
  updateBoardInput: IUpdateBoardInput;
};


export type IMutationUpdateBoardCommentArgs = {
  commentId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};


export type IMutationUpdateUserArgs = {
  updateUserInput: IUpdateUserInput;
};

export type IQuery = {
  __typename?: 'Query';
  fetchBoard: IBoard;
  fetchBoardComments: Array<IBoardComment>;
  fetchBoards: Array<IBoard>;
  fetchBoardsByMt20id: Array<IBoard>;
  fetchBoardsByUser?: Maybe<Array<Maybe<IBoard>>>;
  fetchBoardsCount: Scalars['Int']['output'];
  fetchBoardsCountByUser?: Maybe<Scalars['Int']['output']>;
  fetchBoardsCountOfMine: Scalars['Int']['output'];
  fetchBoardsKeyword: Array<Scalars['String']['output']>;
  fetchBoardsLike: Array<IBoard>;
  fetchBoardsLikeByUser?: Maybe<Array<Maybe<IBoard>>>;
  fetchBoardsLikeCount?: Maybe<Scalars['Int']['output']>;
  fetchBoardsOfBest: Array<IBoard>;
  fetchBoardsOfMine: Array<IBoard>;
  fetchCountOfFollowers: Scalars['Int']['output'];
  fetchCountOfFollowing: Scalars['Int']['output'];
  /**  팔로우 기능 */
  fetchFollowers?: Maybe<Array<Maybe<IUser>>>;
  fetchFollowersOfMine?: Maybe<Array<Maybe<IUser>>>;
  fetchFollowingFeed?: Maybe<Array<Maybe<IBoard>>>;
  fetchFollowingOfMine?: Maybe<Array<Maybe<IUser>>>;
  fetchFollowings?: Maybe<Array<Maybe<IUser>>>;
  /**  현재 로그인한 사용자의 관심 공연 mt20id 목록 반환 — 로그인 필수 */
  fetchSubscribedPerformances: Array<Scalars['String']['output']>;
  fetchUserLoggedIn: IUser;
  isConnected: Scalars['Boolean']['output'];
};


export type IQueryFetchBoardArgs = {
  boardId: Scalars['ID']['input'];
};


export type IQueryFetchBoardCommentsArgs = {
  boardId: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type IQueryFetchBoardsArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type IQueryFetchBoardsByMt20idArgs = {
  mt20id: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type IQueryFetchBoardsByUserArgs = {
  userId: Scalars['ID']['input'];
};


export type IQueryFetchBoardsCountArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type IQueryFetchBoardsCountByUserArgs = {
  userId: Scalars['ID']['input'];
};


export type IQueryFetchBoardsLikeByUserArgs = {
  userId: Scalars['ID']['input'];
};


export type IQueryFetchBoardsLikeCountArgs = {
  boardId: Scalars['ID']['input'];
};


export type IQueryFetchBoardsOfBestArgs = {
  isTop5: Scalars['Boolean']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type IQueryFetchCountOfFollowersArgs = {
  userId: Scalars['ID']['input'];
};


export type IQueryFetchCountOfFollowingArgs = {
  userId: Scalars['ID']['input'];
};


export type IQueryFetchFollowersArgs = {
  userId: Scalars['ID']['input'];
};


export type IQueryFetchFollowingFeedArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type IQueryFetchFollowingsArgs = {
  userId: Scalars['ID']['input'];
};


export type IQueryIsConnectedArgs = {
  followerId: Scalars['ID']['input'];
};

export type IToken = {
  __typename?: 'Token';
  accessToken: Scalars['String']['output'];
};

export type IUpdateBoardInput = {
  artistName?: InputMaybe<Scalars['String']['input']>;
  boardAddressInput?: InputMaybe<IBoardAddressInput>;
  contents?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  mt20id?: InputMaybe<Scalars['String']['input']>;
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  showDate?: InputMaybe<Scalars['DateTime']['input']>;
  showName?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateUserInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
};

export type IUser = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};
