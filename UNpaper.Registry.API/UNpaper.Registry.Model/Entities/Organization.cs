﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UNpaper.Registry.Model.Entities
{
    public sealed class Organization : TrackedEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime FoundationDate { get; set; }
        public string IdentificationCode { get; set; }

        public List<Batch> Batches { get; set; } = new List<Batch>();
        public List<OrganizationUser> OrganizationUsers { get; set; } = new List<OrganizationUser>();
    }
}
