using System;
namespace ServerApp.Models.DTOs
{
    public class ChatMessage
    {
        public string Author { get; set; }
        public string Message { get; set; }
        public DateTime TimeStamp { get; }
        public string Id { get; }

        public ChatMessage(string author, string message)
        {
            Author = author;
            Message = message;
            TimeStamp = DateTime.Now;
            Id = Guid.NewGuid().ToString();
        }
    }
}
