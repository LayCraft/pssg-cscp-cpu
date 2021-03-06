using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
// using Gov.Cscp.Victims.Public.Interfaces;
// using Gov.Cscp.Victims.Public.Interfaces.Models;
using Gov.Cscp.Victims.Public.Services;
using Gov.Cscp.Victims.Public.Models;
using Gov.Cscp.Victims.Public.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Redis;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Gov.Cscp.Victims.Public.Controllers
{
    [Route("login")]
    public class LoginController : Controller
    {
        // ************* FROM PILL PRESS *****************

        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHostingEnvironment _env;
        private readonly Authentication.SiteMinderAuthOptions _options = new Authentication.SiteMinderAuthOptions();
        //   private readonly ILogger _logger;
        //   private readonly IDynamicsClient _dynamicsClient;
        private IDynamicsResultService _dynamicsResultService;
        //   const string BUSINESS_PROFILE_PAGE = "business-profile";

        public LoginController(
            IConfiguration configuration,
            IHttpContextAccessor httpContextAccessor
            // IDynamicsResultService dynamicsResultService
            // IDynamicsClient dynamicsClient, 
            // IHostingEnvironment env, 
            // ILoggerFactory loggerFactory
            )
        {
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            // this._dynamicsResultService = dynamicsResultService;
            //       _env = env;
            //       _logger = loggerFactory.CreateLogger(typeof(LoginController));
            //       this._dynamicsClient = dynamicsClient;
        }

        [HttpGet]
        [Authorize]
        public ActionResult Login(string path)
        {
            //       // check to see if we have a local path.  (do not allow a redirect to another website)
            //       if (!string.IsNullOrEmpty(path) && (Url.IsLocalUrl(path) || (!_env.IsProduction() && path.Equals("headers"))))
            //       {
            //           // diagnostic feature for development - echo headers back.
            //           if ((!_env.IsProduction()) && path.Equals("headers"))
            //           {
            //               StringBuilder html = new StringBuilder();
            //               html.AppendLine("<html>");
            //               html.AppendLine("<body>");
            //               html.AppendLine("<b>Request Headers:</b>");
            //               html.AppendLine("<ul style=\"list-style-type:none\">");
            //               foreach (var item in Request.Headers)
            //               {
            //                   html.AppendFormat("<li><b>{0}</b> = {1}</li>\r\n", item.Key, ExpandValue(item.Value));
            //               }
            //               html.AppendLine("</ul>");
            //               html.AppendLine("</body>");
            //               html.AppendLine("</html>");
            //               ContentResult contentResult = new ContentResult();
            //               contentResult.Content = html.ToString();
            //               contentResult.ContentType = "text/html";
            //               return contentResult;
            //           }
            //           return LocalRedirect(path);
            //       }
            //       else
            //       {
            string basePath = string.IsNullOrEmpty(_configuration["BASE_PATH"]) ? "/" : _configuration["BASE_PATH"];
            // we want to redirect to the dashboard if the user is a returning user.

            // get UserSettings from the session
            string temp = _httpContextAccessor.HttpContext.Session.GetString("UserSettings");
            string dashboard = "authenticated/dashboard";
            return Redirect(basePath + "/" + dashboard);
            //       }
        }

        //   private bool isBusinessProfileSubmitted(UserSettings userSettings)
        //   {
        //       var isSubmitted = false;
        //       // query the Dynamics system to get the account record.
        //       if (userSettings.AccountId != null && userSettings.AccountId.Length > 0)
        //       {
        //           var accountId = GuidUtility.SanitizeGuidString(userSettings.AccountId);
        //           MicrosoftDynamicsCRMaccount account = _dynamicsClient.GetAccountByIdWithChildren(new Guid(accountId));
        //           _logger.LogDebug(LoggingEvents.HttpGet, "Dynamics Account: " + JsonConvert.SerializeObject(account));

        //           if (account == null)
        //           {
        //               isSubmitted = account.BcgovSubmitteddate != null;
        //           }
        //       }

        //       return isSubmitted;
        //   }

        //   /// <summary>
        //   /// Utility function used to expand headers.
        //   /// </summary>
        //   /// <param name="values"></param>
        //   /// <returns></returns>
        //   private static string ExpandValue(IEnumerable<string> values)
        //   {
        //       StringBuilder value = new StringBuilder();

        //       foreach (string item in values)
        //       {
        //           if (value.Length > 0)
        //           {
        //               value.Append(", ");
        //           }
        //           value.Append(item);
        //       }
        //       return value.ToString();
        //   }

        // /// <summary>
        // /// Injects an authentication token cookie into the response for use with the 
        // /// SiteMinder authentication middleware
        // /// </summary>
        [HttpGet]
        [Route("token/{userid}")]
        [AllowAnonymous]
        public virtual IActionResult GetDevAuthenticationCookie(string userId)
        {

            // if (_env.IsProduction()) return BadRequest("This API is not available outside a development environment.");

            if (string.IsNullOrEmpty(userId)) return BadRequest("Missing required userid query parameter.");

            if (userId.ToLower() == "default")
                userId = _options.DevDefaultUserId;

            // clear session
            HttpContext.Session.Clear();

            // expire "dev" user cookie
            string temp = HttpContext.Request.Cookies[_options.DevBCSCAuthenticationTokenKey];
            if (temp == null)
            {
                temp = "";
            }
            Response.Cookies.Append(
                _options.DevBCSCAuthenticationTokenKey,
                temp,
                new CookieOptions
                {
                    Path = "/",
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddDays(-1)
                }
            );
            // create new "dev" user cookie
            Response.Cookies.Append(
                _options.DevAuthenticationTokenKey,
                userId,
                new CookieOptions
                {
                    Path = "/",
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddDays(7)
                }
            );

            string basePath = string.IsNullOrEmpty(_configuration["BASE_PATH"]) ? "" : _configuration["BASE_PATH"];
            // always send the user to the business profile.
            string businessprofile = "business-profile";
            basePath += "/" + businessprofile;

            return Redirect(basePath);
        }

    }
}
