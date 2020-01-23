using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsProgramApplicationContact
	{
		public string contactid { get; set; }
		public string vsd_programid { get; set; }
		public string fortunecookietype { get { return "#Microsoft.Dynamics.CRM.contact"; } }
	}
}
