using Gov.Cscp.Victims.Public.Models;
using Gov.Cscp.Victims.Public.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using System.Threading.Tasks;

namespace Gov.Cscp.Victims.Public.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class DynamicsFileController : Controller
	{
		private readonly IHttpContextAccessor _httpContextAccessor;
		private readonly IDynamicsResultService _dynamicsResultService;
		private readonly IConfiguration _configuration;

		public DynamicsFileController(IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IDynamicsResultService dynamicsResultService)
		{
			this._httpContextAccessor = httpContextAccessor;
			this._configuration = configuration;
			this._dynamicsResultService = dynamicsResultService;
		}

		[HttpGet("{businessBceid}/{userBceid}/{contractId}")]
		public async Task<IActionResult> GetFile(string userBceid, string businessBceid, string contractId)
		{
			try
			{
				// convert the parameters to a json string
				string requestJson = "{\"UserBCeID\":\"" + userBceid + "\",\"BusinessBCeID\":\"" + businessBceid + "\"}";
				// set the endpoint action
				string endpointUrl = "vsd_contracts(" + contractId + ")/Microsoft.Dynamics.CRM.vsd_GetCPUContractDocuments";

				// get the response
				DynamicsResult result = await _dynamicsResultService.GetResultAsync(endpointUrl, requestJson);

				return StatusCode(200, result.result.ToString());
			}
			finally { }
		}

		[HttpPost]
		public async Task<IActionResult> SetFiles([FromBody] FilePost model)
		{
			// return null because this needs to be handled as files.
			try
			{
				string endpointUrl = "vsd_SetCPUOrgContracts";

				// make options for the json serializer
				JsonSerializerOptions options = new JsonSerializerOptions();
				options.IgnoreNullValues = true;
				// turn the model into a string
				string modelString = System.Text.Json.JsonSerializer.Serialize(model, options);
				DynamicsResult result = await _dynamicsResultService.SetDataAsync(endpointUrl, modelString);

				return StatusCode(200, result.result.ToString());
			}
			finally { }
		}
	}
}