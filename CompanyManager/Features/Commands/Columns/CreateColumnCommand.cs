using CompanyManager.Models.DBContext;
using CompanyManager.Models.DTOs.API.BoardDTOs;
using CompanyManager.Models.DTOs.API.Columns;
using CompanyManager.Repositories.Interfaces;
using LoggingService;
using MediatR;

namespace CompanyManager.Features.Commands.Columns
{
    public class CreateColumnCommand : IRequest<ColumnDTO>
    {
        public string Name { get; set; }
        public string DotColor { get; set; }
        public Guid BoardID { get; set; }

        public class CreateColumnCommandHandler : IRequestHandler<CreateColumnCommand, ColumnDTO>
        {
            private readonly IRepositoryManager repository;
            private readonly ILoggerManager logger;

            public CreateColumnCommandHandler(
                IRepositoryManager repository,
                ILoggerManager logger)
            {
                this.repository = repository;
                this.logger = logger;
            }

            public async Task<ColumnDTO> Handle(CreateColumnCommand request, CancellationToken cancellationToken)
            {
                var column = new Column 
                { 
                    Name = request.Name,
                    DotColor = request.DotColor,
                    BoardID = request.BoardID
                };

                await repository.Column.CreateColumn(column);
                await repository.Save();

                var columnDTO = new ColumnDTO
                {
                    ID = column.ID,
                    Name = column.Name,
                    BoardID = column.BoardID,
                    CreateAt = column.CreateAt,
                    UpdateAt = column.UpdateAt,
                };

                return columnDTO;
            }
        }
    }
}
