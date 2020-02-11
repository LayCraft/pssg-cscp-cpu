using Gov.Cscp.Victims.Public.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
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