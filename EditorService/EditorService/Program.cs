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

     
      ImageInterface img = new ImageJsons();
  
      var connection = new ConnectionBuilder()
                   .WithLogging()
                   .Build();



      connection.On("getJson", (string name) =>
      {
        var result = img.getJson(name);
        dynamic json = JsonConvert.DeserializeObject(result);
        return json;
 
      });


      connection.Listen();
    }
  }
}





