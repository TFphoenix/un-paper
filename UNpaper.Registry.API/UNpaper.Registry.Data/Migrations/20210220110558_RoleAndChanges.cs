using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UNpaper.Registry.Data.Migrations
{
    public partial class RoleAndChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UNp_Users",
                table: "UNp_Users");

            migrationBuilder.RenameTable(
                name: "UNp_Users",
                newName: "UNp_User");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UNp_User",
                table: "UNp_User",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "UNp_Role",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UNp_Role", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UNp_Role");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UNp_User",
                table: "UNp_User");

            migrationBuilder.RenameTable(
                name: "UNp_User",
                newName: "UNp_Users");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UNp_Users",
                table: "UNp_Users",
                column: "Id");
        }
    }
}
