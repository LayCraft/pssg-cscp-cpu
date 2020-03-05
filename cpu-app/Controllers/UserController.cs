using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace Gov.Cscp.Victims.Public.Controllers
{
    public class UserSettingsPayload
    {
        public string Message { get; set; }
        public string UserBCeID { get; set; }
        public string BusinessBCeID { get; set; }
    }

    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IConfiguration Configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public UserController(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            Configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        protected ClaimsPrincipal CurrentUser => _httpContextAccessor.HttpContext.User;

        [HttpGet("current")]
        //[RequiresPermission(Permission.Login, Permission.NewUserRegistration)]
        public virtual IActionResult UsersCurrentGet()
        {
            try
            {
                Authentication.SiteMinderAuthOptions siteMinderAuthOptions = new Authentication.SiteMinderAuthOptions();

                // determine if we are a new registrant.
                string temp = _httpContextAccessor.HttpContext.Session.GetString("UserSettings");
                if (!String.IsNullOrEmpty(temp))
                {
                    Authentication.UserSettings userSettings = JsonConvert.DeserializeObject<Authentication.UserSettings>(temp);


                    // UserSettingsPayload ret = new UserSettingsPayload {
                    //     Message = "Success",
                    //     UserBCeID = userSettings.UserId,
                    //     BusinessBCeID = userSettings.AccountId
                    // };
                    
                    // return Ok(ret);
                    return StatusCode(200, userSettings);
                }
                else
                {
                    UserSettingsPayload ret = new UserSettingsPayload {
                        Message = "No user settings found",
                        UserBCeID = "",
                        BusinessBCeID = ""
                    };
                    return StatusCode(200, ret);
                }
            }
            catch
            {
                UserSettingsPayload ret = new UserSettingsPayload {
                        Message = "Error getting user settings",
                        UserBCeID = "",
                        BusinessBCeID = ""
                    };
                return StatusCode(500, ret);
            }
        }
    }
}