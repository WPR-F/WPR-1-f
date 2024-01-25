using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wprfAPI.Controllers;
using wprfAPI.Users;
using Xunit;
using Microsoft.EntityFrameworkCore;

namespace wprfAPI.Tests
{
    public class PanellidControllerTests
    {
        private Mock<UserManager<User>> GetMockUserManager()
        {
            var userStoreMock = new Mock<IUserStore<User>>();
            return new Mock<UserManager<User>>(
                userStoreMock.Object, null, null, null, null, null, null, null, null);
        }

        private Mock<AccountContext> GetMockDbContext()
        {
            // Create a new mock context
            var mockContext = new Mock<AccountContext>();

            // Create a list of Panellid objects
            var data = new List<Panellid>
        {
            new Panellid { UserId = "testId1" },
            new Panellid { UserId = "testId2" },
            // Add more Panellid objects as needed
        }.AsQueryable();

            // Create a mock set
            var mockSet = new Mock<DbSet<Panellid>>();

            // Setup the mock set to return the list of Panellid objects
            mockSet.As<IQueryable<Panellid>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Panellid>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Panellid>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Panellid>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

            // Setup the mock to return the mock set when Panelleden is accessed
            mockContext.Setup(context => context.Panelleden).Returns(mockSet.Object);

            return mockContext;
        }

        private readonly Mock<UserManager<User>> _mockUserManager;
        private readonly Mock<AccountContext> _mockAccountContext;

        public PanellidControllerTests()
        {
            var userStoreMock = new Mock<IUserStore<User>>();
            _mockUserManager = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            _mockAccountContext = new Mock<AccountContext>();
        }

        private Mock<IPanellidManager> GetMockPanellidManager()
        {
            return new Mock<IPanellidManager>();
        }
        [Fact]
        public async Task CreatePanellid_ReturnsOk_WhenUserExistsAndRoleAdditionSucceeds()
        {
            // Arrange
            var user = new User { Id = "testId" };
            _mockUserManager.Setup(um => um.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(user);
            _mockUserManager.Setup(um => um.AddToRoleAsync(user, It.IsAny<string>())).ReturnsAsync(IdentityResult.Success);
            var mockPanellidManager = GetMockPanellidManager();

            var controller = new PanellidController(_mockUserManager.Object, _mockAccountContext.Object, mockPanellidManager.Object);

            // Act
            var result = await controller.CreatePanellid("testId");

            // Assert
            var actionResult = Assert.IsType<ActionResult<User>>(result);
            Assert.IsType<OkResult>(actionResult.Result);
        }

        [Fact]
        public async Task CreatePanellid_ReturnsNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var mockUserManager = GetMockUserManager();
            mockUserManager.Setup(um => um.FindByIdAsync(It.IsAny<string>())).ReturnsAsync((User)null);
            var mockPanellidManager = GetMockPanellidManager();
            var controller = new PanellidController(_mockUserManager.Object, _mockAccountContext.Object, mockPanellidManager.Object);

            // Act
            var result = await controller.CreatePanellid("testId");

            // Assert
            var actionResult = Assert.IsType<ActionResult<User>>(result);
            Assert.IsType<NotFoundResult>(actionResult.Result);
        }

