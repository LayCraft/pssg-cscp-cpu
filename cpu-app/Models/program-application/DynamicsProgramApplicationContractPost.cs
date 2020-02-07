using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.Victims.Public.Models
{
	public class DynamicsProgramApplicationContractPost
	{
		private string _vsd_ContactLookup1fortunecookiebind;
		public string vsd_ContactLookup1fortunecookiebind
		{
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
		private string _vsd_ContactLookup2fortunecookiebind;
		public string vsd_ContactLookup2fortunecookiebind
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
		public int vsd_cpu_insuranceoptions { get; set; }
		public int vsd_cpu_memberofcssea { get; set; }
		public string fortunecookietype { get { return "Microsoft.Dynamics.CRM.vsd_contract"; } }
		public string vsd_contractid { get; set; }
		public string vsd_cpu_humanresourcepolicies { get; set; }
		public string vsd_cpu_specificunion { get; set; }
		public string vsd_name { get; set; }
	}
}
