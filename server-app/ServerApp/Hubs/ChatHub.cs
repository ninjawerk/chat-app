using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Internal;
using ServerApp.Services;
using ServerApp.Models.DTOs;

namespace ServerApp.Hubs
{
    public class ChatHub : Hub
    {
        private IConnectionMapping _connectionMapping;

        public ChatHub(IConnectionMapping connectionMapping)
        {
            _connectionMapping = connectionMapping;
        }

        public Task RegisterUserName(string userName)
        {
            _connectionMapping.Add(Context.ConnectionId, new ConnectionUser(userName));
            return Clients.Client(Context.ConnectionId).SendAsync("CommandSend", new ChatMessage("Bot","Successfully Registered! :)"));
        }

        public Task SendMessageToGroup(string groupName, string message)
        {
            var user = _connectionMapping.GetUser(Context.ConnectionId);
            if (user != null)
            {
                var chatMessage = new ChatMessage(user.Username, message);
                return Clients.Group(groupName).SendAsync("Send", chatMessage);
            }
            else 
            {
                return Clients.Client(Context.ConnectionId).SendAsync("CommandSend", new ChatMessage("Bot","Failed to send message :(")); 
            }
        }

        public async Task AddToGroup(string username, string groupName)
        {
            await this.RegisterUserName(username);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var user = _connectionMapping.GetUser(Context.ConnectionId);
            if (user != null)
            {
                await Clients.Group(groupName).SendAsync("Send", new ChatMessage("Bot",$"{user.Username} has joined the group {groupName}."));
            }
            else
            {
                await Clients.Client(Context.ConnectionId).SendAsync("CommandSend", new ChatMessage("Bot","You cannot do that! Add a username first."));
            }

        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            var user = _connectionMapping.GetUser(Context.ConnectionId);
            if (user != null)
            {
                await Clients.Group(groupName).SendAsync("Send", new ChatMessage("Bot", $"{user.Username} has left the group {groupName}."));
            }
            else
            {
                await Clients.Client(Context.ConnectionId).SendAsync("CommandSend", new ChatMessage("Bot", "You cannot do that! Add a username first."));
            }
        }

        
    }
}
