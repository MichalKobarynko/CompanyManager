using CompanyManager.Models.DBContext;
using CompanyManager.Repositories.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CompanyManager.Features.Commands.Projects
{
    public class DeleteProjectCommand : IRequest<bool>
    {
        public Project Project { get; set; }

        public class DeleteProjectCommandHandler : IRequestHandler<DeleteProjectCommand, bool>
        {
            private readonly IRepositoryManager repository;

            public DeleteProjectCommandHandler(IRepositoryManager repository)
            {
                this.repository = repository;
            }

            public async Task<bool> Handle(DeleteProjectCommand request, CancellationToken cancellationToken)
            {
                request.Project.IsDeleted = true;   
                request.Project.UpdateAt = DateTime.Now;   

                await repository.Project.UpdateProject(request.Project);
                await repository.Save();

                return true;
            }
        }
    }
}
