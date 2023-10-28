using CompanyManager.Models.DTOs.API;
using CompanyManager.Models.DTOs.API.BoardDTOs;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using MediatR;

namespace CompanyManager.Features.Commands.Boards
{
    public class UpdateBoardCommand : IRequest<BoardDTO>
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public Guid ProjectID { get; set; }

        public class UpdateBoardCommandHandler : IRequestHandler<UpdateBoardCommand, BoardDTO>
        {
            private readonly IRepositoryManager repository;
            private readonly ILoggerManager logger;

            public UpdateBoardCommandHandler(
                IRepositoryManager repository,
                ILoggerManager logger)
            {
                this.repository = repository;
                this.logger = logger;
            }

            public async Task<BoardDTO> Handle(UpdateBoardCommand request, CancellationToken cancellationToken)
            {
                var board = await repository.Board.GetBoard(request.ID, false);

                if (board is null)
                    return null;

                board.Name = request.Name;
                board.ProjectID = request.ProjectID;
                board.UpdateAt = DateTime.Now;

                await repository.Board.UpdateBoard(board);
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
