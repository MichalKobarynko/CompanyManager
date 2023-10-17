using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CompanyManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class fiz_project_foreign : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_AspNetUsers_User",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_User",
                table: "Projects");

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
                name: "User",
                table: "Projects");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerID",
                table: "Projects",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0092a7d1-5f89-4b8b-8dc7-bf651d2d4ab8", null, "user", "USER" },
                    { "9a49a570-3548-4aa4-b02c-30b82ba54907", null, "admin", "ADMIN" },
                    { "eced7009-eb43-4077-bc77-93b86ad3ed6d", null, "viewer", "VIEWER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Projects_OwnerID",
                table: "Projects",
                column: "OwnerID");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_AspNetUsers_OwnerID",
                table: "Projects",
                column: "OwnerID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_AspNetUsers_OwnerID",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_OwnerID",
                table: "Projects");

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

            migrationBuilder.AlterColumn<string>(
                name: "OwnerID",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "User",
                table: "Projects",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "36974cc2-7a56-4e14-b59f-dfe138c8f390", null, "user", "USER" },
                    { "467390af-d0e6-440d-9497-2f3d90ff5a42", null, "admin", "ADMIN" },
                    { "d2cbc5fb-87c3-4e8c-907f-a4fd742f4509", null, "viewer", "VIEWER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Projects_User",
                table: "Projects",
                column: "User");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_AspNetUsers_User",
                table: "Projects",
                column: "User",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
