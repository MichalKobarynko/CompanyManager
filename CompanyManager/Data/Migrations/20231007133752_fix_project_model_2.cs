using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CompanyManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class fix_project_model_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0092a7d1-5f89-4b8b-8dc7-bf651d2d4ab8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9a49a570-3548-4aa4-b02c-30b82ba54907");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eced7009-eb43-4077-bc77-93b86ad3ed6d");

            migrationBuilder.RenameColumn(
                name: "CUpdateAt",
                table: "Projects",
                newName: "UpdateAt");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3337c133-ce97-42fa-bf1e-ba6e5e993aca", null, "admin", "ADMIN" },
                    { "971baaca-cec5-4551-8485-32da1bb5f28c", null, "user", "USER" },
                    { "bd2fa0ad-3cdc-45fe-a072-1d6a9f785520", null, "viewer", "VIEWER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.RenameColumn(
                name: "UpdateAt",
                table: "Projects",
                newName: "CUpdateAt");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0092a7d1-5f89-4b8b-8dc7-bf651d2d4ab8", null, "user", "USER" },
                    { "9a49a570-3548-4aa4-b02c-30b82ba54907", null, "admin", "ADMIN" },
                    { "eced7009-eb43-4077-bc77-93b86ad3ed6d", null, "viewer", "VIEWER" }
                });
        }
    }
}
