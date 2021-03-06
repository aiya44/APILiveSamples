﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public bool IsConfirmed { get; set; }
        public int Status { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
