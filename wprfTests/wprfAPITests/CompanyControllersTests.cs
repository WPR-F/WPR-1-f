using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using wprfAPI.Controllers;
using wprfAPI.Users;
using System.Collections.Generic;

namespace wprfTests.wprfAPITests
{


    public class CompanyControllerTests
    {
        private readonly Mock<UserManager<User>> _mockUserManager;

        public CompanyControllerTests()
        {
            var userStoreMock = new Mock<IUserStore<User>>();
            _mockUserManager = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
        }

        [Fact]
        public async Task CreateCompany_ReturnsNotFound_WhenUserDoesNotExist()
        {
            _mockUserManager.Setup(x => x.FindByIdAsync(It.IsAny<string>())).ReturnsAsync((User)null);

            var controller = new CompanyController(_mockUserManager.Object);
            var result = await controller.CreateCompany("testId");

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task CreateCompany_ReturnsOk_WhenUserIsAddedToCompanyRole()
        {
            var user = new User();
            _mockUserManager.Setup(x => x.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(user);
            _mockUserManager.Setup(x => x.AddToRoleAsync(user, "Company")).ReturnsAsync(IdentityResult.Success);

            var controller = new CompanyController(_mockUserManager.Object);
            var result = await controller.CreateCompany("testId");

            Assert.IsType<OkResult>(result.Result);
        }

        [Fact]
        public async Task CreateCompany_ReturnsBadRequest_WhenAddingUserToCompanyRoleFails()
        {
            var user = new User();
            var identityError = new IdentityError { Description = "Test error" };
            _mockUserManager.Setup(x => x.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(user);
            _mockUserManager.Setup(x => x.AddToRoleAsync(user, "Company")).ReturnsAsync(IdentityResult.Failed(identityError));

            var controller = new CompanyController(_mockUserManager.Object);
            var result = await controller.CreateCompany("testId");

            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            var modelState = Assert.IsAssignableFrom<IEnumerable<IdentityError>>(badRequestResult.Value);
            Assert.Equal("Test error", modelState.First().Description);
        }

        [Fact]
        public async Task GetCompanyUsers_ReturnsNotFound_WhenThereAreNoUsersInCompanyRole()
        {
            _mockUserManager.Setup(x => x.GetUsersInRoleAsync("Company")).ReturnsAsync(new List<User>());

            var controller = new CompanyController(_mockUserManager.Object);
            var result = await controller.GetCompanyUsers();

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task GetCompanyUsers_ReturnsOk_WhenThereAreUsersInCompanyRole()
        {
            var users = new List<User> { new User() };
            _mockUserManager.Setup(x => x.GetUsersInRoleAsync("Company")).ReturnsAsync(users);

            var controller = new CompanyController(_mockUserManager.Object);
            var result = await controller.GetCompanyUsers();

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var modelState = Assert.IsAssignableFrom<IEnumerable<User>>(okResult.Value);
            Assert.Equal(users, modelState);
        }
    }
}