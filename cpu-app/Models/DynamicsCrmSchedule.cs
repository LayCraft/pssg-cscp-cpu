using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsCrmSchedule
	{
		public string _vsd_programid_value { get; set; }
		public string fortunecookietype { get { return "Microsoft.Dynamics.CRM.vsd_schedule"; } }
		public string vsd_days { get; set; }
		public string vsd_scheduleid { get; set; }

	}
}
