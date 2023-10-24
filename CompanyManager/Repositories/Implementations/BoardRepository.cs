﻿using CompanyManager.Data;
using CompanyManager.Models.DBContext;
using CompanyManager.Repositories.Base;
using CompanyManager.Repositories.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CompanyManager.Repositories.Implementations
{
    public class BoardRepository : RepositoryBase<Board>, IBoardRepository
    {
        public BoardRepository(ApplicationDbContext context)
            : base(context)
        { }

        public async Task CreateBoard(Board board)
        {
            Create(board);
        }

        public Task DeleteBoard(Board board)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Board>> GetAllBoardsByProjectID(Guid projectID)
        {
            return await FindAll()
                .OrderByDescending(b => b.CreateAt)
                .Where(b => b.IsDeleted == false)
                .Include(b => b.Project)
                .Where(b => b.ProjectID == projectID)
                .ToListAsync();
        }

        public async Task<Board> GetBoard(Guid boardID, bool withIncludes)
        {
            if(withIncludes)
                return FindByCondition(b => b.ID.Equals(boardID))
                    .Include(b => b.Columns)
                    .SingleOrDefault();

            return FindByCondition(b => b.ID.Equals(boardID))
                    .SingleOrDefault();
        }

        public async Task UpdateBoard(Board board)
        {
            Update(board);
        }
    }
}


