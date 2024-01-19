using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using wprfAPI.Controllers;
using wprfAPI.Users;

namespace wprfTests.wprfAPITests
{
    public class AdminControllerTests
    {
        private Mock<UserManager<User>> GetMockUserManager()
        {
            var userStoreMock = new Mock<IUserStore<User>>();
            return new Mock<UserManager<User>>(
                userStoreMock.Object, null, null, null, null, null, null, null, null);
        }

        [Fact]
        public async Task CreateAdmin_ReturnsOk_WhenUserExistsAndRoleAdditionSucceeds()
        {
            // Arrange
            var mockUserManager = GetMockUserManager();
            var user = new User { Id = "testId" };
            mockUserManager.Setup(um => um.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(user);
            mockUserManager.Setup(um => um.AddToRoleAsync(user, It.IsAny<string>())).ReturnsAsync(IdentityResult.Success);
            var controller = new AdminController(mockUserManager.Object);

            // Act
            var result = await controller.CreateAdmin("testId");

            // Assert
            var actionResult = Assert.IsType<ActionResult<User>>(result);
            Assert.IsType<OkResult>(actionResult.Result);
        }

        [Fact]
        public async Task CreateAdmin_ReturnsNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var mockUserManager = GetMockUserManager();
            mockUserManager.Setup(um => um.FindByIdAsync(It.IsAny<string>())).ReturnsAsync((User)null);
            var controller = new AdminController(mockUserManager.Object);

            // Act
            var result = await controller.CreateAdmin("testId");

            // Assert
            var actionResult = Assert.IsType<ActionResult<User>>(result);
            Assert.IsType<NotFoundResult>(actionResult.Result);
        }

        [Fact]
        public async Task CreateAdmin_ReturnsBadRequest_WhenRoleAdditionFails()
        {
            // Arrange
            var mockUserManager = GetMockUserManager();
            var user = new User { Id = "testId" };
            mockUserManager.Setup(um => um.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(user);
            mockUserManager.Setup(um => um.AddToRoleAsync(user, It.IsAny<string>())).ReturnsAsync(IdentityResult.Failed());
            var controller = new AdminController(mockUserManager.Object);

            // Act
            var result = await controller.CreateAdmin("testId");

            // Assert
            var actionResult = Assert.IsType<ActionResult<User>>(result);
            Assert.IsType<BadRequestObjectResult>(actionResult.Result);
        }


        [Fact]
        public async Task CheckAdmin_ReturnsNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var mockUserManager = GetMockUserManager();
            mockUserManager.Setup(um => um.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync((User)null);
            var controller = new AdminController(mockUserManager.Object);

            var checkAdminRequest = new CheckAdminRequest { Email = "test@test.com" };

            // Act
            var result = await controller.CheckAdmin(checkAdminRequest);

            // Assert
            var actionResult = Assert.IsType<ActionResult<User>>(result);
            Assert.IsType<NotFoundResult>(actionResult.Result);
        }

        [Fact]
        public async Task CheckAdmin_ReturnsForbid_WhenUserIsNotAdmin()
        {
            // Arrange
            var mockUserManager = GetMockUserManager();
            var user = new User { Email = "test@test.com" };
            mockUserManager.Setup(um => um.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(user);
            mockUserManager.Setup(um => um.IsInRoleAsync(user, It.IsAny<string>())).ReturnsAsync(false);
            var controller = new AdminController(mockUserManager.Object);

            var checkAdminRequest = new CheckAdminRequest { Email = "test@test.com" };

            // Act
            var result = await controller.CheckAdmin(checkAdminRequest);

            // Assert
            var actionResult = Assert.IsType<ActionResult<User>>(result);
            Assert.IsType<ForbidResult>(actionResult.Result);
        }

        [Fact]
        public async Task CheckAdmin_ReturnsOk_WhenUserExistsAndIsAdmin()
        {
            // Arrange
            var mockUserManager = GetMockUserManager();
            var user = new User { Email = "test@test.com" };
            mockUserManager.Setup(um => um.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(user);
            mockUserManager.Setup(um => um.IsInRoleAsync(user, It.IsAny<string>())).ReturnsAsync(true);
            var controller = new AdminController(mockUserManager.Object);

            var checkAdminRequest = new CheckAdminRequest { Email = "test@test.com" };

            // Act
            var result = await controller.CheckAdmin(checkAdminRequest);

            // Assert
            var actionResult = Assert.IsType<ActionResult<User>>(result);
            Assert.IsType<OkResult>(actionResult.Result);
        }

        
    }
}