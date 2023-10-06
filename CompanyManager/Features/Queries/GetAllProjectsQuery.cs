using CompanyManager.Data;
using CompanyManager.Models;
using CompanyManager.Repositories.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace CompanyManager.Features.Queries
{
    public class GetAllProjectsQuery : IRequest<IEnumerable<Project>> 
    {
        //public class GetAllprojectsQueryHandler : IRequestHandler<GetAllProjectsQuery, IEnumerable<Project>>
        //{
        //    private readonly IRepositoryManager repository;

        //    public GetAllprojectsQueryHandler(IRepositoryManager context)
        //    {
        //        this.repository = context;
        //    }

        //    public async Task<IEnumerable<Project>> Handle(GetAllProjectsQuery request, CancellationToken cancellationToken)
        //    {
        //        var projectList = await repository.Projects.ToListAsync();

        //        if (projectList == null)
        //        {
        //            return null;
        //        }

        //        return projectList.AsReadOnly();
        //    }
        //}
    }
}
