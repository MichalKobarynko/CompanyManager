using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CompanyManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class add_project_board_isdeleted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1920e1c9-b711-48a1-a052-09a0f9c18404");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1936aff7-5f28-4f0a-86dc-48d495780d4c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "961c4fbe-4b0a-45a7-9578-8016938e2275");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Projects",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsFinished",
                table: "Projects",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Boards",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsFinished",
                table: "Boards",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "36974cc2-7a56-4e14-b59f-dfe138c8f390", null, "user", "USER" },
                    { "467390af-d0e6-440d-9497-2f3d90ff5a42", null, "admin", "ADMIN" },
                    { "d2cbc5fb-87c3-4e8c-907f-a4fd742f4509", null, "viewer", "VIEWER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "36974cc2-7a56-4e14-b59f-dfe138c8f390");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "467390af-d0e6-440d-9497-2f3d90ff5a42");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d2cbc5fb-87c3-4e8c-907f-a4fd742f4509");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "IsFinished",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Boards");

            migrationBuilder.DropColumn(
                name: "IsFinished",
                table: "Boards");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1920e1c9-b711-48a1-a052-09a0f9c18404", null, "viewer", "VIEWER" },
                    { "1936aff7-5f28-4f0a-86dc-48d495780d4c", null, "admin", "ADMIN" },
                    { "961c4fbe-4b0a-45a7-9578-8016938e2275", null, "user", "USER" }
                });
        }
    }
}
