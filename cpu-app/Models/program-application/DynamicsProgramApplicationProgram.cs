using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsProgramApplicationProgram
	{
		public string fortunecookietype { get { return "Microsoft.Dynamics.CRM.vsd_program"; } }
		public string vsd_totaloncallstandbyhours { get; set; }
		public string vsd_totalscheduledhours { get; set; }

		// DYNAMICS SCHEDULE F POSTBACK STUFF (Trust me when I say that I hate this code more than you do.)
		public string vsd_ContactLookupfortunecookiebind
		{
			// executive contact on schedule f
			get
			{
				if (vsd_ContactLookupfortunecookiebind != null)
				{
					return "/contacts(" + vsd_ContactLookupfortunecookiebind + ")";
				}
				else
				{
					return null;
				}
			}
			set { vsd_ContactLookupfortunecookiebind = value; }
		}
		public int statecode { set; get; }
		public int statuscode { set; get; }
		public string _vsd_contactlookup_value { set; get; }
		public string _vsd_contractid_value { set; get; }
		public string _vsd_cpu_regiondistrict_value { set; get; }
		public string _vsd_cpu_regiondistrictlookup2_value { set; get; }
		public string _vsd_programtype_value { set; get; }
		public string _vsd_serviceproviderid_value { set; get; }
		public string vsd_addressline1 { set; get; }
		public string vsd_addressline2 { set; get; }
		public string vsd_city { set; get; }
		public string vsd_country { set; get; }
		public string vsd_emailaddress { set; get; }
		public string vsd_fax { set; get; }
		public string vsd_mailingaddressline1 { set; get; }
		public string vsd_mailingaddressline2 { set; get; }
		public string vsd_mailingcity { set; get; }
		public string vsd_mailingcountry { set; get; }
		public string vsd_mailingpostalcodezip { set; get; }
		public string vsd_mailingprovincestate { set; get; }
		public string vsd_name { set; get; }
		public string vsd_phonenumber { set; get; }
		public string vsd_postalcodezip { set; get; }
		public string vsd_programid { get; set; }
		public string vsd_provincestate { set; get; }
	}
}