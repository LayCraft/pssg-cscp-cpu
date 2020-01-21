using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsProgramApplicationContract
	{
		public string fortunecookietype { get { return "Microsoft.Dynamics.CRM.vsd_program"; } }
		public string vsd_programid { get; set; }
		public string vsd_totaloncallstandbyhours { get; set; }
		public string vsd_totalscheduledhours { get; set; }

		// DYNAMICS SCHEDULE F POSTBACK STUFF (Trust me when I say that I hate this code more than you do.)
		private string _vsd_ContactLookupfortunecookiebind;
		public string vsd_ContactLookupfortunecookiebind
		{
			// executive contact on schedule f
			get
			{
				if (_vsd_ContactLookupfortunecookiebind != null)
				{
					return "/contacts(" + _vsd_ContactLookupfortunecookiebind + ")";
				}
				else
				{
					return null;
				}
			}
			set { _vsd_ContactLookupfortunecookiebind = value; }
		}
	}
}
