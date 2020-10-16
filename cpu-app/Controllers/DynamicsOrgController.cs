using Gov.Cscp.Victims.Public.Models;
using Gov.Cscp.Victims.Public.Services;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
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
            string modelString = System.Text.Json.JsonSerializer.Serialize(model);
            modelString = Helpers.Helpers.updateFortunecookieBindNull(modelString);
            modelString = Helpers.Helpers.removeNullsForStaffUpdate(modelString);
            DynamicsResult result = await _dynamicsResultService.Post(endpointUrl, modelString);

            return StatusCode((int)result.statusCode, result.result.ToString());
        }


        [HttpPost("SetStaff", Name = "SetStaff")]
        public async Task<IActionResult> SetStaff([FromBody] OrganizationPost model)
        {
            if (model == null)
            {
                return StatusCode(502);
            }

            string endpointUrl = "vsd_SetCPUOrgContracts";
            string modelString = System.Text.Json.JsonSerializer.Serialize(model);
            modelString = Helpers.Helpers.updateFortunecookieBindNull(modelString);
            modelString = Helpers.Helpers.removeNullsForStaffUpdate(modelString);
            DynamicsResult result = await _dynamicsResultService.Post(endpointUrl, modelString);

            return StatusCode((int)result.statusCode, result.result.ToString());
        }
    }
}