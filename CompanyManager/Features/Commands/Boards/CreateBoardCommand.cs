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
                Guid boardID = Guid.NewGuid();  
                var board = new Board
                {
                    ID = boardID,
                    Name = request.Name,
                    ProjectID = request.ProjectID,
                };

                var column1 = new Column
                {
                    Name = "Zgłoszono",
                    DotColor = "#914ECF",
                    BoardID = boardID
                };

                var column2 = new Column
                {
                    Name = "Zgłoszono",
                    DotColor = "#913c1a3",
                    BoardID = boardID
                };

                await repository.Board.CreateBoard(board);
                await repository.Column.CreateColumn(column1);
                await repository.Column.CreateColumn(column2);
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
