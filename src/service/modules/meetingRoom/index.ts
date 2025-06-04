import { http } from '../..';
import type {
  MeetingRoomListDto,
  MeetingRoomListVo,
  CreateMeetingRoomDto,
} from '@types/meetingRoom';
import type {
  CreateMeetingRoomVo,
  DeleteMeetingRoomVo,
  FindMeetingRoomById,
  UpdateMeetingRoomDto,
  UpdateMeetingRoomVo,
} from '../../../types/meetingRoom';

const PATH = 'meeting-room';

export const list = async (
  dto: MeetingRoomListDto,
): Promise<MeetingRoomListVo> => {
  return http.get(`${PATH}/list`, {
    params: dto,
  });
};

export const create = async (
  dto: CreateMeetingRoomDto,
): Promise<CreateMeetingRoomVo> => {
  return await http.post(`${PATH}/create`, dto);
};

export const findRoomById = async (
  id: number,
): Promise<FindMeetingRoomById> => {
  return await http.get(`${PATH}/${id}`);
};

export const update = async (
  dto: UpdateMeetingRoomDto,
): Promise<UpdateMeetingRoomVo> => {
  return await http.post(`${PATH}/update`, dto);
};

export const remove = async (id: number): Promise<DeleteMeetingRoomVo> => {
  return await http.delete(`${PATH}/${id}`);
};
