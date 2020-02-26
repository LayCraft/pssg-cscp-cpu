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
                if (model == null)
                {
                    return StatusCode(502);

                }

                string endpointUrl = "vsd_SetCPUOrgContracts";
                // turn the model into a string
                string modelString = System.Text.Json.JsonSerializer.Serialize(model);
                modelString = Helpers.Helpers.updateFortunecookieBindNull(modelString);
                //_ownerid_value on the Organization is already ignored by the CRM API, so don't need to remove it
				modelString = "{\"BusinessBCeID\":\"fd889a40-14b2-e811-8163-480fcff4f621\",\"UserBCeID\":\"9e9b5111-51c9-e911-b80f-00505683fbf4\",\"ProgramRevenueSourceCollection\":[{\"fortunecookietype\":\"#Microsoft.Dynamics.CRM.vsd_programrevenuesource\",\"vsd_programrevenuesourceid\":\"ce2128c3-9b52-ea11-b816-00505683fbf4\",\"vsd_cpu_revenuesourcetype\":100000000,\"vsd_cashcontribution\":60000,\"vsd_inkindcontribution\":0,\"vsd_ProgramIdfortunecookiebind\":\"/vsd_programs(6c533c61-9b52-ea11-b816-00505683fbf4)\"}]}";
                DynamicsResult result = await _dynamicsResultService.SetDataAsync(endpointUrl, modelString);

                return StatusCode((int)result.statusCode, result.result.ToString());
            }
            finally { }

			// try
			// {
			// 	string endpointUrl = "vsd_SetCPUOrgContracts";

			// 	// make options for the json serializer
			// 	JsonSerializerOptions options = new JsonSerializerOptions();
			// 	options.IgnoreNullValues = true;
			// 	// turn the model into a string
			// 	string modelString = System.Text.Json.JsonSerializer.Serialize(model, options);
			// 	DynamicsResult result = await _dynamicsResultService.SetDataAsync(endpointUrl, modelString);

			// 	return StatusCode(200, result.result.ToString());
			// }
			// finally { }
		}
	}
}