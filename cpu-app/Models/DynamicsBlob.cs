using Gov.Cscp.VictimServices.Public.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	/// <summary>
	/// What is returned from dynamics on a get request for a BCeID
	/// </summary>
	public class DynamicsBlob
	{
		public bool IsSuccess { get; set; }
		public DynamicsCrmContact BoardContact { get; set; }
		public DynamicsCrmContact ExecutiveContact { get; set; }
		public DynamicsCrmContact[] Staff { get; set; }
		public DynamicsCrmContract[] Contracts { get; set; }
		public DynamicsCrmProgram[] Programs { get; set; }
		public DynamicsCrmTask[] Tasks { get; set; }
		public DynamicsMinistryUser MinistryUser { get; set; }
		public DynamicsOrganization Organization { get; set; }
		public string Result { get; set; }
		public string bceid { get; set; }

	}
}
