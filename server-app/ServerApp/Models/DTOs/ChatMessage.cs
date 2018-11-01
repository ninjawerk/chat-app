using System;
using ServerApp.Models.Enums; 

namespace ServerApp.Models.DTOs
{
    public class ChatMessage
    {
        public string Author { get; set; }
        public string Message { get; set; }
        public DateTime TimeStamp { get; }
        public string Id { get; }
        public CommandType Type { get; }
        public string Command { get; }

        public ChatMessage(string author, string message, CommandType commandType = CommandType.Success, string command = "")
        {
            Author = author;
            Message = message;
            TimeStamp = DateTime.Now;
            Id = Guid.NewGuid().ToString();
            Type = commandType;
            Command = command;
        }
    }
}
