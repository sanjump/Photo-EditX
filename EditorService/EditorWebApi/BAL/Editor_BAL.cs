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
    IImageInterface img = new ImageJsons();
    public string filterFile(string name)
    {
      string json = img.filterFile(name);
      return json;
    }

    public string exportFile(string name,string date)
    {
      string json = img.exportFile(name,date);
      return json;
    }
  }
}
