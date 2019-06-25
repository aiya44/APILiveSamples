using Sabio.Models.Domain;
using Sabio.Models.Requests.AdvertisementDocuments;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface IAdvertisementDocumentService
    {
        AdvertisementDocument Get(int adId);
        List<AdvertisementDocument> GetByEventId(int eventId);
        List<AdvertisementDocument> GetByCreatedBy(int createdBy);
        int Insert(AdvertisementDocumentAddRequest model, int userId);
        void Delete(int id);
    }
}