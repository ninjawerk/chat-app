using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using ServerApp.Services;
using ServerApp.Models.DTOs;
using ServerApp.Models.Enums;

namespace ServerApp.Hubs
{

    /// <summary>
    /// Chat hub.
    /// A basic hub, this will have all the signalR methods. Everything is pretty self explanatory.
    /// </summary>
    public class ChatHub : Hub
    {
        const string COMMAND_REG = "REG";
        const string COMMAND_CHAT = "CHAT";
        private IConnectionMapping _connectionMapping;

        /// <summary>
        /// Initializes a new instance of the class.
        /// </summary>
        /// <param name="connectionMapping">Connection mapping.</param>
        public ChatHub(IConnectionMapping connectionMapping)
        {
            _connectionMapping = connectionMapping;
        }

        /// <summary>
        /// Registers the name of the user.
        /// </summary>
        /// <returns>The user name.</returns>
        /// <param name="userName">User name.</param>
        public Task RegisterUserName(string userName)
        {
            _connectionMapping.Add(Context.ConnectionId, new ConnectionUser(userName));
            return Clients.Client(Context.ConnectionId).SendAsync("CommandSend", new ChatMessage("Bot","Successfully Registered! :)"));
        }

        /// <summary>
        /// Sends the message to group.
        /// </summary>
        /// <returns>The message to group.</returns>
        /// <param name="groupName">Group name.</param>
        /// <param name="message">Message.</param>
        public Task SendMessageToGroup(string groupName, string message)
        {
            var user = _connectionMapping.GetUser(Context.ConnectionId);
            if (user != null)
            {
                var chatMessage = new ChatMessage(user.Username, message, CommandType.Success, COMMAND_CHAT);
                return Clients.Group(groupName).SendAsync("Send", chatMessage);
            }
            else 
            {
                return Clients.Client(Context.ConnectionId).SendAsync("CommandSend", new ChatMessage("Bot","Failed to send message :(", CommandType.Error, COMMAND_CHAT)); 
            }
        }

        /// <summary>
        /// Adds to group.
        /// </summary>
        /// <returns>The to group.</returns>
        /// <param name="username">Username.</param>
        /// <param name="groupName">Group name.</param>
        public async Task AddToGroup(string username, string groupName)
        {
            await this.RegisterUserName(username);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var user = _connectionMapping.GetUser(Context.ConnectionId);
            if (user != null)
            {
                await Clients.Group(groupName).SendAsync("CommandSend", new ChatMessage("Bot",$"{user.Username} has joined the group {groupName}.",CommandType.Success, COMMAND_REG));
            }
            else
            {
                await Clients.Client(Context.ConnectionId).SendAsync("CommandSend", new ChatMessage("Bot","You cannot do that! Add a username first.", CommandType.Error, COMMAND_REG));
            }

        }

        /// <summary>
        /// Removes from group.
        /// </summary>
        /// <returns>The from group.</returns>
        /// <param name="groupName">Group name.</param>
        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            var user = _connectionMapping.GetUser(Context.ConnectionId);
            if (user != null)
            {
                await Clients.Group(groupName).SendAsync("Send", new ChatMessage("Bot", $"{user.Username} has left the group {groupName}.", CommandType.Info));
            }
            else
            {
                await Clients.Client(Context.ConnectionId).SendAsync("CommandSend", new ChatMessage("Bot", "You cannot do that! Add a username first.", CommandType.Error));
            }
        }

        
    }
}
