using CompanyManager.Models;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using MediatR;

namespace CompanyManager.Features.Commands.Projects
{
    public class UpdateProjectCommand : IRequest<bool>
    {
        public Guid ID { get; set; }    
        public string Title { get; set; }
        public string OwnerID { get; set; }

        public class UpdateProjectCommandHandler : IRequestHandler<UpdateProjectCommand, bool>
        {
            private readonly IRepositoryManager repository;
            private readonly ILoggerManager logger;

            public UpdateProjectCommandHandler(
                IRepositoryManager repository,
                ILoggerManager logger)
            {
                this.repository = repository;
                this.logger = logger;
            }

            public async Task<bool> Handle(UpdateProjectCommand request, CancellationToken cancellationToken)
            {
                var project = await repository.Project.GetProject(request.ID);

                if (project is null)
                    return false;

                project.ID = request.ID;
                project.Title = request.Title;
                project.OwnerID = request.OwnerID.ToString();
                project.UpdateAt = DateTime.Now;

                await repository.Project.UpdateProject(project);
                await repository.Save();

                return true;
            }
        }
    }
}
