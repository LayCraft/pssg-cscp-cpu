using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsScheduleF
	{
		public string BusinessBCeID { get; set; }
		public string UserBCeID { get; set; }
		public DynamicsProgramApplicationContract[] ContractCollection { get; set; }
		public DynamicsProgramApplicationOrganization Organization { get; set; }
		public DynamicsProgramApplicationProgram[] ProgramCollection { get; set; }
		public DynamicsProgramApplicationSchedule[] ScheduleCollection { get; set; }
		public DynamicsProgramApplicationContact[] ProgramContactCollection { get; set; }
		public DynamicsProgramApplicationContact[] StaffCollection { get; set; }
	}
}
