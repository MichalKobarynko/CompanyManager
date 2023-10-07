using CompanyManager.Data;
using CompanyManager.Infrastructure.Services;
using CompanyManager.Models.DBContext;
using CompanyManager.Models.DTOs.Auth;
using CompanyManager.Models.EmailSending;
using LoggingService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using MojaJIRA.Responses.Auth;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace CompanyManager.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly ILoggerManager logger;
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly JwtHandler jwtHandler;
        private readonly IEmailSender emailSender;
        private readonly ApplicationDbContext context;

        public AuthController(
            ILoggerManager logger,
            UserManager<User> userManager,
            JwtHandler jwtHandler,
            IEmailSender emailSender,
            ApplicationDbContext context)
        {
            this.logger = logger;
            this.userManager = userManager;
            this.jwtHandler = jwtHandler;
            this.emailSender = emailSender;
            this.context = context;
        }

        [HttpPost]
        public async Task<IActionResult> UserLogin([FromBody] UserLoginDTO model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return BadRequest("Invalid Request");

            if (!await userManager.IsEmailConfirmedAsync(user))
                return Unauthorized(new UserLoginResponse { ErrorMessage = "Email is not confirmed" });

            if (user == null || !await userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized(new UserLoginResponse { ErrorMessage = "Invalid Authentication" });

            var signingCredentials = jwtHandler.GetSigningCredentials();
            var claims = await jwtHandler.GetClaims(user);
            var tokenOptions = jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new UserLoginResponse { IsAuthSuccessful = true, Token = token });
        }

        [HttpPost]
        public async Task<IActionResult> UserRegister([FromBody] UserRegisterDTO model)
        {
            if (model is null || !ModelState.IsValid)
                return BadRequest();

            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email
            };

            using var transaction = context.Database.BeginTransaction();
            try
            {
                var result = await userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                {
                    var errors = result.Errors.Select(e => e.Description);

                    return BadRequest(new UserRegisterResponse { Errors = errors });
                }

                await userManager.AddToRoleAsync(user, Roles.Viewer);
                await userManager.AddToRoleAsync(user, Roles.User);
                await transaction.CommitAsync();

                //Wysłanie email
                var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                var param = new Dictionary<string, string?>
                {
                    {"token", token },
                    {"email", user.Email }
                };
                var callback = QueryHelpers.AddQueryString(model.ClientURI, param);

                var message = new Message(new string[] { user.Email }, "Email Confirmation token", callback);
                await emailSender.SendEmailAsync(message);
                //wysłanie emaila

                return Ok(new UserRegisterResponse { IsSuccess = true });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "Internal server error");

            }
        }

        [HttpPost]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return BadRequest("Podany adres email nie jest zarejestrowany w bazie danych.");

            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var param = new Dictionary<string, string?>
            {
                {"token", token },
                {"email", model.Email }
            };

            var callback = QueryHelpers.AddQueryString(model.ClientURI, param);
            var message = new Message(new string[]
            {
                user.Email
            }, "Reset password token", callback);

            await emailSender.SendEmailAsync(message);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var user = await userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null)
                return BadRequest("Invalid Request");

            var resetPassResult = await userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
            if (!resetPassResult.Succeeded)
            {
                var errors = resetPassResult.Errors.Select(e => e.Description);
                return BadRequest(new { Errors = errors });
            }

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> EmailConfirmation([FromQuery] string token, [FromQuery] string email)
        {
            var user = await userManager.FindByEmailAsync(email);

            if (user == null)
                return BadRequest("Invalid Email Confirmation Request");

            var confirmResult = await userManager.ConfirmEmailAsync(user, token);

            if (!confirmResult.Succeeded)
                return BadRequest("Invalid Email Confirmation Request");

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult> CreateDefaultUsers()
        {
            string user = Roles.User;
            string viewer = Roles.Viewer;
            string admin = Roles.Admin;


            var addedUserList = new List<User>();

            var email_Admin = "kobass18@wp.pl";
            if (await userManager.FindByEmailAsync(email_Admin) == null)
            {
                var user_Admin = new User()
                {
                    Id = "77BB20FF-8CE2-4AA6-8E05-10D188891488",
                    SecurityStamp = "77BB20FF-8CE2-4AA6-8E05-10D188891488",
                    UserName = "Admin",
                    Email = email_Admin
                };
                IdentityResult r1 = await userManager.CreateAsync(user_Admin, "password");
                IdentityResult r2 = await userManager.AddToRoleAsync(user_Admin, admin);
                IdentityResult r3 = await userManager.AddToRoleAsync(user_Admin, user);
                IdentityResult r4 = await userManager.AddToRoleAsync(user_Admin, viewer);

                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;

                addedUserList.Add(user_Admin);
            }

            
            if (addedUserList.Count > 0)
                await context.SaveChangesAsync();

            return new JsonResult(new
            {
                Count = addedUserList.Count,
                Users = addedUserList
            });
        }

        [HttpGet]
        [Authorize(Roles = Roles.Admin)]
        public IActionResult GetClaims()
        {
            var claims = User.Claims
                .Select(c => new { c.Type, c.Value })
                .ToList();
            return Ok(claims);
        }

    }
}
