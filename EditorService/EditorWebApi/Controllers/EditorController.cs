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
   
    [HttpGet()]
    [ActionName("filterFile")]

    public string filterFile(string name)
    {

     string json = bl.filterFile(name);
     return json;
     
    }

    [HttpGet()]
    [ActionName("exportFile")]
    public string exportFile(string name=null,string date=null)
    {

      string json = bl.exportFile(name,date);
      return json;

    }


  }
}
