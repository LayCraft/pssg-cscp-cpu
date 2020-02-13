using Gov.Cscp.Victims.Public.Services;
using Gov.Cscp.Victims.Public.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.HealthChecks;

namespace Gov.Cscp.Victims.Public
{
	public class Startup
	{
		private readonly ILoggerFactory loggerFactory;
		private readonly IConfiguration configuration;
		private readonly IHostingEnvironment environment;
		public Startup(IConfiguration configuration, IHostingEnvironment environment, ILoggerFactory loggerFactory)
		{
			this.loggerFactory = loggerFactory;
			this.configuration = configuration;
			this.environment = environment;
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			// add singleton to allow Controllers to query the Request object
			services
			.AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
			.AddSingleton<IDynamicsResultService, DynamicsResultService>()
			.AddSingleton(configuration)
			.AddCors(opts =>
				{
					opts.AddDefaultPolicy(builder =>
					{
						builder.WithOrigins(
							"http://pathfinder.bcgov",
							"https://*.pathfinder.gov.bc.ca",
							"https://dev.justice.gov.bc.ca",
							"https://test.justice.gov.bc.ca",
							"https://justice.gov.bc.ca")
							.SetIsOriginAllowedToAllowWildcardSubdomains();
					});
				})
			// Add a memory cache
			.AddMemoryCache()

			// for security reasons, the following headers are set.
			.AddMvc(opts =>
			{
				// authorize on all controllers by default
			})
			.SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
			.AddJsonOptions(
					opts =>
					{
						opts.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
						opts.SerializerSettings.DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat;
						opts.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc;
						opts.SerializerSettings.DateParseHandling = Newtonsoft.Json.DateParseHandling.DateTimeOffset;
						opts.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
					});

			services
			.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = SiteMinderAuthOptions.AuthenticationSchemeName;
				options.DefaultChallengeScheme = SiteMinderAuthOptions.AuthenticationSchemeName;
			})
			.AddSiteminderAuth();
			services.Configure<CookiePolicyOptions>(options =>
			{
				options.Secure = environment.IsDevelopment()
					? CookieSecurePolicy.SameAsRequest
					: CookieSecurePolicy.Always;
				options.MinimumSameSitePolicy = Microsoft.AspNetCore.Http.SameSiteMode.None;
			});
			// In production, the Angular files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/dist";
			});
		}


		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (!env.IsProduction())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
			}
			app
				// HSTS header
				.UseHsts(opts => opts.IncludeSubdomains().MaxAge(days: 365).AllResponses())
				// X-Content-Type-Options header
				.UseXContentTypeOptions()
				// Referrer-Policy header.
				.UseReferrerPolicy(opts => opts.NoReferrer())
				// X-Xss-Protection header
				.UseXXssProtection(opts => opts.EnabledWithBlockMode())
				// X-Frame-Options header
				.UseXfo(opts => opts.Deny())
				// CORS policy
				.UseCors()
				// X-xss-protection header
				.UseXXssProtection(opts => opts.EnabledWithBlockMode())
				// X-Robots-Tag header
				.UseXRobotsTag(opts => opts.NoIndex().NoFollow())
				.UseXDownloadOptions()
				// no cache headers
				.UseNoCacheHttpHeaders()
				.UseStaticFiles()
				.UseSpaStaticFiles();
			app
				.UseAuthentication()
				.UseCookiePolicy()
				.UseMvc(routes =>
				{
					routes.MapRoute(
						name: "default",
						template: "{controller}/{action=Index}/{id?}");
				})
				.UseSpa(spa =>
				{
					// To learn more about options for serving an Angular SPA from ASP.NET Core, see https://go.microsoft.com/fwlink/?linkid=864501
					spa.Options.SourcePath = "ClientApp";
					// Only run the angular CLI Server in Development mode (not staging or test.)
					if (env.IsDevelopment())
					{
						//spa.UseAngularCliServer(npmScript: "start");
						spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
					}
				});
		}
	}
}
