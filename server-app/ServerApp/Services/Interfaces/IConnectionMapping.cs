using System.Collections.Generic;
using ServerApp.Models.DTOs;
namespace ServerApp.Services
{
    public interface IConnectionMapping
    {
        int Count { get; }

        void Add(string connectionId, ConnectionUser connUser);
        ConnectionUser GetUser(string connection);
        void RemoveUser(string connectionId);
    }
}