using Sabio.Models.Requests.AdvertisementDocuments;
using Sabio.Models.Requests.Images;
using Sabio.Models.Requests.Urls;
using Sabio.Models.Requests.Venues;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests.Events
{
    public class EventAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int OrganizationId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int EventTypeId { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2, ErrorMessage = "{0} must be greater than {2} and less than {1}")]
        public string Name { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2, ErrorMessage = "{0} must be greater than {2} and less than {1}")]
        public string Summary { get; set; }

        [StringLength(50)]
        public string Headline { get; set; }

        [Required]
        [StringLength(2000, MinimumLength = 100, ErrorMessage = "{0} must be greater than {2} and less than {1}")]
        public string Description { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int VenueId { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateStart { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateEnd { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime SetupTime { get; set; }

        [Range(1, int.MaxValue)]
        public int EventStatusId { get; set; }

        [Required]
        public bool AllowContributions { get; set; }

        public VenueAddRequest Venue { get; set; }

        public List<AdvertisementDocumentAddRequest> AdvertisementDocuments { get; set; }

        [Required]
        public List<ImageAddRequest> Images { get; set; }

        public List<int> ContributionTypes { get; set; }

        public List<UrlAddRequest> Urls { get; set; }
    }
}
