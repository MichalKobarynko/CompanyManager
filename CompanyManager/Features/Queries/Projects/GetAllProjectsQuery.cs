using CompanyManager.Data;
using CompanyManager.Models;
using CompanyManager.Models.DTOs.API;
using CompanyManager.Repositories.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace CompanyManager.Features.Queries.Projects
{
    public class GetAllProjectsQuery : IRequest<ProjectListDTO>
    {
        public class GetAllprojectsQueryHandler : IRequestHandler<GetAllProjectsQuery, ProjectListDTO>
        {
            private readonly IRepositoryManager repository;

            public GetAllprojectsQueryHandler(IRepositoryManager repository)
            {
                this.repository = repository;
            }

            public async Task<ProjectListDTO> Handle(GetAllProjectsQuery request, CancellationToken cancellationToken)
            {
                var projects = await repository.Project.GetAllProjects();

                if (projects is null)
                    return new ProjectListDTO();

                var ptojectListDTO = new ProjectListDTO
                {
                    Projects = projects.Select(p => new ProjectDTO
                    {
                        ID = p.ID,
                        Title = p.Title,
                        Owner = null,
                        Boards = null,
                        CreateAt = p.CreateAt,
                        CUpdateAt = p.UpdateAt,
                        IsFinished = p.IsFinished
                    }).ToList(),

                    Count = projects.Count()
                };

                return ptojectListDTO;
            }
        }
    }
}
