using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CompanyManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class Add_RowVersions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4cef75b6-02f6-42e5-beed-02e7b2b54556");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8e2b5c23-9329-411f-8e98-ae24a727781b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e93d90c8-ea03-4bdb-8ba7-21e1f17e4d90");

            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "Projects",
                type: "rowversion",
                rowVersion: true,
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "Columns",
                type: "rowversion",
                rowVersion: true,
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "Boards",
                type: "rowversion",
                rowVersion: true,
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "034ffc5b-ac67-40a2-b463-27420fd8dd97", null, "viewer", "VIEWER" },
                    { "a310aedc-1a77-4ef3-8987-93cee4eace96", null, "admin", "ADMIN" },
                    { "ecdcddeb-b681-4cfa-af09-0b515cbbe036", null, "user", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "034ffc5b-ac67-40a2-b463-27420fd8dd97");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a310aedc-1a77-4ef3-8987-93cee4eace96");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ecdcddeb-b681-4cfa-af09-0b515cbbe036");

            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "Columns");

            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "Boards");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4cef75b6-02f6-42e5-beed-02e7b2b54556", null, "viewer", "VIEWER" },
                    { "8e2b5c23-9329-411f-8e98-ae24a727781b", null, "user", "USER" },
                    { "e93d90c8-ea03-4bdb-8ba7-21e1f17e4d90", null, "admin", "ADMIN" }
                });
        }
    }
}
