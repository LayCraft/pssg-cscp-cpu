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
using System.Text.Json;
using System.Threading.Tasks;
using System;


namespace Gov.Cscp.Victims.Public.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class DynamicsProgramApplicationController : Controller
    {
        private readonly IDynamicsResultService _dynamicsResultService;

        public DynamicsProgramApplicationController(IDynamicsResultService dynamicsResultService)
        {
            this._dynamicsResultService = dynamicsResultService;
        }

        [HttpGet("{businessBceid}/{userBceid}/{scheduleFId}")]
        public async Task<IActionResult> GetProgramApplication(string businessBceid, string userBceid, string scheduleFId)
        {
            try
            {
                // convert the parameters to a json string
                string requestJson = "{\"UserBCeID\":\"" + userBceid + "\",\"BusinessBCeID\":\"" + businessBceid + "\"}";
                // set the endpoint action
                string endpointUrl = "vsd_contracts(" + scheduleFId + ")/Microsoft.Dynamics.CRM.vsd_GetCPUScheduleF";

                // get the response
                DynamicsResult result = await _dynamicsResultService.GetResultAsync(endpointUrl, requestJson);

                return StatusCode(200, result.result.ToString());
            }
            finally { }
        }

        [HttpPost]
        public async Task<IActionResult> SetProgramApplication([FromBody] ProgramApplicationPost model)
        {
            try
            {
                string endpointUrl = "vsd_SetCPUOrgContracts";
                // make options for the json serializer
                JsonSerializerOptions options = new JsonSerializerOptions();
                // options.IgnoreNullValues = true;
                // turn the model into a string
                string modelString = System.Text.Json.JsonSerializer.Serialize(model, options);

                modelString = updateFortunecookieBindNull(modelString);

                //testing where we're erroring out...
                // modelString = "{\"BusinessBCeID\":\"fd889a40-14b2-e811-8163-480fcff4f621\",\"UserBCeID\":\"9e9b5111-51c9-e911-b80f-00505683fbf4\",\"ProgramContactCollection\":[{\"contactid\":\"8c1b1256-84d8-e811-815f-480fcff4f6a1\",\"vsd_programid\":\"83575723-be4d-ea11-b816-00505683fbf4\",\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_contact_vsd_program\"},{\"contactid\":\"2edab119-9044-ea11-b814-00505683fbf4\",\"vsd_programid\":\"83575723-be4d-ea11-b816-00505683fbf4\",\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_contact_vsd_program\"},{\"contactid\":\"d688bc2d-d63e-ea11-b814-00505683fbf4\",\"vsd_programid\":\"83575723-be4d-ea11-b816-00505683fbf4\",\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_contact_vsd_program\"},{\"contactid\":\"8c1b1256-84d8-e811-815f-480fcff4f6a1\",\"vsd_programid\":\"83575723-be4d-ea11-b816-00505683fbf4\",\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_contact_vsd_program\"},{\"contactid\":\"2edab119-9044-ea11-b814-00505683fbf4\",\"vsd_programid\":\"83575723-be4d-ea11-b816-00505683fbf4\",\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_contact_vsd_program\"},{\"contactid\":\"d688bc2d-d63e-ea11-b814-00505683fbf4\",\"vsd_programid\":\"83575723-be4d-ea11-b816-00505683fbf4\",\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_contact_vsd_program\"},{\"contactid\":\"8c1b1256-84d8-e811-815f-480fcff4f6a1\",\"vsd_programid\":\"84575723-be4d-ea11-b816-00505683fbf4\",\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_contact_vsd_program\"},{\"contactid\":\"2edab119-9044-ea11-b814-00505683fbf4\",\"vsd_programid\":\"84575723-be4d-ea11-b816-00505683fbf4\",\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_contact_vsd_program\"},{\"contactid\":\"d688bc2d-d63e-ea11-b814-00505683fbf4\",\"vsd_programid\":\"84575723-be4d-ea11-b816-00505683fbf4\",\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_contact_vsd_program\"},{\"contactid\":\"8c1b1256-84d8-e811-815f-480fcff4f6a1\",\"vsd_programid\":\"84575723-be4d-ea11-b816-00505683fbf4\",\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_contact_vsd_program\"},{\"contactid\":\"2edab119-9044-ea11-b814-00505683fbf4\",\"vsd_programid\":\"84575723-be4d-ea11-b816-00505683fbf4\",\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_contact_vsd_program\"},{\"contactid\":\"d688bc2d-d63e-ea11-b814-00505683fbf4\",\"vsd_programid\":\"84575723-be4d-ea11-b816-00505683fbf4\",\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_contact_vsd_program\"}],\"Organization\":{\"accountid\":\"ee3db438-1ea8-e911-b80e-00505683fbf4\",\"address1_city\":\"Cecil Lake\",\"address1_composite\":null,\"address1_country\":\"Canada\",\"address1_line1\":\"Line one\",\"address1_line2\":\"Line two\",\"address1_postalcode\":\"b3b3b3\",\"address1_stateorprovince\":\"British Columbia\",\"address2_city\":\"Victoria\",\"address2_composite\":null,\"address2_country\":\"Canada\",\"address2_line1\":\"address\",\"address2_line2\":\"address2\",\"address2_postalcode\":\"v8v8v8\",\"address2_stateorprovince\":\"British Columbia\",\"emailaddress1\":\"agape@hotmail.com\",\"fax\":\"12345678999\",\"fortunecookietype\":\"Microsoft.Dynamics.CRM.account\",\"name\":\"Village of Burns Lake\",\"telephone1\":\"604666-6666\",\"_vsd_executivecontactid_value\":null,\"_vsd_boardcontactid_value\":null},\"ProgramCollection\":[{\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_program\",\"vsd_addressline1\":\"123 Street\",\"vsd_addressline2\":\"Test Line 2\",\"vsd_city\":\"Burns Lake\",\"vsd_country\":\"Canada\",\"vsd_emailaddress\":\"info@burnslake.ca\",\"vsd_fax\":\"2502222222\",\"vsd_mailingaddressline1\":\"123 Street\",\"vsd_mailingaddressline2\":\"Test Line 2\",\"vsd_mailingcity\":\"Burns Lake\",\"vsd_mailingcountry\":\"Canada\",\"vsd_mailingpostalcodezip\":\"V3N0Q3\",\"vsd_mailingprovincestate\":\"British Columbia\",\"vsd_phonenumber\":\"2501111111\",\"vsd_postalcodezip\":\"V3N0Q3\",\"vsd_programid\":\"83575723-be4d-ea11-b816-00505683fbf4\",\"vsd_provincestate\":\"British Columbia\",\"vsd_ContactLookupfortunecookiebind\":\"/contacts(8c1b1256-84d8-e811-815f-480fcff4f6a1)\"},{\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_program\",\"vsd_addressline1\":\"Street 1\",\"vsd_addressline2\":\"Street 2\",\"vsd_city\":\"Burns Lake\",\"vsd_country\":\"Canada\",\"vsd_emailaddress\":\"email@burns.bc.ca\",\"vsd_fax\":\"2504763833\",\"vsd_mailingaddressline1\":\"Street 1\",\"vsd_mailingaddressline2\":\"Street 2\",\"vsd_mailingcity\":\"Burns Lake\",\"vsd_mailingcountry\":\"Canada\",\"vsd_mailingpostalcodezip\":\"T6Y7Y6\",\"vsd_mailingprovincestate\":\"British Columbia\",\"vsd_phonenumber\":\"2503738329\",\"vsd_postalcodezip\":\"T6Y7Y6\",\"vsd_programid\":\"84575723-be4d-ea11-b816-00505683fbf4\",\"vsd_provincestate\":\"British Columbia\",\"vsd_ContactLookupfortunecookiebind\":\"/contacts(8c1b1256-84d8-e811-815f-480fcff4f6a1)\"}],\"ContractCollection\":[{\"vsd_ContactLookup1fortunecookiebind\":\"/contacts(8c1b1256-84d8-e811-815f-480fcff4f6a1)\",\"vsd_ContactLookup2fortunecookiebind\":\"/contacts(8c1b1256-84d8-e811-815f-480fcff4f6a1)\",\"vsd_cpu_programstaffsubcontracted\":true,\"vsd_cpu_staffunionized\":false,\"vsd_cpu_insuranceoptions\":null,\"vsd_cpu_memberofcssea\":null,\"fortunecookietype\":\"Microsoft.Dynamics.CRM.vsd_contract\",\"vsd_contractid\":\"82575723-be4d-ea11-b816-00505683fbf4\",\"vsd_cpu_humanresourcepolices\":null,\"vsd_cpu_specificunion\":null,\"vsd_name\":null}]}";

                DynamicsResult result = await _dynamicsResultService.SetDataAsync(endpointUrl, modelString);

                return StatusCode(200, result.result.ToString());
            }
            finally { }
        }

        //TODO - put this in a helper section and use it for all API requests
        //e.g. vsd_ContactLookup1fortunecookiebind is the correct field to set a lookup value
        //BUT  _vsd_contactlookup1_value is what we need to send null to if we want to wipe that same lookup value
        //so this scraper goes through the model string and makes that appropriate change to fields that end in fortunecookiebind and have value null
        private string updateFortunecookieBindNull(string modelString)
        {
            string ret = "";
            string toCheck = modelString;
            var regex = new System.Text.RegularExpressions.Regex("\"[a-zA-Z0-9_]*fortunecookiebind\"");
            var matches = regex.Matches(modelString);

            foreach (var match in matches)
            {
                string key = match.ToString();
                int index = toCheck.IndexOf(key);
                string check = toCheck.Substring(index + key.Length, 5);

                if (check.Equals(":null"))
                {
                    string val = key.Replace("fortunecookiebind", "_value").ToLower();
                    val = val.Insert(1, "_");
                    var regex2 = new System.Text.RegularExpressions.Regex(System.Text.RegularExpressions.Regex.Escape(key));
                    toCheck = regex2.Replace(toCheck, val, 1);
                }
                else
                {
                    ret += toCheck.Substring(0, index + key.Length);
                    toCheck = toCheck.Substring(index + key.Length);
                }
            }

            ret += toCheck;
            return ret;
        }
    }
}