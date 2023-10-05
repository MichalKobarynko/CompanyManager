﻿using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace CompanyManager.Models
{
    public class User : IdentityUser
    {
        public IEnumerable<User> Users { get; set; }
    }
    public class Project
    {
        public Guid ID { get; set; }

        public string Title { get; set; }

        [ForeignKey(nameof(User))]
        public User Owner { get; set; }
        public string OwnerID { get; set; }

        public IEnumerable<Board> Boards { get; set; }

        public DateTime CreateAt { get; set; }
        public DateTime CUpdateAt { get; set; }
    }
    

    public class Board
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime CUpdateAt { get; set; }
    }

    public class ProjectTask
    {

    }

    public class SubTask
    {

    }

    public class  Column 
    {
        
    }
}