using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class FilePost
	{

		public string BusinessBCeID { get; set; }
		public string UserBCeID { get; set; }

		public DynamicsDocumentPost[] DocumentCollection { get; set; }
	}
}
