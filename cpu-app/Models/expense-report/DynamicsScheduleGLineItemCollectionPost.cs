using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsScheduleGLineItemCollectionPost
	{
		public float vsd_actualexpensescurrentquarter { get; set; }
		public string fortunecookietype { get { return "Microsoft.Dynamics.CRM.vsd_scheduleglineitem"; } }
		public string vsd_scheduleglineitemid { get; set; }
	}
}
