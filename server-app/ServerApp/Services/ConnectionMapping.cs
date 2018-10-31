using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServerApp.Models.DTOs;

namespace ServerApp.Services
{
    /// <summary>
    /// Connection mapping class will hold some meta data per connection.
    /// </summary>
    public class ConnectionMapping : IConnectionMapping 
    {
        private readonly Dictionary<string, ConnectionUser> _connections =
            new Dictionary<string, ConnectionUser>();

        public int Count
        {
            get
            {
                return _connections.Count;
            }
        }

        public void Add(string connectionId, ConnectionUser connUser)
        {
            lock (_connections)
            {
                ConnectionUser user;

                if (!_connections.TryGetValue(connectionId, out user))
                {
                    _connections.Add(connectionId, connUser);
                }
                else
                {
                    //overwrite the username for that connection
                    _connections[connectionId] = user;
                }
            }
        }

        public ConnectionUser GetUser(string connection)
        {
            ConnectionUser user;
            if (_connections.TryGetValue(connection, out user))
            {
                return user;
            }

            return null;
        }

        public void RemoveUser(string connectionId)
        {
            lock (_connections)
            {
                if (!_connections.Any(c=>c.Key == connectionId))
                {
                    return;
                }
 
                _connections.Remove(connectionId);
            }
        }
    }
}
