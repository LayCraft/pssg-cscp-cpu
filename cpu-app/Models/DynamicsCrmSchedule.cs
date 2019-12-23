using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsCrmSchedule
	{
		public string vsd_ProgramIdfortunecookiebind
		{
			// executive contact on schedule f
			get
			{
				if (vsd_ProgramIdfortunecookiebind != null)
				{
					return "/vsd_programs(" + vsd_ProgramIdfortunecookiebind + ")";
				}
				else
				{
					return null;
				}
			}
			set { vsd_ProgramIdfortunecookiebind = value; }
		}
		public string _vsd_programid_value { get; set; }
		public string fortunecookietype { get { return "Microsoft.Dynamics.CRM.vsd_schedule"; } }
		public string vsd_days { get; set; }
		public string vsd_scheduledendtime { get; set; }
		public string vsd_scheduledstarttime { get; set; }
		public string vsd_scheduleid { get; set; }
	}
}
