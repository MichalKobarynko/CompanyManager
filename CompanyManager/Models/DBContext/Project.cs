using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CompanyManager.Models.DBContext
{
    
    public class Project
    {
        public Guid ID { get; set; }

        public string Title { get; set; }


        [ForeignKey(nameof(User))]
        public string OwnerID { get; set; }
        public User Owner { get; set; }
        
        public IEnumerable<Board> Boards { get; set; }

        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
        public bool IsDeleted { get; set; } = false;
        public bool IsFinished { get; set; } = false;

        [Timestamp]
        public byte[] RowVersion { get; set; }
    }


    public class Board
    {
        public Guid ID { get; set; }
        public string Name { get; set; }

        [ForeignKey(nameof(Project))]
        public Guid ProjectID { get; set; }
        public Project Project { get; set; }    

        public IEnumerable<Column> Columns { get; set; }

        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
        public bool IsDeleted { get; set; } = false;
        public bool IsFinished { get; set; } = false;

        [Timestamp]
        public byte[] RowVersion { get; set; }
    }

    public class Column
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string DotColor { get; set; }

        [ForeignKey(nameof(Board))]
        public Guid BoardID { get; set; }
        public Board Board { get; set; }

        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
        public bool IsDeleted { get; set; } = false;

        [Timestamp]
        public byte[] RowVersion { get; set; }

    }

    public class ProjectTask
    {

    }

    public class SubTask
    {

    }

    
}
