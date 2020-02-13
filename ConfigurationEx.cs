using Microsoft.Extensions.Configuration;
namespace Gov.Cscp.Victims.Public
{
	public static class ConfigurationEx
	{
		public static string GetBaseUri(this IConfiguration conf)
		{
			return conf["BASE_URI"];
		}

		public static string GetBasePath(this IConfiguration conf)
		{
			return conf.GetValue("BASE_PATH", "");
		}

		public static string GetEnvironmentTitle(this IConfiguration conf)
		{
			return conf["APP_ENVIRONMENT_TITLE"];
		}
		public static string GetSiteMinderLogoutUrl(this IConfiguration conf)
		{
			return conf.GetValue("SITEMINDER_LOGOUT_URL", "/");
		}
		public static bool CspEnabled(this IConfiguration conf)
		{
			return conf.GetValue("CSP_ENABLED", "true").ToLowerInvariant() == "true";
		}
	}
}