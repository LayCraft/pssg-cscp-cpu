using Gov.Cscp.Victims.Public.Models;
using Gov.Cscp.Victims.Public.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Text.Json;

namespace Gov.Cscp.Victims.Public.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class DynamicsExpenseReportController : Controller
	{
		private readonly IDynamicsResultService _dynamicsResultService;

		public DynamicsExpenseReportController(IDynamicsResultService dynamicsResultService)
		{
			this._dynamicsResultService = dynamicsResultService;
		}

		[HttpGet("{businessBceid}/{userBceid}/{expenseReportId}")]
		public async Task<IActionResult> GetExpenseReport(string businessBceid, string userBceid, string expenseReportId)
		{
			try
			{
				// convert the parameters to a json string
				string requestJson = "{\"UserBCeID\":\"" + userBceid + "\",\"BusinessBCeID\":\"" + businessBceid + "\"}";
				// set the endpoint action
				string endpointUrl = "vsd_schedulegs(" + expenseReportId + ")/Microsoft.Dynamics.CRM.vsd_GetCPUScheduleG";

				// get the response
				DynamicsResult result = await _dynamicsResultService.GetResultAsync(endpointUrl, requestJson);

				return StatusCode(200, result.result.ToString());
			}
			finally { }
		}

		[HttpPost]
		public async Task<IActionResult> SetExpenseReport([FromBody] ExpenseReportPost model)
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

                DynamicsResult result = await _dynamicsResultService.SetDataAsync(endpointUrl, modelString);

                return StatusCode((int)result.statusCode, result.result.ToString());
			}
			finally { }
		}
	}
}