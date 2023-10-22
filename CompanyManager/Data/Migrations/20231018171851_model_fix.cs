using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CompanyManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class model_fix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AspNetUsers_UserId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Boards_Projects_ProjectID",
                table: "Boards");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_UserId",
                table: "AspNetUsers");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3337c133-ce97-42fa-bf1e-ba6e5e993aca");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "971baaca-cec5-4551-8485-32da1bb5f28c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bd2fa0ad-3cdc-45fe-a072-1d6a9f785520");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "CUpdateAt",
                table: "Boards",
                newName: "UpdateAt");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProjectID",
                table: "Boards",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "02ce1708-7fce-4047-8121-16796cd178f2", null, "user", "USER" },
                    { "822ae110-a496-4b7e-a348-81b1f84779c4", null, "viewer", "VIEWER" },
                    { "f026f634-8f92-4f93-af67-0d92aea02728", null, "admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Boards_Projects_ProjectID",
                table: "Boards",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Boards_Projects_ProjectID",
                table: "Boards");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "02ce1708-7fce-4047-8121-16796cd178f2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "822ae110-a496-4b7e-a348-81b1f84779c4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f026f634-8f92-4f93-af67-0d92aea02728");

            migrationBuilder.RenameColumn(
                name: "UpdateAt",
                table: "Boards",
                newName: "CUpdateAt");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProjectID",
                table: "Boards",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "AspNetUsers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3337c133-ce97-42fa-bf1e-ba6e5e993aca", null, "admin", "ADMIN" },
                    { "971baaca-cec5-4551-8485-32da1bb5f28c", null, "user", "USER" },
                    { "bd2fa0ad-3cdc-45fe-a072-1d6a9f785520", null, "viewer", "VIEWER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UserId",
                table: "AspNetUsers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AspNetUsers_UserId",
                table: "AspNetUsers",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Boards_Projects_ProjectID",
                table: "Boards",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID");
        }
    }
}
