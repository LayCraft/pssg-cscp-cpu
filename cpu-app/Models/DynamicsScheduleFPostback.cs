using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsScheduleFPostback
	{
		// this is the model that Dynamics expects back to update the organization level information
		public string BusinessBCeID { get; set; }
		public string UserBCeID { get; set; }
		// TODO the program model is not consistent so this breaks posts
		public DynamicsCrmProgram ProgramContactCollection { get; set; }
		public DynamicsOrganization OrganizationCollection { get; set; }
		public DynamicsCrmSchedule[] ScheduleCollection { get; set; }
		public DynamicsCrmProgramContract[] ProgramCollection { get; set; }
		public DynamicsCrmContract ContractCollection { get; set; }
		public DynamicsCrmContact[] StaffCollection { get; set; }
		public DynamicsCrmContact ExecutiveContact { get; set; }
	}
}
