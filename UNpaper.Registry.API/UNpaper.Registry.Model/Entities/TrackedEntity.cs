using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UNpaper.Registry.Model.Entities
{
    public class TrackedEntity : EntityBase
    {
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedOn { get; set; } = DateTime.MinValue;
        public bool IsDeleted { get; set; } = false;
    }
}
