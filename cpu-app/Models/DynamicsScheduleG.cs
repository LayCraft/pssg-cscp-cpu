using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsScheduleG
	{
		// this is the model that Dynamics expects back to update the organization level information
		public string BusinessBCeID { get; set; }
		public string UserBCeID { get; set; }

		public DynamicsScheduleGCollection[] ScheduleGCollection { get; set; }
		public DynamicsScheduleGLineItemCollection[] ScheduleGLineItemCollection { get; set; }

	}
}
