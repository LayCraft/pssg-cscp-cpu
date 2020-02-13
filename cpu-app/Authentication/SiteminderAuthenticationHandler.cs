using Gov.Cscp.Victims.Public.DataInterfaces;
using Gov.Cscp.Victims.Public.Authentication;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace Gov.Cscp.Victims.Public.Authentication
{
	public class SiteMinderAuthOptions : AuthenticationSchemeOptions
	{
		public const string AuthenticationSchemeName = "site-minder-auth";
		public string Scheme => AuthenticationSchemeName;
	}

	public static class SiteminderAuthenticationExtensions
	{
		public static AuthenticationBuilder AddSiteminderAuth(this AuthenticationBuilder builder, Action<SiteMinderAuthOptions> configureOptions)
		{
			return builder.AddScheme<SiteMinderAuthOptions, SiteminderAuthenticationHandler>(SiteMinderAuthOptions.AuthenticationSchemeName, configureOptions);
		}

		public static AuthenticationBuilder AddSiteminderAuth(this AuthenticationBuilder builder)
		{
			return AddSiteminderAuth(builder, opts => { });
		}
	}

	public class SiteminderAuthenticationHandler : AuthenticationHandler<SiteMinderAuthOptions>
	{
		private readonly ILogger logger;
		// private readonly IDataInterface dataInterface;
		private readonly IHostingEnvironment environment;

		public SiteminderAuthenticationHandler(IOptionsMonitor<SiteMinderAuthOptions> configureOptions,
				ILoggerFactory loggerFactory,
				UrlEncoder encoder,
				ISystemClock clock,
				// IDataInterface dataInterface,
				IHostingEnvironment environment)
				 : base(configureOptions, loggerFactory, encoder, clock)
		{
			this.environment = environment;
			// this.dataInterface = dataInterface;
			logger = loggerFactory.CreateLogger(typeof(SiteminderAuthenticationHandler));
		}

		protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
		{
			var smAuthToken = SiteMinderAuthenticationToken.CreateFromFwdHeaders(Request);
			if (!environment.IsProduction() && smAuthToken.IsAnonymous())
			{
				smAuthToken = SiteMinderAuthenticationToken.CreateForDev(Request);
				Response.Cookies.Delete(SiteMinderAuthenticationToken.SM_TOKEN_NAME);
			}

			logger.LogDebug($"smAuthToken: {smAuthToken.ToString()}");
			var claims = Context.Session.GetString("app.principal");
			if (!string.IsNullOrEmpty(claims))
			{
				var principal = claims.FromJwt();
				logger.LogDebug($"Success (session): {principal.Identity.Name}");
				return AuthenticateResult.Success(new AuthenticationTicket(principal, Options.Scheme));
			}
			if (smAuthToken.IsAnonymous())
			{
				logger.LogDebug($"NoResult");
				return AuthenticateResult.NoResult();
			}

			try
			{
				var principal = await CreatePrincipalFor(smAuthToken);
				Context.Session.SetString("app.principal", principal.ToJwt());
				logger.LogDebug($"Success (new): {principal.Identity.Name}");
				return AuthenticateResult.Success(new AuthenticationTicket(principal, Options.Scheme));
			}
			catch (ApplicationException e)
			{
				logger.LogError($"Fail to authenticate user with token '{smAuthToken.ToString()}': {e.Message}");
				return AuthenticateResult.Fail(e.Message);
			}
		}

		private async Task<ClaimsPrincipal> CreatePrincipalFor(SiteMinderAuthenticationToken smAuthToken)
		{
			var claims = new List<Claim>();
			claims.Add(new Claim(ClaimTypes.Role, "role_everyone"));
			if (smAuthToken.IsInternal())
			{
				claims.Add(new Claim(ClaimTypes.Sid, smAuthToken.smgov_userguid));
				claims.Add(new Claim(ClaimTypes.Upn, smAuthToken.sm_universalid));
				claims.Add(new Claim(SiteMinderClaimTypes.USER_TYPE, smAuthToken.smgov_usertype));
				claims.Add(new Claim(SiteMinderClaimTypes.NAME, smAuthToken.smgov_userdisplayname));
				claims.Add(new Claim(EssClaimTypes.USER_ID, smAuthToken.smgov_userguid));
			}


			return new ClaimsPrincipal(new ClaimsIdentity(claims, Options.Scheme));
		}
	}

	public static class JwtEx
	{
		public static string ToJwt(this ClaimsPrincipal principal)
		{
			var handler = new JwtSecurityTokenHandler();
			handler.OutboundClaimTypeMap.Clear();
			var token = handler.CreateEncodedJwt(new SecurityTokenDescriptor
			{
				Subject = (ClaimsIdentity)principal.Identity,
				Audience = "self",
				Issuer = "self",
			});

			return token;
		}

		public static ClaimsPrincipal FromJwt(this string jwt)
		{
			var handler = new JwtSecurityTokenHandler();
			handler.InboundClaimTypeMap.Clear();
			var claims = handler.ReadJwtToken(jwt).Claims;
			return new ClaimsPrincipal(new ClaimsIdentity(claims, SiteMinderAuthOptions.AuthenticationSchemeName));
		}
	}
}
