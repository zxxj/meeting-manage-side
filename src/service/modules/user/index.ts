import { http } from '@/service/index';
import type {
  LoginUserDto,
  LoginUserVo,
  UserListDto,
  UserListVo,
  UserInfo,
  UpdateUserDto,
  UpdateUserVo,
} from '@/types/user';

const PATH = 'user/admin';

export const login = async (dto: LoginUserDto): Promise<LoginUserVo> => {
  return await http.post(`${PATH}/login`, dto);
};

export const list = async (dto: UserListDto): Promise<UserListVo> => {
  return await http.get(`${PATH}/list`, {
    params: dto,
  });
};

export const freezeUser = async (userId: number) => {
  return await http.get(`${PATH}/freeze`, {
    params: {
      id: userId,
    },
  });
};

export const getUserInfoById = async (): UserInfo => {
  return await http.get(`${PATH}/info`);
};

export const captcha = async () => {
  return await http.get(`${PATH}/update-captcha`);
};

export const update = async (dto: UpdateUserDto): Promise<UpdateUserVo> => {
  return await http.post(`${PATH}/update`, dto);
};

export const captchaPassword = async () => {
  return await http.get(`${PATH}/password-captcha`);
};

export const updatePassword = async (dto) => {
  return await http.post(`${PATH}/update_password`, dto);
};
