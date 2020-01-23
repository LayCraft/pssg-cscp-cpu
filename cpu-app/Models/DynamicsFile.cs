using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gov.Cscp.VictimServices.Public.Models
{
	public class DynamicsFile
	{

		public string Buseinessbceid { get; set; }
		public string Userbceid { get; set; }

		public DynamicsDocument[] DocumentCollection { get; set; }
	}
}
