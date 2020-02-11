using Gov.Cscp.Victims.Public.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace Gov.Cscp.Victims.Public.Services
{
	public interface IDynamicsResultService
	{
		Task<DynamicsResult> GetResultAsync(string endpointUrl, string requestJson);
	}
}