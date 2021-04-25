using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UNpaper.Registry.Data.Migrations
{
    public partial class ImplementedOrganization : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UNp_Organization",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FoundationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdentificationCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedById = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UpdatedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UNp_Organization", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UNp_Organization_UNp_User_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "UNp_User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UNp_Organization_UNp_User_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "UNp_User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UNp_OrganizationUser",
                columns: table => new
                {
                    OrganizationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UNp_OrganizationUser", x => new { x.OrganizationId, x.UserId });
                    table.ForeignKey(
                        name: "FK_UNp_OrganizationUser_UNp_Organization_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "UNp_Organization",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UNp_OrganizationUser_UNp_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "UNp_Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UNp_OrganizationUser_UNp_User_UserId",
                        column: x => x.UserId,
                        principalTable: "UNp_User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UNp_Organization_CreatedById",
                table: "UNp_Organization",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_UNp_Organization_UpdatedById",
                table: "UNp_Organization",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_UNp_OrganizationUser_RoleId",
                table: "UNp_OrganizationUser",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UNp_OrganizationUser_UserId",
                table: "UNp_OrganizationUser",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UNp_OrganizationUser");

            migrationBuilder.DropTable(
                name: "UNp_Organization");
        }
    }
}
