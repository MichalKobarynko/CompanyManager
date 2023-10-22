using CompanyManager.Models.DBContext;
using CompanyManager.Models.DTOs.API;
using CompanyManager.Models.DTOs.API.BoardDTOs;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using MediatR;

namespace CompanyManager.Features.Commands.Boards
{
    public class CreateBoardCommand : IRequest<BoardDTO>
    {
        public string Name { get; set; }
        public Guid ProjectID { get; set; }

        public class CreateBoardCommandHandler : IRequestHandler<CreateBoardCommand, BoardDTO>
        {
            private readonly IRepositoryManager repository;
            private readonly ILoggerManager logger;

            public CreateBoardCommandHandler(
                IRepositoryManager repository,
                ILoggerManager logger)
            {
                this.repository = repository;
                this.logger = logger;
            }

            public async Task<BoardDTO> Handle(CreateBoardCommand request, CancellationToken cancellationToken)
            {
                var board = new Board
                {
                    ID = Guid.NewGuid(),
                    Name = request.Name,
                    ProjectID = request.ProjectID,
                };

                await repository.Board.CreateBoard(board);
                await repository.Save();

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
