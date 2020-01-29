using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsProgramApplicationPost
	{
		public string BusinessBCeID { get; set; }
		public string UserBCeID { get; set; }
		public DynamicsProgramApplicationContractPost[] ContractCollection { get; set; }
		public DynamicsProgramApplicationOrganizationPost Organization { get; set; }
		public DynamicsProgramApplicationProgramPost[] ProgramCollection { get; set; }
		public DynamicsProgramApplicationSchedulePost[] ScheduleCollection { get; set; }
		public DynamicsProgramApplicationContactPost[] ProgramContactCollection { get; set; }
		public DynamicsProgramApplicationContactPost[] StaffCollection { get; set; }
	}
}
