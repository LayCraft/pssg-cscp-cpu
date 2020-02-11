using Gov.Cscp.Victims.Public.Models;
using Gov.Cscp.Victims.Public.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.Rest;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System;

namespace Gov.Cscp.Victims.Public.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class DynamicsStatusReportController : Controller
	{
		private readonly IConfiguration _configuration;
		private readonly IDynamicsResultService _dynamicsResultService;
		private readonly IHttpContextAccessor _httpContextAccessor;

		public DynamicsStatusReportController(IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IDynamicsResultService dynamicsResultService)
		{
			this._httpContextAccessor = httpContextAccessor;
			this._configuration = configuration;
			this._dynamicsResultService = dynamicsResultService;
		}

		[HttpGet("{businessBceid}/{userBceid}/{programId}")]
		public async Task<IActionResult> GetQuestions(string businessBceid, string userBceid, string programId)
		{
			try
			{
				// convert the parameters to a json string
				string requestJson = "{\"UserBCeID\":\"" + userBceid + "\",\"BusinessBCeID\":\"" + businessBceid + "\"}";
				// set the endpoint action
				string endpointUrl = "vsd_programs(" + programId + ")/Microsoft.Dynamics.CRM.vsd_GetCPUMonthlyStatisticsQuestions";

				// get the response
				DynamicsResult result = await _dynamicsResultService.GetResultAsync(endpointUrl, requestJson);

				return StatusCode(200, result.result.ToString());
			}
			finally { }
		}
		[HttpPost("{programId}")]
		public async Task<IActionResult> AnswerQuestions([FromBody] MonthlyStatisticsAnswers model, string programId)
		{
			string task = "vsd_programs(" + programId + ")/Microsoft.Dynamics.CRM.vsd_SetCPUMonthlyStatisticsAnswers";

			// note: the model has the both user and business BCeIDs as well as the contract number so do we need to collect params? No.
			if (model == null)
			{
				// post has not included content
				return NoContent();
			}
			else
			{
				// post with the model and configuration included
				// make a new http client
				var client = new HttpClient();
				client.DefaultRequestHeaders.Add("x-client-SKU", "PCL.CoreCLR");
				client.DefaultRequestHeaders.Add("x-client-Ver", "5.1.0.0");
				client.DefaultRequestHeaders.Add("x-ms-PKeyAuth", "1.0");
				client.DefaultRequestHeaders.Add("client-request-id", Guid.NewGuid().ToString());
				client.DefaultRequestHeaders.Add("return-client-request-id", "true");
				client.DefaultRequestHeaders.Add("Accept", "application/json");

				// Construct the body of the request
				var pairs = new List<KeyValuePair<string, string>>
					{
						new KeyValuePair<string, string>("resource", _configuration["DYNAMICS_APP_GROUP_RESOURCE"]),
						new KeyValuePair<string, string>("client_id", _configuration["DYNAMICS_APP_GROUP_CLIENT_ID"]),
						new KeyValuePair<string, string>("client_secret", _configuration["DYNAMICS_APP_GROUP_SECRET"]),
						new KeyValuePair<string, string>("username", _configuration["DYNAMICS_USERNAME"]),
						new KeyValuePair<string, string>("password", _configuration["DYNAMICS_PASSWORD"]),
						new KeyValuePair<string, string>("scope", "openid"),
						new KeyValuePair<string, string>("response_mode", "form_post"),
						new KeyValuePair<string, string>("grant_type", "password")
					};
				// URL encode the content
				var content = new FormUrlEncodedContent(pairs);

				// get the response from the OAUTH2 api endpoint
				string _responseContent;
				try
				{
					HttpResponseMessage _httpResponse = await client.PostAsync(_configuration["ADFS_OAUTH2_URI"], content);
					// get the response content string
					_responseContent = _httpResponse.Content.ReadAsStringAsync().GetAwaiter().GetResult();
				}
				catch
				{
					Console.WriteLine("FOOBAR: Http post to OAUTH2 URI failed.");
					return StatusCode(500);
				}

				string token;
				try
				{
					// deserialize the response into a dictionary
					Dictionary<string, string> result = JsonConvert.DeserializeObject<Dictionary<string, string>>(_responseContent);
					// get the access token from the result and save it for posting to dynamics				
					token = result["access_token"];
				}
				catch
				{
					Console.WriteLine("FOOBAR: Could not collect access token: ");
					return StatusCode(500);
				}

				// rebuild the http client for posting to Dynamics
				client = new HttpClient();
				var Authorization = $"Bearer {token}";
				client.DefaultRequestHeaders.Add("Authorization", Authorization);
				client.DefaultRequestHeaders.Add("Cache-Control", "no-cache");
				client.DefaultRequestHeaders.Add("OData-Version", "4.0");
				client.DefaultRequestHeaders.Add("Accept", "application/json");

				// build the url for posting to this endpoint
				string url = _configuration["DYNAMICS_ODATA_URI"] + task;
				// construct the http request
				HttpRequestMessage _httpRequest = new HttpRequestMessage(HttpMethod.Post, url);
				HttpResponseMessage _httpResponse2 = null;
				HttpStatusCode _statusCode;
				try
				{
					// make options for the json serializer
					System.Text.Json.JsonSerializerOptions options = new System.Text.Json.JsonSerializerOptions();
					options.IgnoreNullValues = true;
					// turn the model into a string
					string modelString = System.Text.Json.JsonSerializer.Serialize(model, options);
					Console.Out.WriteLine("Grease");
					Console.Out.WriteLine(modelString);
					// replace the odata to @odata. because the class doesn't serialize with special characters like this
					// several cases: odatatype=>"@odata.type" odataetag=>"@odata.etag", "vsd_ExecutiveContactIdodatabind"=>"vsd_ExecutiveContactId@odata.bind" etc
					modelString = modelString.Replace("fortunecookie", "@odata.");
					Console.Out.WriteLine("Oranges");
					Console.Out.WriteLine(modelString);
					// serialize the model and put it onto the http request
					_httpRequest.Content = new StringContent(modelString, System.Text.Encoding.UTF8, "application/json");
					// send the request
					_httpResponse2 = await client.SendAsync(_httpRequest);
					_statusCode = _httpResponse2.StatusCode;
				}
				catch (Exception e)
				{
					Console.Out.WriteLine(e.Message);
					Console.Out.WriteLine(_httpResponse2.StatusCode);
					Console.WriteLine("FOOBAR: Could not serialize the model or the http response from Dynamics had a problem.");
					return StatusCode(500);
				}

				// clean up the response and save the content as a string
				string _responseString = _httpResponse2.ToString();
				// wait for the http to come back from dynamics
				string _responseContent2 = await _httpResponse2.Content.ReadAsStringAsync();
				var dynamicsResponse = System.Text.Json.JsonSerializer.Deserialize<DynamicsResponse>(_responseContent2);
				Console.Out.WriteLine("What does Dynamics say?");

				Console.Out.WriteLine(_responseContent2);
				if (dynamicsResponse.IsSuccess)
				{
					// Success. Return 
					return Ok(dynamicsResponse);
				}
				else
				{
					// bad gateway status code. Dynamics didn't like it.
					return StatusCode(502, dynamicsResponse);
				}
			}
		}

		internal class DynamicsResponse
		{
			public string fortunecookiecontext { get; set; }
			public bool IsSuccess { get; set; }
			public string Result { get; set; }
		}
	}
}