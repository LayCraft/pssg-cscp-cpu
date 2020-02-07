using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using Newtonsoft.Json.Linq;


namespace Gov.Cscp.Victims.Public.Models
{
	public class DynamicsResult
	{
		// this just holds whatever was returned without casting it.
		public JObject result { get; set; }
	}
}
