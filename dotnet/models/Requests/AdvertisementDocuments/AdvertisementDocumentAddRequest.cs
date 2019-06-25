using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests.AdvertisementDocuments
{
    public class AdvertisementDocumentAddRequest
    {
        [Required, Range(1, int.MaxValue)]
        public int EventId { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }

        [Required]
        public Uri DocumentUrl { get; set; }
    }
}
