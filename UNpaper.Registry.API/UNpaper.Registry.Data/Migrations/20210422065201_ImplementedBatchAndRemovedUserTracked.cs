using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UNpaper.Registry.Data.Migrations
{
    public partial class ImplementedBatchAndRemovedUserTracked : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UNp_Organization_UNp_User_CreatedById",
                table: "UNp_Organization");

            migrationBuilder.DropForeignKey(
                name: "FK_UNp_Organization_UNp_User_UpdatedById",
                table: "UNp_Organization");

            migrationBuilder.DropForeignKey(
                name: "FK_UNp_OrganizationUser_UNp_Organization_OrganizationId",
                table: "UNp_OrganizationUser");

            migrationBuilder.DropForeignKey(
                name: "FK_UNp_OrganizationUser_UNp_User_UserId",
                table: "UNp_OrganizationUser");

            migrationBuilder.DropIndex(
                name: "IX_UNp_Organization_CreatedById",
                table: "UNp_Organization");

            migrationBuilder.DropIndex(
                name: "IX_UNp_Organization_UpdatedById",
                table: "UNp_Organization");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "UNp_Organization");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "UNp_Organization");

            migrationBuilder.CreateTable(
                name: "UNp_Batch",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrganizationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UNp_Batch", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UNp_Batch_UNp_Organization_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "UNp_Organization",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UNp_Batch_OrganizationId",
                table: "UNp_Batch",
                column: "OrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_UNp_OrganizationUser_UNp_Organization_OrganizationId",
                table: "UNp_OrganizationUser",
                column: "OrganizationId",
                principalTable: "UNp_Organization",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UNp_OrganizationUser_UNp_User_UserId",
                table: "UNp_OrganizationUser",
                column: "UserId",
                principalTable: "UNp_User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UNp_OrganizationUser_UNp_Organization_OrganizationId",
                table: "UNp_OrganizationUser");

            migrationBuilder.DropForeignKey(
                name: "FK_UNp_OrganizationUser_UNp_User_UserId",
                table: "UNp_OrganizationUser");

            migrationBuilder.DropTable(
                name: "UNp_Batch");

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedById",
                table: "UNp_Organization",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedById",
                table: "UNp_Organization",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UNp_Organization_CreatedById",
                table: "UNp_Organization",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_UNp_Organization_UpdatedById",
                table: "UNp_Organization",
                column: "UpdatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_UNp_Organization_UNp_User_CreatedById",
                table: "UNp_Organization",
                column: "CreatedById",
                principalTable: "UNp_User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UNp_Organization_UNp_User_UpdatedById",
                table: "UNp_Organization",
                column: "UpdatedById",
                principalTable: "UNp_User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UNp_OrganizationUser_UNp_Organization_OrganizationId",
                table: "UNp_OrganizationUser",
                column: "OrganizationId",
                principalTable: "UNp_Organization",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UNp_OrganizationUser_UNp_User_UserId",
                table: "UNp_OrganizationUser",
                column: "UserId",
                principalTable: "UNp_User",
                principalColumn: "Id");
        }
    }
}
