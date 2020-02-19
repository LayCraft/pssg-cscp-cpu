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

            // modelString = "{\"BusinessBCeID\":\"fd889a40-14b2-e811-8163-480fcff4f621\",\"UserBCeID\":\"9e9b5111-51c9-e911-b80f-00505683fbf4\",\"StaffCollection\":[{\"_parentcustomerid_value\":null,\"address1_city\":null,\"address1_composite\":null,\"address1_line1\":null,\"address1_line2\":null,\"address1_postalcode\":null,\"address1_stateorprovince\":null,\"contactid\":null,\"emailaddress1\":null,\"fax\":null,\"firstname\":\"test\",\"fullname\":null,\"jobtitle\":null,\"lastname\":\"test\",\"middlename\":\"test\",\"mobilephone\":null,\"fortunecookietype\":\"Microsoft.Dynamics.CRM.contact\",\"vsd_bceid\":null,\"statecode\":null}]}";
            DynamicsResult result = await _dynamicsResultService.SetDataAsync(endpointUrl, modelString);

            return StatusCode((int)result.statusCode, result.result.ToString());
        }


        [HttpPost("SetStaff", Name = "SetStaff")]
		public async Task<IActionResult> SetStaff([FromBody] OrganizationPost model)
		{
			if (model == null)
			{
				return StatusCode(502);

			}
			// build the url for posting to this endpoint
			string endpointUrl = "vsd_SetCPUOrgContracts";

			// make options for the json serializer
			JsonSerializerOptions options = new JsonSerializerOptions();
			options.IgnoreNullValues = true;
			// turn the model into a string
			string modelString = System.Text.Json.JsonSerializer.Serialize(model, options);
			DynamicsResult result = await _dynamicsResultService.SetDataAsync(endpointUrl, modelString);

			return StatusCode((int)result.statusCode, result.result.ToString());

		}
    }
}