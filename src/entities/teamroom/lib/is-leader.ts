import { TeamMemberRole } from '@/entities/teamroom/api/teamroom-dto';

export const isLeader = (role: TeamMemberRole | string) =>
  role === 'LEADER' || role === 'HOST';
