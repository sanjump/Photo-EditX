using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Image;

namespace EditorWebApi.BAL
{
  public class Editor_BAL
  {
    ImageInterface img = new ImageJsons();
    public string getJson(string name)
    {
      string json = img.getJson(name);
      return json;
    }
  }
}
