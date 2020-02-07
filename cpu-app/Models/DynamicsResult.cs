using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;

namespace Gov.Cscp.Victims.Public.Models
{
	public class DynamicsResult
	{
		// this just holds whatever was returned without casting it.
		public JsonDocument result { get; set; }
	}
}
