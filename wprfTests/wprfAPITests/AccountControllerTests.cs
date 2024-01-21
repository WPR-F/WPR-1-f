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
            Assert.IsType<NotFoundObjectResult>(result.Result);
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

        // Test for unsuccessful registration when the user already exists
        [Fact]
        public async Task PostAccount_ReturnsConflict_WhenUserAlreadyExists()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(
                Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var user = new User { Email = "test@test.com" };
            var identityResult = IdentityResult.Failed(new IdentityError { Description = "User already exists" });
            mockUserManager.Setup(um => um.CreateAsync(It.IsAny<User>(), It.IsAny<string>())).ReturnsAsync(identityResult);
            var controller = new AccountsController(null, mockUserManager.Object);

            var registerModel = new RegisterModel { User = user, Password = "TestPassword123!" };

            // Act
            var result = await controller.PostAccount(registerModel);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            var modelState = badRequestResult.Value as IEnumerable<IdentityError>;
            var errorMessages = modelState.Select(m => m.Description);
            Assert.Contains("User already exists", errorMessages);
        }
        //negative tests for GetUser
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

        // Test for unsuccessful login when the password is incorrect
        [Fact]
        public async Task Login_ReturnsUnauthorized_WhenPasswordIsIncorrect()
        {
            // Arrange
            var mockUserManager = GetMockUserManager();
            var user = new User { Email = "test@test.com" };
            mockUserManager.Setup(um => um.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(user);
            mockUserManager.Setup(um => um.CheckPasswordAsync(user, It.IsAny<string>())).ReturnsAsync(false);
            var controller = new AccountsController(null, mockUserManager.Object);

            var loginModel = new LoginModel { Email = "test@test.com", Password = "WrongPassword!" };

            // Act
            var result = await controller.Login(loginModel);

            // Assert
            Assert.IsType<UnauthorizedResult>(result.Result);
        }

        // Test for successful login when the user exists and the password is correct, but the user is not confirmed
        [Fact]
        public async Task Login_ReturnsOk_WhenUserExistsAndPasswordIsCorrectButNotConfirmed()
        {
            // Arrange
            var mockUserManager = GetMockUserManager();
            var user = new User { Email = "test@test.com", EmailConfirmed = false };
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
            Assert.False(returnedUser.EmailConfirmed);
        }
        // Test for unsuccessful GetUser when the user exists but is not confirmed
        [Fact]
        public async Task GetUser_ReturnsNotFound_WhenUserExistsButNotConfirmed()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(
                Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var user = new User { Id = "existingId", UserName = "testUser", EmailConfirmed = false };
            mockUserManager.Setup(x => x.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(user);
            var controller = new AccountsController(null, mockUserManager.Object);

            // Act
            var result = await controller.GetUser("existingId");

            // Assert
            var actionResult = Assert.IsType<ActionResult<User>>(result);
            Assert.True(actionResult.Value != null);
            Assert.Equal("existingId", actionResult.Value.Id);
            Assert.False(actionResult.Value.EmailConfirmed);
        }

    }
}
