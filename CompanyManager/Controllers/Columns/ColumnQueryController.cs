using Microsoft.AspNetCore.Mvc;

namespace CompanyManager.Controllers.Columns
{
    public class ColumnQueryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
