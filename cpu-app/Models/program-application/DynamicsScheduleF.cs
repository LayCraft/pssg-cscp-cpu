using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsScheduleF
	{
		// this is the model that Dynamics expects back to update the organization level information
		public string BusinessBCeID { get; set; }
		public string UserBCeID { get; set; }
		// TODO the program model is not consistent so this breaks posts
		public DynamicsProgramApplicationOrganization Organization { get; set; }
		public DynamicsProgramApplicationContact ExecutiveContact { get; set; }
		public DynamicsProgramApplicationContact BoardContact { get; set; }
		public DynamicsProgramApplicationProgram[] ProgramCollection { get; set; }
		public DynamicsProgramApplicationSchedule[] ScheduleCollection { get; set; }
		public DynamicsProgramApplicationContact[] ProgramContactCollection { get; set; }
		public DynamicsProgramApplicationContact[] StaffCollection { get; set; }
	}
}
