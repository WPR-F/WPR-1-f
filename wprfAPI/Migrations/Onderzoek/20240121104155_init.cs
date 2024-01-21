using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace wprfAPI.Migrations.Onderzoek
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Onderzoeken",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    titel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    beschrijving = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    locatie = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    datum = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    uitvoerder = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    beloning = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    categorie = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    aanmeldingen = table.Column<int>(type: "int", nullable: false),
                    typeBeperking = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    postcode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    leeftijd = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Onderzoeken", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Onderzoeken");
        }
    }
}
