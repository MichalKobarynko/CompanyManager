using CompanyManager.Models;
using CompanyManager.Models.DTOs.API;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using MediatR;

namespace CompanyManager.Features.Commands.Projects
{
    public class UpdateProjectCommand : IRequest<ProjectDTO>
    {
        public Guid ID { get; set; }    
        public string Title { get; set; }
        public string OwnerID { get; set; }

        public class UpdateProjectCommandHandler : IRequestHandler<UpdateProjectCommand, ProjectDTO>
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

            public async Task<ProjectDTO> Handle(UpdateProjectCommand request, CancellationToken cancellationToken)
            {
                var project = await repository.Project.GetProject(request.ID);

                if (project is null)
                    return null;

                project.Title = request.Title;
                project.OwnerID = request.OwnerID.ToString().ToUpper();
                project.UpdateAt = DateTime.Now;

                await repository.Project.UpdateProject(project);
                await repository.Save();

                var projectDTO = new ProjectDTO
                {
                    ID = project.ID,
                    Title = project.Title,
                    OwnerID = null,
                    Boards = null,
                    CreateAt = project.CreateAt,
                    UpdateAt = project.UpdateAt,
                    IsFinished = project.IsFinished
                };

                return projectDTO;
            }
        }
    }
}
