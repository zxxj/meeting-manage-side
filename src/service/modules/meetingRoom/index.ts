import { http } from '../..';
import type {
  MeetingRoomListDto,
  MeetingRoomListVo,
  CreateMeetingRoomDto,
} from '@types/meetingRoom';

const PATH = 'meeting-room';

export const list = async (
  dto: MeetingRoomListDto,
): Promise<MeetingRoomListVo> => {
  return http.get(`${PATH}/list`, {
    params: dto,
  });
};

export const create = async (dto: CreateMeetingRoomDto) => {
  return await http.post(`${PATH}/create`, dto);
};
