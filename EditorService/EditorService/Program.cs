using System;
using ElectronCgi.DotNet;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Net;
using Image;

namespace EditorService
{
  class Program
  {
    static void Main(string[] args)
    {

     
      IImageInterface img = new ImageJsons();
  
      var connection = new ConnectionBuilder()
                   .WithLogging()
                   .Build();



      connection.On("filterFile", (string name) =>
      {
        var result = img.filterFile(name);
        dynamic json = JsonConvert.DeserializeObject(result);
        return json;
 
      });


      connection.Listen();
    }
  }
}





