// 登录dto
export interface LoginUserDto {
  username: string;
  password: string;
}

// 登录vo
export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  isFrozen: boolean;
  createTime: Date;
}

// 用户登录vo
interface Permission {
  id: number;
  code: string;
  description: string;
}

interface Role {
  id: number;
  name: string;
}

export interface LoginUserVo {
  code: number;
  data: {
    accessToken: string;
    refreshToken: string;
    UserInfo: UserInfo;
    message: string;
  };
  permissions: Permission[];
  roles: Role[];
}

// 查询用户列表dto
export interface UserListDto {
  username: string;
  nickname: string;
  email: string;
  pageNum: number;
  pageSize: number;
}

// 查询用户列表vo
export interface UserListVo {
  code: number;
  data: {
    totalCount: number;
    users: UserInfo[];
  };
  message: string;
}

// 更新用户信息dto
export interface UpdateUserDto {
  avatar: string;
  username: string;
  nickname: string;
  email: string;
  phoneNumber: string;
}

// 更新用户信息vo
export interface UpdateUserVo {
  message: string;
  code: number;
  data: string;
}
