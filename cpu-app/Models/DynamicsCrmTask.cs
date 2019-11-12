using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsCrmTask
	{
		public string _regardingobjectid_value { get; set; }
		public string _vsd_tasktypeid_value { get; set; }
		public string activityid { get; set; }
		public string description { get; set; }
		public string scheduledend { get; set; }
		public int statecode { get; set; }
		public int statuscode { get; set; }
		public string subject { get; set; }
	}
}
