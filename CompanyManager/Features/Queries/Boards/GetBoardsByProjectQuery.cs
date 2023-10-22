using CompanyManager.Models.DBContext;
using CompanyManager.Models.DTOs.API;
using CompanyManager.Models.DTOs.API.BoardDTOs;
using CompanyManager.Repositories.Interfaces;
using MediatR;

namespace CompanyManager.Features.Queries.Boards
{
    public class GetBoardsByProjectQuery : IRequest<BoardListDTO>
    {
        public Guid ProjectId { get; set; }

        public class GetBoardsByProjectQueryHandler : IRequestHandler<GetBoardsByProjectQuery, BoardListDTO>
        {
            private readonly IRepositoryManager repository;

            public GetBoardsByProjectQueryHandler(IRepositoryManager repository)
            {
                this.repository = repository;
            }

            public async Task<BoardListDTO> Handle(GetBoardsByProjectQuery request, CancellationToken cancellationToken)
            {
                var boards = await repository.Board.GetAllBoardsByProjectID(request.ProjectId);

                if (boards is null)
                    return new BoardListDTO();

                var boardListDTO = new BoardListDTO
                {
                    Boards = boards.Select(b => new BoardDTO
                    {
                        ID = b.ID,
                        Name = b.Name,
                        ProjectID = b.ProjectID,
                        CreateAt = b.CreateAt,
                        UpdateAt = b.UpdateAt,
                        IsFinished = b.IsFinished
                    }).ToList(),
                    Count = boards.Count()
                };

                return boardListDTO;
            }
        }
    }
}
