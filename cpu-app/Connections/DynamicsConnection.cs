using System.Threading.Tasks;
using Gov.Cscp.Victims.Public.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections;
using System.Net.Http;
using System.Net;




namespace Gov.Cscp.Victims.Public.Services
{
	public class DynamicsConnection
	{
		private PersistentConnection _dynamicsConnection;
		DynamicsConnection(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
		{
			this._dynamicsConnection = new PersistentConnection(configuration, httpContextAccessor);
		}
		public async Task<DynamicsResult> GetDynamicsResultAsync(string endpointUrl, string requestJson)
		{
			//TODO: if the connection is alive use it otherwise reinitialize it.
			DynamicsResult result = await this._dynamicsConnection.GetDynamicsResultAsync(endpointUrl, requestJson);
			return result;
		}


		private class PersistentConnection
		{
			private IConfiguration _configuration;
			private HttpClient _client;
			public PersistentConnection(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
			{
				//  Do a bunch of things to create a persistent connection that we can re-query
				// this class sets up a persistent connection.
				MakeConnection();
				// when a user needs to request something, they submit an asynchronous request
			}
			public bool IsAlive()
			{
				// check the connection for liveliness. If unresponsive make another connection.
				return true;
			}
			public async Task<DynamicsResult> GetDynamicsResultAsync(string endpointUrl, string requestJson)
			{

				// TODO: should check for a connection before diving into this request stuff.
				// add the dynamics url
				endpointUrl = _configuration["DYNAMICS_ODATA_URI"] + endpointUrl;

				HttpRequestMessage _httpRequest = new HttpRequestMessage(HttpMethod.Post, endpointUrl);
				_httpRequest.Content = new StringContent(requestJson, System.Text.Encoding.UTF8, "application/json");

				var _httpResponse2 = await _client.SendAsync(_httpRequest);
				HttpStatusCode _statusCode = _httpResponse2.StatusCode;

				var _responseString = _httpResponse2.ToString();
				var _responseContent2 = await _httpResponse2.Content.ReadAsStringAsync();

				var result = new DynamicsResult();
				result.statusCode = _statusCode;
				result.responseMessage = _httpResponse2;
				result.result = Newtonsoft.Json.Linq.JObject.Parse(_responseContent2);
				// send the result back
				return result;
			}
			private void MakeConnection()
			{
				// Collect all configuration into a configuration object
				// Note: must also define a project guid for secrets in the .csproj add tag <UserSecretsId> containing a guid
				var builder = new ConfigurationBuilder()
					.AddEnvironmentVariables()
					.AddUserSecrets<Program>();
				_configuration = builder.Build();

				// Dynamics ODATA endpoint null check
				if (string.IsNullOrEmpty(_configuration["DYNAMICS_ODATA_URI"]))
				{
					throw new Exception("Configuration setting DYNAMICS_ODATA_URI is blank.");
				}

				// Cloud AAD Tenant ID
				string aadTenantId = _configuration["DYNAMICS_AAD_TENANT_ID"];
				// Cloud Server App ID URI
				string serverAppIdUri = _configuration["DYNAMICS_SERVER_APP_ID_URI"];
				// Cloud App Registration Client Key
				string appRegistrationClientKey = _configuration["DYNAMICS_APP_REG_CLIENT_KEY"];
				// Cloud App Registration Client Id
				string appRegistrationClientId = _configuration["DYNAMICS_APP_REG_CLIENT_ID"];

				// One Premise ADFS (2016)
				// ADFS OAUTH2 URI - usually /adfs/oauth2/token on STS
				string adfsOauth2Uri = _configuration["ADFS_OAUTH2_URI"];
				// ADFS 2016 Application Group resource (URI)
				string applicationGroupResource = _configuration["DYNAMICS_APP_GROUP_RESOURCE"];
				// ADFS 2016 Application Group Client ID
				string applicationGroupClientId = _configuration["DYNAMICS_APP_GROUP_CLIENT_ID"];
				// ADFS 2016 Application Group Secret
				string applicationGroupSecret = _configuration["DYNAMICS_APP_GROUP_SECRET"];

				// Service account username
				string serviceAccountUsername = _configuration["DYNAMICS_USERNAME"];
				// Service account password
				string serviceAccountPassword = _configuration["DYNAMICS_PASSWORD"];

				// API Gateway to NTLM user.  This is used in v8 environments.  Note that the SSG Username and password are not the same as the NTLM user.
				string ssgUsername = _configuration["SSG_USERNAME"];  // BASIC authentication username
				string ssgPassword = _configuration["SSG_PASSWORD"];  // BASIC authentication password

				Microsoft.Rest.ServiceClientCredentials serviceClientCredentials = null;
				if (!string.IsNullOrEmpty(appRegistrationClientId) && !string.IsNullOrEmpty(appRegistrationClientKey) && !string.IsNullOrEmpty(serverAppIdUri) && !string.IsNullOrEmpty(aadTenantId))
				// Cloud authentication - using an App Registration's client ID, client key.  Add the App Registration to Dynamics as an Application User.
				{
					var authenticationContext = new Microsoft.IdentityModel.Clients.ActiveDirectory.AuthenticationContext("https://login.windows.net/" + aadTenantId);
					var clientCredential = new Microsoft.IdentityModel.Clients.ActiveDirectory.ClientCredential(appRegistrationClientId, appRegistrationClientKey);
					var task = authenticationContext.AcquireTokenAsync(serverAppIdUri, clientCredential);
					task.Wait();
					var authenticationResult = task.Result;
					string token = authenticationResult.CreateAuthorizationHeader().Substring("Bearer ".Length);
					serviceClientCredentials = new Microsoft.Rest.TokenCredentials(token);
				}

				// if all credentials are in place for ADFS authorization
				if (!string.IsNullOrEmpty(adfsOauth2Uri) &&
					!string.IsNullOrEmpty(applicationGroupResource) &&
					!string.IsNullOrEmpty(applicationGroupClientId) &&
					!string.IsNullOrEmpty(applicationGroupSecret) &&
					!string.IsNullOrEmpty(serviceAccountUsername) &&
					!string.IsNullOrEmpty(serviceAccountPassword))
				{
					// create a new HTTP client that is just used to get a token.
					var stsClient = new HttpClient();

					stsClient.DefaultRequestHeaders.Add("x-client-SKU", "PCL.CoreCLR");
					stsClient.DefaultRequestHeaders.Add("x-client-Ver", "5.1.0.0");
					stsClient.DefaultRequestHeaders.Add("x-ms-PKeyAuth", "1.0");
					stsClient.DefaultRequestHeaders.Add("client-request-id", Guid.NewGuid().ToString());
					stsClient.DefaultRequestHeaders.Add("return-client-request-id", "true");
					stsClient.DefaultRequestHeaders.Add("Accept", "application/json");

					// Construct the body of the request
					var pairs = new System.Collections.Generic.List<System.Collections.Generic.KeyValuePair<string, string>>
					{
						new System.Collections.Generic.KeyValuePair<string, string>("resource", applicationGroupResource),
						new System.Collections.Generic.KeyValuePair<string, string>("client_id", applicationGroupClientId),
						new System.Collections.Generic.KeyValuePair<string, string>("client_secret", applicationGroupSecret),
						new System.Collections.Generic.KeyValuePair<string, string>("username", serviceAccountUsername),
						new System.Collections.Generic.KeyValuePair<string, string>("password", serviceAccountPassword),
						new System.Collections.Generic.KeyValuePair<string, string>("scope", "openid"),
						new System.Collections.Generic.KeyValuePair<string, string>("response_mode", "form_post"),
						new System.Collections.Generic.KeyValuePair<string, string>("grant_type", "password")
						};

					// This will also set the content type of the request
					var content = new FormUrlEncodedContent(pairs);
					// send the request to the ADFS server
					var _httpResponse = stsClient.PostAsync(adfsOauth2Uri, content).GetAwaiter().GetResult();
					// response should be in JSON format.
					var _responseContent = _httpResponse.Content.ReadAsStringAsync().GetAwaiter().GetResult();
					try
					{
						System.Collections.Generic.Dictionary<string, string> result =
						Newtonsoft.Json.JsonConvert.DeserializeObject<System.Collections.Generic.Dictionary<string, string>>(_responseContent);
						string token = result["access_token"];
						// set the bearer token.
						serviceClientCredentials = new Microsoft.Rest.TokenCredentials(token);

						// Code to perform Scheduled task
						_client = new HttpClient();
						_client.DefaultRequestHeaders.Add("x-client-SKU", "PCL.CoreCLR");
						_client.DefaultRequestHeaders.Add("x-client-Ver", "5.1.0.0");
						_client.DefaultRequestHeaders.Add("x-ms-PKeyAuth", "1.0");
						_client.DefaultRequestHeaders.Add("client-request-id", Guid.NewGuid().ToString());
						_client.DefaultRequestHeaders.Add("return-client-request-id", "true");
						_client.DefaultRequestHeaders.Add("Accept", "application/json");

						_client = new HttpClient();
						var Authorization = $"Bearer {token}";
						_client.DefaultRequestHeaders.Add("Authorization", Authorization);
						_client.DefaultRequestHeaders.Add("OData-MaxVersion", "4.0");
						_client.DefaultRequestHeaders.Add("OData-Version", "4.0");
						_client.DefaultRequestHeaders.Add("Accept", "application/json");

					}
					catch (Exception e)
					{
						// todo: console out
						// return new Tuple<int, string, HttpResponseMessage>(100, "", null);
						throw new Exception(e.Message);
					}

				}
				else if (!string.IsNullOrEmpty(ssgUsername) && !string.IsNullOrEmpty(ssgPassword))
				// Authenticate using BASIC authentication - used for API Gateways with BASIC authentication.  Add the NTLM user associated with the API gateway entry to Dynamics as a user.            
				{
					serviceClientCredentials = new Microsoft.Rest.BasicAuthenticationCredentials()
					{
						UserName = ssgUsername,
						Password = ssgPassword
					};
				}
				else
				{
					throw new Exception("No configured connection to Dynamics.");
				}
			}
		}
	}
}