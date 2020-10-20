﻿using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System;

namespace Gov.Cscp.Victims.Public.Services
{
    public interface ICOASTAuthService
    {
        Task<string> GetToken();
    }

    public class COASTAuthService : ICOASTAuthService
    {
        private IConfiguration _configuration;
        private DateTime _accessTokenExpiration;
        private string _token;

        public COASTAuthService(IConfiguration configuration)
        {
            this._configuration = configuration;
            this._accessTokenExpiration = DateTime.Now;
            this._token = "";
        }

        public async Task<string> GetToken()
        {
            if (DateTime.Now.CompareTo(_accessTokenExpiration) > 0)
            {
                try
                {
                    string adfsOauth2Uri = _configuration["ADFS_OAUTH2_URI"];
                    string applicationGroupResource = _configuration["DYNAMICS_APP_GROUP_RESOURCE"];
                    string applicationGroupClientId = _configuration["DYNAMICS_APP_GROUP_CLIENT_ID"];
                    string applicationGroupSecret = _configuration["DYNAMICS_APP_GROUP_SECRET"];
                    string serviceAccountUsername = _configuration["DYNAMICS_USERNAME"];
                    string serviceAccountPassword = _configuration["DYNAMICS_PASSWORD"];

                    if (!string.IsNullOrEmpty(adfsOauth2Uri) &&
                        !string.IsNullOrEmpty(applicationGroupResource) &&
                        !string.IsNullOrEmpty(applicationGroupClientId) &&
                        !string.IsNullOrEmpty(applicationGroupSecret) &&
                        !string.IsNullOrEmpty(serviceAccountUsername) &&
                        !string.IsNullOrEmpty(serviceAccountPassword))
                    {
                        var stsClient = new HttpClient();

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

                        var content = new FormUrlEncodedContent(pairs);
                        var _httpResponse = await stsClient.PostAsync(adfsOauth2Uri, content);
                        var _responseContent = await _httpResponse.Content.ReadAsStringAsync();

                        JObject response = JObject.Parse(_httpResponse.Content.ReadAsStringAsync().GetAwaiter().GetResult());
                        string token = response.GetValue("access_token").ToString();
                        int expirationSeconds;
                        bool secondsParsed = int.TryParse(response.GetValue("expires_in").ToString(), out expirationSeconds);

                        if (!secondsParsed)
                        {
                            expirationSeconds = 3600;
                            throw new Exception("The expiration seconds were not parsed so a default of one hour is used.");
                        }
                        if (token == null)
                        {
                            //token problem
                            return "";
                            throw new Exception("The token couldn't be parsed.");
                        }

                        // set global access token expiry time to the value returned subtract 60 seconds for minute long authentication communication delays
                        this._accessTokenExpiration = DateTime.Now.AddSeconds(expirationSeconds - 60);
                        this._token = token;
                        return token;

                    }
                    else
                    {
                        return "error";
                        throw new Exception("No configured connection to Dynamics.");
                    }
                }
                catch (Exception e)
                {
                    return "error";
                    throw e;
                }
            }
            else
            {
                return this._token;
            }
        }
    }
}