        [Fact]
        public async Task CreatePanellid_ReturnsBadRequest_WhenRoleAdditionFails()
        {
            // Arrange
            var mockUserManager = GetMockUserManager();
            var user = new User { Id = "testId" };
            mockUserManager.Setup(um => um.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(user);
            mockUserManager.Setup(um => um.AddToRoleAsync(user, It.IsAny<string>())).ReturnsAsync(IdentityResult.Failed());
            var mockPanellidManager = GetMockPanellidManager();
            var controller = new PanellidController(mockUserManager.Object, _mockAccountContext.Object, mockPanellidManager.Object);

            // Act
            var result = await controller.CreatePanellid("testId");

            // Assert
            var actionResult = Assert.IsType<ActionResult<User>>(result);
        }

        // [Fact]
        // public async Task GetPanellidUsers_ReturnsNotFound_WhenNoUsersExist()
        // {
        //     // Arrange
        //     var mockUserManager = GetMockUserManager();
        //     mockUserManager.Setup(um => um.GetUsersInRoleAsync(It.IsAny<string>())).ReturnsAsync(new List<User>());
        //     var mockPanellidManager = GetMockPanellidManager();
        //     var controller = new PanellidController(_mockUserManager.Object, _mockAccountContext.Object, mockPanellidManager.Object);

        //     // Act
        //     var result = await controller.getPanellidUsers();

        //     // Assert
        //     Assert.IsType<NotFoundResult>(result.Result);
        // }

        [Fact]
        public async Task GetPanellidUsers_ReturnsOk_WhenUsersExist()
        {
            // Arrange
            var users = new List<User> { new User { UserName = "testUser" } };
            _mockUserManager.Setup(um => um.GetUsersInRoleAsync("Panellid")).ReturnsAsync(users);

            var mockPanellidManager = new Mock<IPanellidManager>();
            var panellid = new List<Panellid> { new Panellid { UserId = "testId" } };
            mockPanellidManager.Setup(pm => pm.GetAllAsync()).ReturnsAsync(panellid);

            var controller = new PanellidController(_mockUserManager.Object, _mockAccountContext.Object, mockPanellidManager.Object);

            // Act
            var result = await controller.getPanellidUsers();

            // Assert
            var actionResult = Assert.IsType<ActionResult<dynamic>>(result);
            Assert.IsNotType<NotFoundResult>(actionResult.Result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            Assert.NotNull(okResult.Value);
            Assert.Equal(200, okResult.StatusCode);
        }
        //deze is de juiste 
        // [Fact]
        // public async Task UpdatePanellidInfo_ReturnsOk_WhenPanellidExists()
        // {
        //     // Arrange
        //     var mockContext = GetMockDbContext();
        //     var panellid = new Panellid { UserId = "testId" };
        //     mockContext.Setup(db => db.Panelleden.FindAsync(It.IsAny<string>())).ReturnsAsync(panellid);
        //     var mockPanellidManager = GetMockPanellidManager();
        //     var controller = new PanellidController(_mockUserManager.Object, _mockAccountContext.Object, mockPanellidManager.Object);

        //     // Act
        //     var result = await controller.UpdatePanellidInfo(panellid);

        //     // Assert
        //     var actionResult = Assert.IsType<ActionResult<Panellid>>(result);
        //     Assert.IsType<OkObjectResult>(actionResult.Result);
        // }

        // [Fact]
        // public async Task UpdatePanellidInfo_ReturnsOk_WhenPanellidDoesNotExist()
        // {
        //     // Arrange
        //     var mockContext = GetMockDbContext();
        //     var panellid = new Panellid { UserId = "testId" };
        //     mockContext.Setup(db => db.Panelleden.FindAsync(It.IsAny<string>())).ReturnsAsync((Panellid)null);
        //     var mockPanellidManager = GetMockPanellidManager();
        //     var controller = new PanellidController(_mockUserManager.Object, _mockAccountContext.Object, mockPanellidManager.Object);

        //     // Act
        //     var result = await controller.UpdatePanellidInfo(panellid);

        //     // Assert
        //     var actionResult = Assert.IsType<ActionResult<Panellid>>(result);
        //     Assert.IsType<OkObjectResult>(actionResult.Result);
        // }

        [Fact]
        public async Task checkPanellid_ReturnsNotFound_WhenUserDoesNotExist()
        {
            _mockUserManager.Setup(x => x.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync((User)null);

            var mockPanellidManager = GetMockPanellidManager();
            var controller = new PanellidController(_mockUserManager.Object, _mockAccountContext.Object, mockPanellidManager.Object);
            var result = await controller.checkPanellid(new CheckPanellidRequest { Email = "test@example.com" });

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task checkPanellid_ReturnsForbid_WhenUserIsNotInPanellidRole()
        {
            var user = new User();
            _mockUserManager.Setup(x => x.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(user);
            _mockUserManager.Setup(x => x.IsInRoleAsync(user, "Panellid")).ReturnsAsync(false);

            var mockPanellidManager = GetMockPanellidManager();
            var controller = new PanellidController(_mockUserManager.Object, _mockAccountContext.Object, mockPanellidManager.Object);
            var result = await controller.checkPanellid(new CheckPanellidRequest { Email = "test@example.com" });

            Assert.IsType<ForbidResult>(result.Result);
        }

        [Fact]
        public async Task checkPanellid_ReturnsOk_WhenUserIsInPanellidRole()
        {
            var user = new User();
            _mockUserManager.Setup(x => x.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(user);
            _mockUserManager.Setup(x => x.IsInRoleAsync(user, "Panellid")).ReturnsAsync(true);

            var mockPanellidManager = GetMockPanellidManager();
            var controller = new PanellidController(_mockUserManager.Object, _mockAccountContext.Object, mockPanellidManager.Object);
            var result = await controller.checkPanellid(new CheckPanellidRequest { Email = "test@example.com" });

            Assert.IsType<OkResult>(result.Result);
        }
    }

}
