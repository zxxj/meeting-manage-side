// 查询会议室列表dto
export interface MeetingRoomListDto {
  pageNum: number;
  pageSize: number;
  name?: string;
  capacity?: string;
  location?: string;
  equipment?: string;
  description?: string;
}

// 查询会议室列表vo
interface MeetingRooms {
  id: number;
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
  isBooked: boolean;
  createTime: Date;
  updateTime: Date;
}

export interface MeetingRoomListVo {
  code: number;
  message: string;
  data: {
    meetingRooms: MeetingRooms[];
    totalCount: number;
  };
}

// 创建会议室dto
export interface CreateMeetingRoomDto {
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
}

// 创建会议室vo
export interface CreateMeetingRoomVo {
  code: number;
  data: string;
  message: string;
}

// 查询会议室vo
export interface FindMeetingRoomById {
  code: number;
  data: MeetingRooms;
  message: string;
}

// 更新会议室dto
export interface UpdateMeetingRoomDto {
  id: number;
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
}

// 更新会议室vo
export interface UpdateMeetingRoomVo {
  code: number;
  data: string;
  message: string;
}

// 删除会议室vo
export interface DeleteMeetingRoomVo {
  code: number;
  data: string;
  message: string;
}
