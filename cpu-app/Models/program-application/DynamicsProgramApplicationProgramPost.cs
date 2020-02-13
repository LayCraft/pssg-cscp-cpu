using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.Victims.Public.Models
{
	public class DynamicsProgramApplicationProgramPost
	{
		public string fortunecookietype { get { return "Microsoft.Dynamics.CRM.vsd_program"; } }
		public string vsd_addressline1 { get; set; }
		public string vsd_addressline2 { get; set; }
		public string vsd_city { get; set; }
		public string vsd_country { get; set; }
		public string vsd_emailaddress { get; set; }
		public string vsd_fax { get; set; }
		public string vsd_mailingaddressline1 { get; set; }
		public string vsd_mailingaddressline2 { get; set; }
		public string vsd_mailingcity { get; set; }
		public string vsd_mailingcountry { get; set; }
		public string vsd_mailingpostalcodezip { get; set; }
		public string vsd_mailingprovincestate { get; set; }
		public string vsd_phonenumber { get; set; }
		public string vsd_postalcodezip { get; set; }
		public string vsd_programid { get; set; }
		public string vsd_provincestate { get; set; }
		private string _vsd_ContactLookupfortunecookiebind;
		public string vsd_ContactLookupfortunecookiebind
		{
			get
			{
				if (!String.IsNullOrEmpty(_vsd_ContactLookupfortunecookiebind))
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