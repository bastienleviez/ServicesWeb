using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json;
using System.IO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LocalApiTp.Controllers
{
    [EnableCors("TestPolicy2")]
    [ApiController]
    [Route("[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly ILogger<SearchController> _logger;

        public SearchController(ILogger<SearchController> logger)
        {
            _logger = logger;
        }

        [EnableCors("TestPolicy2")]
        [HttpGet]
        public async Task<object> Get(string query)
        {
            var obj = await SearchFilmsAsync(query);
            return obj;
        }

        static async Task<string> SearchFilmsAsync(string query)
        {
            // notre cible
            string page = "https://api.themoviedb.org/3/search/movie?api_key=3a0452e1611343784388b72a914085af&query=";
            page = page + query;

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
