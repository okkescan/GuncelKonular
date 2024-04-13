using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LorenzApi : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public LorenzApi(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
            _httpClient.BaseAddress = new Uri("http://localhost:5000"); // Flask API'nin adresi
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] LorenzParameters parameters)
        {
            try
            {
                // Gönderilecek parametreler
                var json = JsonConvert.SerializeObject(parameters);

                // API'ye POST isteği yapma
                var response = await _httpClient.PostAsync("/lorenz", new StringContent(json, System.Text.Encoding.UTF8, "application/json"));

                // Yanıtı okuma
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();

                // Yanıtı geri döndürme
                return Ok(responseBody);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

    public class LorenzParameters
    {
        public double X0 { get; set; }
        public double Y0 { get; set; }
        public double Z0 { get; set; }
    }
}
