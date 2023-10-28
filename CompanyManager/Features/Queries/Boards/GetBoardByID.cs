using CompanyManager.Models.DTOs.API;
using CompanyManager.Models.DTOs.API.BoardDTOs;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using MediatR;

namespace CompanyManager.Features.Queries.Boards
{
    public class GetBoardByID : IRequest<BoardDTO>
    {
        public Guid ID { get; set; }

        public class GetBoardByIDQueryHandler : IRequestHandler<GetBoardByID, BoardDTO>
        {
            private readonly IRepositoryManager repository;
            private readonly ILoggerManager logger;

            public GetBoardByIDQueryHandler(
                IRepositoryManager repository,
                ILoggerManager logger)
            {
                this.repository = repository;
                this.logger = logger;
            }

            public async Task<BoardDTO> Handle(GetBoardByID request, CancellationToken cancellationToken)
            {
                var board = await repository.Board.GetBoard(request.ID, false);

                if (board is null)
                    return null;

                var boardDTO = new BoardDTO
                {
                    ID = board.ID,
                    Name = board.Name,
                    ProjectID = board.ProjectID,
                    CreateAt = board.CreateAt,
                    UpdateAt = board.UpdateAt,
                    IsFinished = board.IsFinished
                };

                return boardDTO;
            }
        }
    }
}
