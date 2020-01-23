using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsProgramApplicationContract
	{

		public string fortunecookietype
		{
			get { return "#Microsoft.Dynamics.CRM.vsd_contract"; }
		}
		private string __vsd_contactLookup1fortunecookiebind;
		public string _vsd_contactLookup1fortunecookiebind
		{
			// executive contact on schedule f
			get
			{
				if (__vsd_contactLookup1fortunecookiebind != null)
				{
					return "/contacts(" + __vsd_contactLookup1fortunecookiebind + ")";
				}
				else
				{
					return null;
				}
			}
			set { __vsd_contactLookup1fortunecookiebind = value; }
		}

		private string __vsd_contactLookup2fortunecookiebind;
		public string _vsd_contactLookup2fortunecookiebind
		{
			// executive contact on schedule f
			get
			{
				if (__vsd_contactLookup2fortunecookiebind != null)
				{
					return "/contacts(" + __vsd_contactLookup2fortunecookiebind + ")";
				}
				else
				{
					return null;
				}
			}
			set { __vsd_contactLookup2fortunecookiebind = value; }
		}

		public string _vsd_contactlookup1_value { get; set; }
		public string _vsd_contactlookup2_value { get; set; }
		public string _vsd_customer_value { get; set; }
		public string vsd_contractid { get; set; }
		public string vsd_cpu_specificunion { get; set; }
		public string vsd_name { get; set; }
	}
}
