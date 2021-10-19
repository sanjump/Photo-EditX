using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.IO;
using Newtonsoft.Json;

namespace Image
{
  public interface IImageInterface
  {

    List<JArray> getJson();

    string filterFile(string name);

    string exportFile(string name, string date);

  }
  public class ImageJsons : IImageInterface
  {

    public List<JArray> getJson()
    {
      List<JArray> jsons = new List<JArray>();
      string path = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + "\\editor";
      string[] filePaths = Directory.GetFiles(path);

      foreach (string paths in filePaths)
      {
        JArray obj1 = JArray.Parse(System.IO.File.ReadAllText(paths));
        jsons.Add(obj1);
      }

      return jsons;

    }


    public string filterFile(string name)
    {

        List<JArray> jsons = getJson();
        List<JObject> file = new List<JObject>();
            
        foreach (JArray x in jsons)
        {

          foreach (JObject y in x)
          {
            if (y["file"].ToString().Contains(name) || y["date"].ToString().Contains(name))
            {
              file.Add(y);
            }
          }


        }
        string json = Newtonsoft.Json.JsonConvert.SerializeObject(file, Formatting.Indented);
        return json;

    }


    public string exportFile(string name, string date)
    {

      List<JArray> jsons = getJson();
      List<JObject> file = new List<JObject>();

      foreach (JArray x in jsons)
      {

        foreach (JObject y in x)

        {
          if (name != null && date != null)
          {
            if (y["file"].ToString().Contains(name) && y["date"].ToString().Contains(date))
            {
              file.Add(y);
            }
          }

          else if (name != null && date == null)
          {
            if (y["file"].ToString().Contains(name))
            {
              file.Add(y);
            }

          }
          else
          {
            if (y["date"].ToString().Contains(date))
            {
              file.Add(y);
            }

          }


        }


      }
      string json = Newtonsoft.Json.JsonConvert.SerializeObject(file, Formatting.Indented);
      return json;

    }


  }
}
