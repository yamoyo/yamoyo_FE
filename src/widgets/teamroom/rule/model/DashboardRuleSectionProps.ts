import { TeamMemberRole } from '@/entities/teamroom/api/teamroom-dto';
import { GetTeamRulesResponse } from '@/entities/teamroom/rule/api/rule-dto';

export interface DashboardRuleSectionProps {
  rulesData: GetTeamRulesResponse;
  teamRoomId: string | number;
  myRole: TeamMemberRole;
}
