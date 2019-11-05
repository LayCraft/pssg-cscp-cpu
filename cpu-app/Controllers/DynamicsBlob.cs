using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
namespace Gov.Cscp.VictimServices.Public.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class DynamicsBlobController : Controller
	{
		private readonly IHttpContextAccessor httpContextAccessor;

		public DynamicsBlobController(IHttpContextAccessor httpContextAccessor)
		{
			this.httpContextAccessor = httpContextAccessor;
		}
		// [HttpGet("{bceid")]
		// public async Task<IActionResult> GetBlob(string bceid)
		// {
		// 	var result = await
		// }
	}
}