using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.IO;
using Newtonsoft.Json;

namespace Image
{
  public interface ImageInterface
  {
    string getJson(string name);

  }
  public class ImageJsons : ImageInterface
  {
        public string getJson(string name)

        {
    
                List<JArray> jsons = new List<JArray>();
                List<JObject> file = new List<JObject>();
                string path = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + "\\editor";
                string[] filePaths = Directory.GetFiles(path);

                foreach (string paths in filePaths)
                {
                  JArray obj1 = JArray.Parse(System.IO.File.ReadAllText(paths));
                  jsons.Add(obj1);
                }
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

    }
}
