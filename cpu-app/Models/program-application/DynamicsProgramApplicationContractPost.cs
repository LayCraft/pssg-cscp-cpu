using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsProgramApplicationContractPost
	{

		public string fortunecookietype
		{
			get { return "#Microsoft.Dynamics.CRM.vsd_contract"; }
		}
		private string _vsd_ContactLookup1fortunecookiebind;
		public string vsd_ContactLookup1fortunecookiebind
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

		private string _vsd_ContactLookup2fortunecookiebind;
		public string vsd_ContactLookup2fortunecookiebind
		{
			// executive contact on schedule f
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

		public string _vsd_contactlookup1_value { get; set; }
		public string _vsd_contactlookup2_value { get; set; }
		public string _vsd_customer_value { get; set; }
		public string vsd_contractid { get; set; }
		public string vsd_cpu_specificunion { get; set; }
		public string vsd_name { get; set; }
	}
}
