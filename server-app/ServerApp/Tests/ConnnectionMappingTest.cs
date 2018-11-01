using System;
using ServerApp.Services;
using NUnit.Framework;

namespace ServerApp.Tests
{
    /// <summary>
    /// Connnection mapping.
    /// Should ideally be inside a test project. I have used it within the project to give just to demo this.
    /// </summary>
    [TestFixture]
    public class ConnectionMappingTest
    {
        private readonly ConnectionMapping _connnectionMapping;

        public ConnectionMappingTest()
        {
            _connnectionMapping = new ConnectionMapping();
        }

        [Test]
        public void ConnectionAdd(){
            _connnectionMapping.Add("x", new Models.DTOs.ConnectionUser("Beast"));
            Assert.That(_connnectionMapping.Count, Is.EqualTo(1));
        }

        [Test]
        public void GetUsername()
        {
            _connnectionMapping.Add("x", new Models.DTOs.ConnectionUser("Beast"));
            var user = _connnectionMapping.GetUser("x");
            Assert.That(user.Username, Is.EqualTo("Beast"));
        }

        [Test]
        public void RemoveUser()
        {
            _connnectionMapping.Add("x", new Models.DTOs.ConnectionUser("Beast"));
            Assert.That(_connnectionMapping.Count, Is.EqualTo(1));
            _connnectionMapping.RemoveUser("x");
            Assert.That(_connnectionMapping.Count, Is.EqualTo(0));
        }
    }
}
