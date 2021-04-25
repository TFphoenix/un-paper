﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UNpaper.Registry.Model.Entities
{
    public sealed class OrganizationUser
    {
        public Guid OrganizationId { get; set; }
        public Guid UserId { get; set; }
        public Guid? RoleId { get; set; }

        public Organization Organization { get; set; }
        public User User { get; set; }
        public Role Role { get; set; }
    }
}
