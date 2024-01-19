using Xunit;
using Moq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using wprfAPI.Users;
using wprfAPI.Controllers;
using System;
using Microsoft.EntityFrameworkCore;

namespace wprfTests.wprfAPITests
{
    public class AccountControllerTests
    {
        // create mock usermanager
        private Mock<UserManager<User>> GetMockUserManager()
        {
            var userStoreMock = new Mock<IUserStore<User>>();
            return new Mock<UserManager<User>>(
                userStoreMock.Object, null, null, null, null, null, null, null, null);
        }

        // negative test for register
        [Fact]
        public async Task PostAccount_ReturnsBadRequest_WhenUserDoesNotExist()
        {
            // Arrange
            var data = new List<User>().AsQueryable();

            var mockSet = new Mock<DbSet<User>>();
            mockSet.As<IQueryable<User>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<User>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<User>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<User>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

            var mockContext = new Mock<AccountContext>();
            mockContext.Setup(c => c.Users).Returns(mockSet.Object);

            var mockUserManager = GetMockUserManager();
            mockUserManager.Setup(um => um.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync((User)null);

            var controller = new AccountsController(mockContext.Object, mockUserManager.Object);

            // Act
            var result = await controller.GetEmail("test@test.com");

            // Assert
            Assert.IsType<BadRequestResult>(result.Result);
        }

        // positive test for register
        [Fact]
        public async Task PostAccount_ReturnsEmail_WhenUserExists()
        {
            // Arrange
            var mockUserManager = GetMockUserManager();
            var user = new User { Email = "test@test.com" };
            mockUserManager.Setup(um => um.CreateAsync(It.IsAny<User>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success);
            var controller = new AccountsController(null, mockUserManager.Object);

            var registerModel = new RegisterModel { User = user, Password = "TestPassword123!" };

            // Act
            var result = await controller.PostAccount(registerModel);

            // Assert
            var actionResult = Assert.IsType<ActionResult<User>>(result);
            var createdResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var returnedUser = Assert.IsType<User>(createdResult.Value);
            Assert.Equal("test@test.com", returnedUser.Email);
        }
        // negative tests for GetUser
        [Fact]
        public async Task GetUser_ReturnsNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(
                Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            mockUserManager.Setup(x => x.FindByIdAsync(It.IsAny<string>())).ReturnsAsync((User)null);
            var controller = new AccountsController(null, mockUserManager.Object);

            // Act
            var result = await controller.GetUser("nonexistentId");

            // Assert
            var notFoundResult = Assert.IsType<NotFoundResult>(result.Result);
        }
        // positive test for GetUser
        [Fact]
        public async Task GetUser_ReturnsUser_WhenUserExists()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(
                Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var user = new User { Id = "existingId", UserName = "testUser" };
            mockUserManager.Setup(x => x.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(user);
            var controller = new AccountsController(null, mockUserManager.Object);

            // Act
            var result = await controller.GetUser("existingId");

            // Assert
            var actionResult = Assert.IsType<ActionResult<User>>(result);
            var returnedUser = Assert.IsType<User>(actionResult.Value);
            Assert.Equal("testUser", returnedUser.UserName);
        }

        // negative test for login
        [Fact]
        public async Task Login_ReturnsNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var mockUserManager = GetMockUserManager();
            mockUserManager.Setup(um => um.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync((User)null);
            var mockAccountContext = new Mock<AccountContext>();
            var controller = new AccountsController(mockAccountContext.Object, mockUserManager.Object);
            var model = new LoginModel { Email = "test@test.com", Password = "Test123!" };

            // Act
            var result = await controller.Login(model);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        // positive test for login
        [Fact]
        public async Task Login_ReturnsUser_WhenUserExistsAndPasswordIsCorrect()
        {
            // Arrange
            var mockUserManager = GetMockUserManager();
            var user = new User { Email = "test@test.com" };
            mockUserManager.Setup(um => um.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(user);
            mockUserManager.Setup(um => um.CheckPasswordAsync(user, It.IsAny<string>())).ReturnsAsync(true);
            var controller = new AccountsController(null, mockUserManager.Object);

            var loginModel = new LoginModel { Email = "test@test.com", Password = "TestPassword123!" };

            // Act
            var result = await controller.Login(loginModel);

            // Assert
            var actionResult = Assert.IsType<ActionResult<User>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnedUser = Assert.IsType<User>(okResult.Value);
            Assert.Equal("test@test.com", returnedUser.Email);
        }

    }
}
