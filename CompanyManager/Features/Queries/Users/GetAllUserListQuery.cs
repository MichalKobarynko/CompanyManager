using CompanyManager.Models.DBContext;
using CompanyManager.Models.DTOs.API;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CompanyManager.Features.Queries.Users
{
    public class GetAllUserListQuery : IRequest<UserListDTO>
    {
        public class GetAllUsersListQueryHandler : IRequestHandler<GetAllUserListQuery, UserListDTO>
        {
            private readonly UserManager<User> userManager;

            public GetAllUsersListQueryHandler(
                UserManager<User> userManager
                )
            {
                this.userManager = userManager;
            }

            public async Task<UserListDTO> Handle(GetAllUserListQuery request, CancellationToken cancellationToken)
            {
                var users = await userManager.Users.ToListAsync();

                var userListDTO = new UserListDTO
                {
                    Users = users.Select(u => new UserDTO
                    {
                        ID = u.Id,
                        UserName = u.UserName,
                    }).ToList(),
                    Count = users.Count()
                };

                return userListDTO;
            }
        }
    }
}
