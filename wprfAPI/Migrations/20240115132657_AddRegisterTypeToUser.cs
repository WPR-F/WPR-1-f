using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace wprfAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddRegisterTypeToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RegisterType",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RegisterType",
                table: "AspNetUsers");
        }
    }
}
