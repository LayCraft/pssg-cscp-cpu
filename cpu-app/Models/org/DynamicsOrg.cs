using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsOrg
	{
		// this is the model that Dynamics expects back to update the organization level information
		public string BusinessBCeID { get; set; }
		public string UserBCeID { get; set; }
		public DynamicsOrganization Organization { get; set; }
		public DynamicsCrmContact[] StaffCollection { get; set; }
	}
}
