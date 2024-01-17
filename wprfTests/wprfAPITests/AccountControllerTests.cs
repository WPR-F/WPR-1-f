using Xunit;
using Moq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using wprfAPI.Users;
using wprfAPI.Controllers;
using System;
using Microsoft.EntityFrameworkCore;


public class AccountControllerTests
{
    private Mock<UserManager<User>> GetMockUserManager()
    {
        var userStoreMock = new Mock<IUserStore<User>>();
        return new Mock<UserManager<User>>(
            userStoreMock.Object, null, null, null, null, null, null, null, null);
    }

    //test for register
    [Fact]
    public async Task FindByEmail_ReturnsBadRequest_WhenUserDoesNotExist()
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


    // tests for GetUser
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

    //test for login
    [Fact]
    public async Task Login_ReturnsNotFound_WhenUserDoesNotExist()
    {
        // Arrange
        var mockUserManager = GetMockUserManager();
        mockUserManager.Setup(um => um.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync((User)null);
        var mockAccountContext = new Mock<AccountContext>(); // Add this line
        var controller = new AccountsController(mockAccountContext.Object, mockUserManager.Object);
        var model = new LoginModel { Email = "test@test.com", Password = "Test123!" };

        // Act
        var result = await controller.Login(model);

        // Assert
        Assert.IsType<NotFoundResult>(result.Result);
    }
}
