using Gov.Cscp.Victims.Public.Models;
using Gov.Cscp.Victims.Public.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Net;
using System.Threading.Tasks;
using System.Text.Json;
using System;


namespace Gov.Cscp.Victims.Public.Controllers
{

    [Route("api/[controller]")]
    public class DynamicsOrgController : Controller
    {
        private readonly IDynamicsResultService _dynamicsResultService;

        public DynamicsOrgController(IDynamicsResultService dynamicsResultService)
        {
            this._dynamicsResultService = dynamicsResultService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OrganizationPost model)
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

            return StatusCode(200, result.result.ToString());
        }
    }
}