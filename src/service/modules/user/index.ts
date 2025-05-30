import { http } from '@/service/index';
import type { LoginUserDto, LoginUserVo } from '../../../types/user';

const PATH = 'user/admin';

export const login = async (dto: LoginUserDto): Promise<LoginUserVo> => {
  return await http.post(`${PATH}/login`, dto);
};
