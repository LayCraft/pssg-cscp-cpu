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
		public DynamicsCrmContract ContractCollection { get; set; }
		public DynamicsOrganization OrganizationCollection { get; set; }
		public DynamicsCrmContact ExecutiveContact { get; set; }
		public DynamicsCrmProgram[] ProgramCollection { get; set; }
		public DynamicsCrmSchedule[] ScheduleCollection { get; set; }
	}
}
