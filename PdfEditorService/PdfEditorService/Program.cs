using System;
using ElectronCgi.DotNet;

namespace PdfEditorService
{
    class Program
    {
        static void Main(string[] args)
        {
            var connection = new ConnectionBuilder()
                        .WithLogging()
                        .Build();


            connection.On("greeting", (string name) =>
            {
                return $"Hello {name}!";
            });



            connection.Listen();
        }
    }
}
