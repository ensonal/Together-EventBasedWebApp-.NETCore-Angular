using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Together.DataAccess.Migrations
{
    public partial class UpdateSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Location",
                table: "UserEvents",
                newName: "Country");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserEventRequests",
                newName: "OwnerUserId");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "UserEvents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GuestUserId",
                table: "UserEventRequests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "RequestDate",
                table: "UserEventRequests",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UserInfoUserID",
                table: "UserEventRequests",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "UserFavoriteEvents",
                columns: table => new
                {
                    UserFavoriteEventId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    EventId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFavoriteEvents", x => x.UserFavoriteEventId);
                    table.ForeignKey(
                        name: "FK_UserFavoriteEvents_UserEvents_EventId",
                        column: x => x.EventId,
                        principalTable: "UserEvents",
                        principalColumn: "UserEventId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFavoriteEvents_UserInfo_UserId",
                        column: x => x.UserId,
                        principalTable: "UserInfo",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserEvents_EventStatusId",
                table: "UserEvents",
                column: "EventStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_UserEvents_SportExperienceId",
                table: "UserEvents",
                column: "SportExperienceId");

            migrationBuilder.CreateIndex(
                name: "IX_UserEvents_SportId",
                table: "UserEvents",
                column: "SportId");

            migrationBuilder.CreateIndex(
                name: "IX_UserEventRequests_UserInfoUserID",
                table: "UserEventRequests",
                column: "UserInfoUserID");

            migrationBuilder.CreateIndex(
                name: "IX_UserFavoriteEvents_EventId",
                table: "UserFavoriteEvents",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFavoriteEvents_UserId",
                table: "UserFavoriteEvents",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserEventRequests_UserInfo_UserInfoUserID",
                table: "UserEventRequests",
                column: "UserInfoUserID",
                principalTable: "UserInfo",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserEvents_EventStatuses_EventStatusId",
                table: "UserEvents",
                column: "EventStatusId",
                principalTable: "EventStatuses",
                principalColumn: "EventStatusId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserEvents_SportExperience_SportExperienceId",
                table: "UserEvents",
                column: "SportExperienceId",
                principalTable: "SportExperience",
                principalColumn: "SportExperienceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserEvents_Sports_SportId",
                table: "UserEvents",
                column: "SportId",
                principalTable: "Sports",
                principalColumn: "SportId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserEventRequests_UserInfo_UserInfoUserID",
                table: "UserEventRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_UserEvents_EventStatuses_EventStatusId",
                table: "UserEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_UserEvents_SportExperience_SportExperienceId",
                table: "UserEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_UserEvents_Sports_SportId",
                table: "UserEvents");

            migrationBuilder.DropTable(
                name: "UserFavoriteEvents");

            migrationBuilder.DropIndex(
                name: "IX_UserEvents_EventStatusId",
                table: "UserEvents");

            migrationBuilder.DropIndex(
                name: "IX_UserEvents_SportExperienceId",
                table: "UserEvents");

            migrationBuilder.DropIndex(
                name: "IX_UserEvents_SportId",
                table: "UserEvents");

            migrationBuilder.DropIndex(
                name: "IX_UserEventRequests_UserInfoUserID",
                table: "UserEventRequests");

            migrationBuilder.DropColumn(
                name: "City",
                table: "UserEvents");

            migrationBuilder.DropColumn(
                name: "GuestUserId",
                table: "UserEventRequests");

            migrationBuilder.DropColumn(
                name: "RequestDate",
                table: "UserEventRequests");

            migrationBuilder.DropColumn(
                name: "UserInfoUserID",
                table: "UserEventRequests");

            migrationBuilder.RenameColumn(
                name: "Country",
                table: "UserEvents",
                newName: "Location");

            migrationBuilder.RenameColumn(
                name: "OwnerUserId",
                table: "UserEventRequests",
                newName: "UserId");
        }
    }
}
