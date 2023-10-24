using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CompanyManager.Data.Migrations
{
    /// <inheritdoc />
    public partial class Add_boards : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateTable(
                name: "Columns",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DotColor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BoardID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Columns", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Columns_Boards_BoardID",
                        column: x => x.BoardID,
                        principalTable: "Boards",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4cef75b6-02f6-42e5-beed-02e7b2b54556", null, "viewer", "VIEWER" },
                    { "8e2b5c23-9329-411f-8e98-ae24a727781b", null, "user", "USER" },
                    { "e93d90c8-ea03-4bdb-8ba7-21e1f17e4d90", null, "admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Columns_BoardID",
                table: "Columns",
                column: "BoardID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Columns");

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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "02ce1708-7fce-4047-8121-16796cd178f2", null, "user", "USER" },
                    { "822ae110-a496-4b7e-a348-81b1f84779c4", null, "viewer", "VIEWER" },
                    { "f026f634-8f92-4f93-af67-0d92aea02728", null, "admin", "ADMIN" }
                });
        }
    }
}
