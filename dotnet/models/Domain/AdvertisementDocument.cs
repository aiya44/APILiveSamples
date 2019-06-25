using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class AdvertisementDocument
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public string Name { get; set; }
        public Uri DocumentUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public int CreatedBy { get; set; }
    }
}
