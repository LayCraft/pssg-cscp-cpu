using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsDocument
	{
		public string body { get; set; }
		public string filename { get; set; }
		public string fortunecookietype { get { return "#Microsoft.Dynamics.CRM.activitymimeattachment"; } }
	}
}
