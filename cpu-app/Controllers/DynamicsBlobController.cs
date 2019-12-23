using Gov.Cscp.VictimServices.Public.Models;
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
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System;

namespace Gov.Cscp.VictimServices.Public.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class DynamicsBlobController : Controller
	{
		private readonly IConfiguration _configuration;

		private readonly IHttpContextAccessor _httpContextAccessor;

		public DynamicsBlobController(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
		{
			this._httpContextAccessor = httpContextAccessor;
			this._configuration = configuration;
		}

		[HttpGet("{businessBceid}/{userBceid}")]
		public async Task<IActionResult> GetBlob(string userBceid, string businessBceid)
		{
			try
			{
				// convert the parameters to a json string
				string applicationJson = "{\"UserBCeID\":\"" + userBceid + "\",\"BusinessBCeID\":\"" + businessBceid + "\"}";
				// set the endpoint action
				string endpointAction = "vsd_GetCPUOrgContracts";
				// get the response
				Tuple<int, string, HttpResponseMessage> tuple = await GetDynamicsHttpClient(_configuration, applicationJson, endpointAction);

				string response = tuple.Item2.Replace("@odata.", "fortunecookie");
				// convert response string into a json object and return it
				return new JsonResult(JsonConvert.DeserializeObject(response));
			}
			finally { }
		}
		static async Task<Tuple<int, string, HttpResponseMessage>> GetDynamicsHttpClient(IConfiguration configuration, string model, string endPointName)
		{

			var builder = new ConfigurationBuilder()
					.AddEnvironmentVariables()
					.AddUserSecrets<Program>(); // must also define a project guid for secrets in the .cspro � add tag <UserSecretsId> containing a guid
			var Configuration = builder.Build();

			string dynamicsOdataUri = Configuration["DYNAMICS_ODATA_URI"]; // Dynamics ODATA endpoint
			string dynamicsJobName = endPointName;// Configuration["DYNAMICS_JOB_NAME"]; // Dynamics Job Name

			if (string.IsNullOrEmpty(dynamicsOdataUri))
			{
				throw new Exception("Configuration setting DYNAMICS_ODATA_URI is blank.");
			}

			// Cloud - x.dynamics.com
			string aadTenantId = Configuration["DYNAMICS_AAD_TENANT_ID"]; // Cloud AAD Tenant ID
			string serverAppIdUri = Configuration["DYNAMICS_SERVER_APP_ID_URI"]; // Cloud Server App ID URI
			string appRegistrationClientKey = Configuration["DYNAMICS_APP_REG_CLIENT_KEY"]; // Cloud App Registration Client Key
			string appRegistrationClientId = Configuration["DYNAMICS_APP_REG_CLIENT_ID"]; // Cloud App Registration Client Id

			// One Premise ADFS (2016)
			string adfsOauth2Uri = Configuration["ADFS_OAUTH2_URI"]; // ADFS OAUTH2 URI - usually /adfs/oauth2/token on STS
			string applicationGroupResource = Configuration["DYNAMICS_APP_GROUP_RESOURCE"]; // ADFS 2016 Application Group resource (URI)
			string applicationGroupClientId = Configuration["DYNAMICS_APP_GROUP_CLIENT_ID"]; // ADFS 2016 Application Group Client ID
			string applicationGroupSecret = Configuration["DYNAMICS_APP_GROUP_SECRET"]; // ADFS 2016 Application Group Secret
			string serviceAccountUsername = Configuration["DYNAMICS_USERNAME"]; // Service account username
			string serviceAccountPassword = Configuration["DYNAMICS_PASSWORD"]; // Service account password

			// API Gateway to NTLM user.  This is used in v8 environments.  Note that the SSG Username and password are not the same as the NTLM user.
			string ssgUsername = Configuration["SSG_USERNAME"];  // BASIC authentication username
			string ssgPassword = Configuration["SSG_PASSWORD"];  // BASIC authentication password

			ServiceClientCredentials serviceClientCredentials = null;
			if (!string.IsNullOrEmpty(appRegistrationClientId) && !string.IsNullOrEmpty(appRegistrationClientKey) && !string.IsNullOrEmpty(serverAppIdUri) && !string.IsNullOrEmpty(aadTenantId))
			// Cloud authentication - using an App Registration's client ID, client key.  Add the App Registration to Dynamics as an Application User.
			{
				var authenticationContext = new AuthenticationContext(
				"https://login.windows.net/" + aadTenantId);
				ClientCredential clientCredential = new ClientCredential(appRegistrationClientId, appRegistrationClientKey);
				var task = authenticationContext.AcquireTokenAsync(serverAppIdUri, clientCredential);
				task.Wait();
				var authenticationResult = task.Result;
				string token = authenticationResult.CreateAuthorizationHeader().Substring("Bearer ".Length);
				serviceClientCredentials = new TokenCredentials(token);
			}
			if (!string.IsNullOrEmpty(adfsOauth2Uri) &&
									!string.IsNullOrEmpty(applicationGroupResource) &&
									!string.IsNullOrEmpty(applicationGroupClientId) &&
									!string.IsNullOrEmpty(applicationGroupSecret) &&
									!string.IsNullOrEmpty(serviceAccountUsername) &&
									!string.IsNullOrEmpty(serviceAccountPassword))
			// ADFS 2016 authentication - using an Application Group Client ID and Secret, plus service account credentials.
			{
				// create a new HTTP client that is just used to get a token.
				var stsClient = new HttpClient();

				//stsClient.DefaultRequestHeaders.Add("x-client-SKU", "PCL.CoreCLR");
				//stsClient.DefaultRequestHeaders.Add("x-client-Ver", "5.1.0.0");
				// stsClient.DefaultRequestHeaders.Add("x-ms-PKeyAuth", "1.0");

				stsClient.DefaultRequestHeaders.Add("client-request-id", Guid.NewGuid().ToString());
				stsClient.DefaultRequestHeaders.Add("return-client-request-id", "true");
				stsClient.DefaultRequestHeaders.Add("Accept", "application/json");

				// Construct the body of the request
				var pairs = new List<KeyValuePair<string, string>>
					{
						new KeyValuePair<string, string>("resource", applicationGroupResource),
						new KeyValuePair<string, string>("client_id", applicationGroupClientId),
						new KeyValuePair<string, string>("client_secret", applicationGroupSecret),
						new KeyValuePair<string, string>("username", serviceAccountUsername),
						new KeyValuePair<string, string>("password", serviceAccountPassword),
						new KeyValuePair<string, string>("scope", "openid"),
						new KeyValuePair<string, string>("response_mode", "form_post"),
						new KeyValuePair<string, string>("grant_type", "password")
						};

				// This will also set the content type of the request
				var content = new FormUrlEncodedContent(pairs);
				// send the request to the ADFS server
				var _httpResponse = stsClient.PostAsync(adfsOauth2Uri, content).GetAwaiter().GetResult();
				var _responseContent = _httpResponse.Content.ReadAsStringAsync().GetAwaiter().GetResult();
				// response should be in JSON format.
				try
				{
					Dictionary<string, string> result = JsonConvert.DeserializeObject<Dictionary<string, string>>(_responseContent);
					string token = result["access_token"];
					// set the bearer token.
					serviceClientCredentials = new TokenCredentials(token);


					// Code to perform Scheduled task
					var client = new HttpClient();
					client.DefaultRequestHeaders.Add("x-client-SKU", "PCL.CoreCLR");
					client.DefaultRequestHeaders.Add("x-client-Ver", "5.1.0.0");
					client.DefaultRequestHeaders.Add("x-ms-PKeyAuth", "1.0");
					client.DefaultRequestHeaders.Add("client-request-id", Guid.NewGuid().ToString());
					client.DefaultRequestHeaders.Add("return-client-request-id", "true");
					client.DefaultRequestHeaders.Add("Accept", "application/json");

					client = new HttpClient();
					var Authorization = $"Bearer {token}";
					client.DefaultRequestHeaders.Add("Authorization", Authorization);
					client.DefaultRequestHeaders.Add("OData-MaxVersion", "4.0");
					client.DefaultRequestHeaders.Add("OData-Version", "4.0");
					client.DefaultRequestHeaders.Add("Accept", "application/json");
					//client.DefaultRequestHeaders.Add("content-type", "application/json");
					//client.DefaultRequestHeaders.Add("Content-Type", "application/json; charset=utf-8");

					string url = dynamicsOdataUri + dynamicsJobName;

					HttpRequestMessage _httpRequest = new HttpRequestMessage(HttpMethod.Post, url);
					_httpRequest.Content = new StringContent(model, Encoding.UTF8, "application/json");
					//_httpRequest.Content = new StringContent(model);

					//                    // THIS SHOULD BECOME A DYNAMICS MODEL
					//                    var dynamicsModel = model; // model.ToDynamicsModel();
					//                    var invoiceJson = JsonConvert.SerializeObject(dynamicsModel);
					//
					//                    _httpRequest.Content = new StringContent(invoiceJson, Encoding.UTF8, "application/json");




					var _httpResponse2 = await client.SendAsync(_httpRequest);
					HttpStatusCode _statusCode = _httpResponse2.StatusCode;

					var _responseString = _httpResponse2.ToString();
					var _responseContent2 = await _httpResponse2.Content.ReadAsStringAsync();

					Console.Out.WriteLine(model);
					Console.Out.WriteLine(_responseString);
					Console.Out.WriteLine(_responseContent2);

					return new Tuple<int, string, HttpResponseMessage>((int)_statusCode, _responseContent2, _httpResponse2);
					// End of scheduled task
				}
				catch (Exception e)
				{
					// todo: console out
					return new Tuple<int, string, HttpResponseMessage>(100, "", null);
					throw new Exception(e.Message + " " + _responseContent);
				}

			}
			else if (!string.IsNullOrEmpty(ssgUsername) && !string.IsNullOrEmpty(ssgPassword))
			// Authenticate using BASIC authentication - used for API Gateways with BASIC authentication.  Add the NTLM user associated with the API gateway entry to Dynamics as a user.            
			{
				serviceClientCredentials = new BasicAuthenticationCredentials()
				{
					UserName = ssgUsername,
					Password = ssgPassword
				};
			}
			else
			{
				throw new Exception("No configured connection to Dynamics.");
			}

			return new Tuple<int, string, HttpResponseMessage>(100, "", null);
		}
	}

}