using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Gov.Cscp.Victims.Public.Models;
using System.Text.Json.Serialization;
using System.Text.Json;
using Newtonsoft.Json.Linq;


namespace Gov.Cscp.Victims.Public.Services
{
	public class DynamicsBlobService : IDynamicsBlobService
	{
		// this collects a "blob" which is the main collection from Dynamics API
		// Passing a result json is a cheat way of not casting the result to models
		public Task<DynamicsResult> GetBlobAsync()
		{
			// make a new fake response for testing the service layer
			DynamicsResult blob = new DynamicsResult();
			blob.result = JObject.Parse("{\"foo\":\"baz\"}");

			return Task.FromResult(blob);
		}
	}
}