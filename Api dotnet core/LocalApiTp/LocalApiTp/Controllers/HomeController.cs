using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json;
using System.IO;

namespace LocalApiTp.Controllers
{
    [EnableCors("TestPolicy")]
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<object> Get()
        {
            var obj = await GetFilmsAsync();
            return obj;
        }

        static async Task<string> GetFilmsAsync()
        {
            // notre cible
            string page = "https://api.themoviedb.org/3/discover/movie?api_key=3a0452e1611343784388b72a914085af&language=fr-FR";

            using (HttpClient client = new HttpClient())
            {
                // la requête
                using (HttpResponseMessage response = await client.GetAsync(page))
                {
                    var content = await response.Content.ReadAsStringAsync();
                    return content;
                }
            }
        }
    }
}

