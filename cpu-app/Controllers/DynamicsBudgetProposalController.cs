using Gov.Cscp.Victims.Public.Models;
using Gov.Cscp.Victims.Public.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Threading.Tasks;


namespace Gov.Cscp.Victims.Public.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class DynamicsBudgetProposalController : Controller
	{
		private readonly IDynamicsResultService _dynamicsResultService;

		public DynamicsBudgetProposalController(IDynamicsResultService dynamicsResultService)
		{
			this._dynamicsResultService = dynamicsResultService;
		}

		[HttpGet("{businessBceid}/{userBceid}/{contractId}")]
		public async Task<IActionResult> GetBudgetProposal(string businessBceid, string userBceid, string contractId)
		{
			try
			{
				// convert the parameters to a json string
				string requestJson = "{\"UserBCeID\":\"" + userBceid + "\",\"BusinessBCeID\":\"" + businessBceid + "\"}";
				// set the endpoint action
				string endpointUrl = "vsd_contracts(" + contractId + ")/Microsoft.Dynamics.CRM.vsd_GetCPUBudgetProposal";

				// get the response
				DynamicsResult result = await _dynamicsResultService.GetResultAsync(endpointUrl, requestJson);

				return StatusCode(200, result.result.ToString());
			}
			finally { }
		}

		[HttpPost]
		public async Task<IActionResult> SetBudgetProposal([FromBody] BudgetProposalPost model)
		{
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