using Gov.Cscp.VictimServices.Public.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.Rest;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System;

namespace Gov.Cscp.VictimServices.Public.Controllers
{

	[Route("api/[controller]")]
	public class DynamicsOrgController : Controller
	{
		private readonly IConfiguration _configuration;
		private readonly IHttpContextAccessor _httpContextAccessor;

		public DynamicsOrgController(IHttpContextAccessor httpContextAccessor)
		{
			this._httpContextAccessor = httpContextAccessor;
			// build the configuration for access from the secrets
			// TODO: is comment below still valid? 
			// Note: must also define a project guid for secrets in the .csproj add tag <UserSecretsId> containing a guid
			var builder = new ConfigurationBuilder()
			.AddEnvironmentVariables()
			.AddUserSecrets<Program>();
			// save the configuration in the class. Doing it in the constructor means that the file read is done at creation of the endpoint. Config changes restart the containers.
			this._configuration = builder.Build();
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] Models.DynamicsOrg model)
		{
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
				// client.DefaultRequestHeaders.Add("x-client-SKU", "PCL.CoreCLR");
				// client.DefaultRequestHeaders.Add("x-client-Ver", "5.1.0.0");
				// client.DefaultRequestHeaders.Add("x-ms-PKeyAuth", "1.0");
				client.DefaultRequestHeaders.Add("client-request-id", Guid.NewGuid().ToString());
				client.DefaultRequestHeaders.Add("return-client-request-id", "true");
				client.DefaultRequestHeaders.Add("Accept", "application/json");

				// string adfsOauth2Uri = _configuration["ADFS_OAUTH2_URI"]; // ADFS OAUTH2 URI - usually /adfs/oauth2/token on STS

				// string applicationGroupResource = _configuration["DYNAMICS_APP_GROUP_RESOURCE"]; // ADFS 2016 Application Group resource (URI)
				// string applicationGroupClientId = _configuration["DYNAMICS_APP_GROUP_CLIENT_ID"]; // ADFS 2016 Application Group Client ID
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
				string url = _configuration["DYNAMICS_APP_GROUP_RESOURCE"] + "vsd_SetCPUOrgContracts";
				// construct the http request
				HttpRequestMessage _httpRequest = new HttpRequestMessage(HttpMethod.Post, url);
				HttpResponseMessage _httpResponse2;
				HttpStatusCode _statusCode;
				try
				{
					// serialize the model and put it onto the http request
					_httpRequest.Content = new StringContent(System.Text.Json.JsonSerializer.Serialize(model), System.Text.Encoding.UTF8, "application/json");
					// send the request
					_httpResponse2 = await client.SendAsync(_httpRequest);
					_statusCode = _httpResponse2.StatusCode;
				}
				catch
				{
					Console.WriteLine("FOOBAR: Could not serialize the model or the http response from Dynamics had a problem.");
					return StatusCode(500);
				}

				// clean up the response and save the content as a string
				var _responseString = _httpResponse2.ToString();
				var _responseContent2 = await _httpResponse2.Content.ReadAsStringAsync();
				return Ok();
			}
		}

		internal class DynamicsResponse
		{
			public string odatacontext { get; set; }
			public bool IsSuccess { get; set; }
			public bool IsCompletedSuccessfully { get; set; }
			public string Result { get; set; }
		}
	}
}