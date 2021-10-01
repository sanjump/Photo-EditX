using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EditorWebApi.BAL;



namespace EditorWebApi.Controllers
{
  [Route("api/[controller]/[Action]")]
  [ApiController]
  public class EditorController : ControllerBase
  {

    Editor_BAL bl = new Editor_BAL();
   
    [HttpGet("{name}")]
    [ActionName("getJson")]

    public string getJson(string name)
    {

     string json = bl.getJson(name);
     return json;

    }


  }
}
