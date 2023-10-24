using CompanyManager.Models.DBContext;
using CompanyManager.Repositories.Interfaces;
using MediatR;

namespace CompanyManager.Features.Commands.Boards
{
    public class DeleteBoardCommand : IRequest<bool>
    {
        public Board Board { get; set; }

        public class DeleteProjectCommandHandler : IRequestHandler<DeleteBoardCommand, bool>
        {
            private readonly IRepositoryManager repository;

            public DeleteProjectCommandHandler(IRepositoryManager repository)
            {
                this.repository = repository;
            }

            public async Task<bool> Handle(DeleteBoardCommand request, CancellationToken cancellationToken)
            {
                try
                {
                    request.Board.IsDeleted = true;
                    request.Board.UpdateAt = DateTime.Now;

                    await repository.Board.UpdateBoard(request.Board);
                    await repository.Save();

                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }
    }
}
