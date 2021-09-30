using System;
using ElectronCgi.DotNet;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Net;

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


        using (var client = new WebClient())
        {

          try
          {
            var result = client.DownloadString("http://localhost:47525/api/Editor/" + name);
            dynamic json = JsonConvert.DeserializeObject(result);
            return json;
          }
          catch (WebException)
          {
            return "API not running";
          }
        }

                
      });


      connection.Listen();
    }
  }
}





