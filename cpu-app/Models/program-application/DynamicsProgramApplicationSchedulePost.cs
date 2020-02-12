using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.Victims.Public.Models
{
	public class DynamicsProgramApplicationSchedulePost
	{
		public string fortunecookietype { get { return "Microsoft.Dynamics.CRM.vsd_schedule"; } }
		public string vsd_days { get; set; }
		public string vsd_scheduledendtime { get; set; }
		public string vsd_scheduledstarttime { get; set; }
		public string vsd_scheduleid { get; set; }
		private string _vsd_ProgramIdfortunecookiebind;
		public string vsd_ProgramIdfortunecookiebind
		{
			get
			{
				if (_vsd_ProgramIdfortunecookiebind != null)
				{
					return "/vsd_programs(" + _vsd_ProgramIdfortunecookiebind + ")";
				}
				else
				{
					return null;
				}
			}
			set { _vsd_ProgramIdfortunecookiebind = value; }
		}
	}
}