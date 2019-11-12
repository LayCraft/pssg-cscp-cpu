using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsCrmContract
	{
		public string _vsd_contactlookup1_value { get; set; }
		public string _vsd_contactlookup2_value { get; set; }
		public string _vsd_customer_value { get; set; }
		public int statuscode { get; set; }
		public int statecode { get; set; }
		public string vsd_contractid { get; set; }
		public string vsd_name { get; set; }
	}
}
