using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsProgramApplicationProgram
	{
		public string fortunecookietype
		{
			get { return "#Microsoft.Dynamics.CRM.vsd_program"; }
		}

		// private string _vsd_ContactLookupfortunecookiebind;
		// public string vsd_ContactLookupfortunecookiebind
		// {
		// 	// executive contact on schedule f
		// 	get
		// 	{
		// 		if (_vsd_ContactLookupfortunecookiebind != null)
		// 		{
		// 			return "/contacts(" + _vsd_ContactLookupfortunecookiebind + ")";
		// 		}
		// 		else
		// 		{
		// 			return null;
		// 		}
		// 	}
		// 	set { _vsd_ContactLookupfortunecookiebind = value; }
		// }
		// public string _vsd_contactlookup_value { set; get; }
		// public string _vsd_contractid_value { set; get; }
		// public string _vsd_cpu_regiondistrict_value { set; get; }
		// public string _vsd_cpu_regiondistrictlookup2_value { set; get; }
		// public string _vsd_programtype_value { set; get; }
		// public string _vsd_serviceproviderid_value { set; get; }
		// public string vsd_addressline1 { set; get; }
		// public string vsd_addressline2 { set; get; }
		// public string vsd_city { set; get; }
		// public string vsd_country { set; get; }
		// public string vsd_emailaddress { set; get; }
		// public string vsd_fax { set; get; }
		// public string vsd_mailingaddressline1 { set; get; }
		// public string vsd_mailingaddressline2 { set; get; }
		// public string vsd_mailingcity { set; get; }
		// public string vsd_mailingcountry { set; get; }
		// public string vsd_mailingpostalcodezip { set; get; }
		// public string vsd_mailingprovincestate { set; get; }
		// public string vsd_name { set; get; }
		// public string vsd_phonenumber { set; get; }
		// public string vsd_postalcodezip { set; get; }
		// public string vsd_programid { get; set; }
		// public string vsd_provincestate { set; get; }
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
	}
}