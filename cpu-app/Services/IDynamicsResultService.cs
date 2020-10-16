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
		Task<DynamicsResult> Get(string endpointUrl);
		Task<DynamicsResult> Post(string endpointUrl, string requestJson);
	}
}