import { TeamMember } from '@/entities/teamroom/api/teamroom-dto';

export type VotedUser = Pick<TeamMember, 'userId' | 'name' | 'profileImageId'>;
