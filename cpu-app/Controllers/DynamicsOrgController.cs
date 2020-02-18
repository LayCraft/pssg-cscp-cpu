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

            modelString = "{\"BusinessBCeID\":\"fd889a40-14b2-e811-8163-480fcff4f621\",\"UserBCeID\":\"9e9b5111-51c9-e911-b80f-00505683fbf4\",\"Organization\":{\"_vsd_boardcontactid_value\":null,\"_vsd_executivecontactid_value\":null,\"vsd_ExecutiveContactIdfortunecookiebind\":\"/contacts(8c1b1256-84d8-e811-815f-480fcff4f6a1)\",\"_vsd_boardcontactid_value\":null,\"accountid\":\"ee3db438-1ea8-e911-b80e-00505683fbf4\",\"address1_city\":\"Cecil Lake\",\"address1_composite\":null,\"address1_line1\":\"Line one\",\"address1_line2\":\"Line two\",\"address1_postalcode\":\"b3b3b3\",\"address1_stateorprovince\":\"British Columbia\",\"address2_city\":\"Victoria\",\"address2_composite\":null,\"address2_line1\":\"address\",\"address2_line2\":\"address2\",\"address2_postalcode\":\"v8v8v8\",\"address2_stateorprovince\":\"British Columbia\",\"emailaddress1\":\"agape@hotmail.com\",\"fax\":\"12345678999\",\"name\":null,\"fortunecookietype\":\"Microsoft.Dynamics.CRM.account\",\"telephone1\":\"604666-6666\"},\"StaffCollection\":null}";
            DynamicsResult result = await _dynamicsResultService.SetDataAsync(endpointUrl, modelString);

            return StatusCode(200, result.result.ToString());
        }
    }
}