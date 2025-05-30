// 登录dto
export interface LoginUserDto {
  username: string;
  password: string;
}

// 登录vo
interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  isFrozen: boolean;
  createTime: Date;
}

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
