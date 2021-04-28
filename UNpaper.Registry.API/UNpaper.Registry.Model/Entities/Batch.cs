using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UNpaper.Registry.Model.Entities
{
    public sealed class Batch : TrackedEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid OrganizationId { get; set; }

        public Organization Organization { get; set; }
    };
}
