﻿using CompanyManager.Models.DBContext;
using Microsoft.EntityFrameworkCore;

namespace CompanyManager.Data
{
    public interface IApplicationContext
    {
        DbSet<Project> Projects { get; set; }
        DbSet<Board> Boards { get; set; }

        
    }
}
//sdfsdsdfsd
