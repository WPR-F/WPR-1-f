using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace wprfAPI.Migrations.Clickstream
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clickstream",
                columns: table => new
                {
                    ClickstreamId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GebeurtenisType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ElementId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaginaUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tijd = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clickstream", x => x.ClickstreamId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Clickstream");
        }
    }
}
