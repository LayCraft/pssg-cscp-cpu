using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsCrmContract
	{
		// dynamics blob postback
		public string _vsd_contactlookup1_value { get; set; }// executive contact on blob
		public string _vsd_contactlookup2_value { get; set; }// board contact on blob

		// DYNAMICS SCHEDULE F POSTBACK STUFF (Trust me when I say that I hate this code more than you do.)
		public string _vsd_ContactLookup1fortunecookiebind
		{
			// executive contact on schedule f
			get
			{
				if (_vsd_ContactLookup1fortunecookiebind != null)
				{
					return "/contacts(" + _vsd_ContactLookup1fortunecookiebind + ")";
				}
				else
				{
					return null;
				}
			}
			set { _vsd_ContactLookup1fortunecookiebind = value; }
		}
		// board contact on schedule f
		public string _vsd_ContactLookup2fortunecookiebind
		{
			get
			{
				if (_vsd_ContactLookup2fortunecookiebind != null)
				{
					return "/contacts(" + _vsd_ContactLookup2fortunecookiebind + ")";
				}
				else
				{
					return null;
				}
			}
			set { _vsd_ContactLookup2fortunecookiebind = value; }
		}

		public bool vsd_cpu_programstaffsubcontracted { get; set; }
		public bool vsd_cpu_staffunionized { get; set; }
		public int statecode { get; set; }
		public int statuscode { get; set; }
		public int vsd_cpu_insuranceoptions { get; set; }
		public int vsd_cpu_memberofcssea { get; set; }
		public string _vsd_customer_value { get; set; }
		public string fortunecookietype { get { return "Microsoft.Dynamics.CRM.vsd_contract"; } }
		public string vsd_contractid { get; set; }
		public string vsd_cpu_humanresourcepolices { get; set; }
		public string vsd_cpu_specificunion { get; set; }
		public string vsd_name { get; set; }


	}
}
