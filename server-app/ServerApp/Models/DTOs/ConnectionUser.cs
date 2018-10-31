using System;
namespace ServerApp.Models.DTOs
{
    // TODO: Can expand on this class later.

    /// <summary>
    /// Connection user.
    /// </summary>
    public class ConnectionUser
    {

        public string Username { get; set; }

        public ConnectionUser(string username)
        {
            Username = username;
        }
    }
}
