using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UNpaper.Registry.Model.Entities
{
    public class UserTrackedEntity : TrackedEntity
    {
        public Guid CreatedById { get; set; }
        public Guid? UpdatedById { get; set; }

        public User CreatedBy { get; set; }
        public User UpdatedBy { get; set; }
    }
}
