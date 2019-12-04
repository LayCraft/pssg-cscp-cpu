using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsScheduleF
	{
		// this is the model that Dynamics expects back to update the organization level information
		public DynamicsCrmContract Contract { get; set; }
		public DynamicsOrganization Organization { get; set; }
		public DynamicsCrmContact ExecutiveContact { get; set; }
		public DynamicsCrmProgram[] ProgramCollection { get; set; }
		public DynamicsCrmSchedule[] ScheduleCollection { get; set; }
	}
}
