using System;
using ElectronCgi.DotNet;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace EditorService
{
  class Program
  {
    static void Main(string[] args)
    {
      var connection = new ConnectionBuilder()
                   .WithLogging()
                   .Build();


      connection.On("getJson", (string name) =>
      {

        List<JArray> jsons = new List<JArray>();
        List<JObject> file = new List<JObject>();
        string path = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + "\\editor";
        string[] filePaths = Directory.GetFiles(path);

        foreach (string paths in filePaths)
        {
          JArray obj1 = JArray.Parse(File.ReadAllText(paths));
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

        return file;

        
      });


      connection.Listen();
    }
  }
}





