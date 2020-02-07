using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Gov.Cscp.Victims.Public.Models;
using System.Text.Json.Serialization;
using System.Text.Json;


namespace Gov.Cscp.Victims.Public.Services
{
	public class DynamicsBlobService : IDynamicsBlobService
	{
		// this collects a "blob" which is the main collection from Dynamics API
		// Passing a result json is a cheat way of not casting the result to models
		public Task<DynamicsResult> GetBlobAsync()
		{
			// make a new fake response for testing the service layer
			var blob = new DynamicsResult();
			blob.result = JsonDocument.Parse("{\"foo\":\"bar\"}");
			return Task.FromResult(blob);
		}
	}
}