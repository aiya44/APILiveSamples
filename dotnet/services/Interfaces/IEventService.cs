using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Requests.Events;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface IEventService
    {
        int Insert(EventAddRequest model, int userId);
        void Delete(int id);
        EventDetails Get(int id);
        List<EventContributor> GetByEventId(int eventId);
        List<EventContributorV2> GetByOrganizationId(int organizationId);
        List<EventContributorV2> GetByOrganizationIdByEventName(int organizationId, string eventName);
        EventContributor GetByEventIdByContributionTypeId(int eventId, int contributionTypeId);
        List<Contribution> GetContributionTypes();
        List<Event> GetEventsByOrganization(int id);
        List<Event> Get();
        List<VolunteerEventFeed> GetTop10();
        List<Event> GetEventsByUser(int userId);
        void Update(EventUpdateRequest model, int userId);
        Paged<EventDetails> GetAllByPagination(int pageIndex, int pageSize);
        Paged<EventFeed> GetEventFeed(int pageIndex, int pageSize);
        Paged<EventDetails> GetBySearch(int pageIndex, int pageSize, string input);
        Paged<EventDetails> GetBySearch(int pageIndex, int pageSize, int id);
        Archive<string, int> GetEventTypes();
        Paged<EventDetails> SelectPastEvents(string monthYear, int pageIndex, int pageSize);
        void Insert(EventParticipantAddRequest model ,int userId);
        Paged<VolunteerEventFeed> GetVolunteerFeed(int pageIndex, int pageSize, int contributor, int contributionTypeId);
        Paged<VolunteerEventFeed> GetPastVolunteerFeed(string monthYear, int pageIndex, int pageSize, int contributor, int contributionTypeId);
        Paged<VolunteerEventFeed> GetAllByPagination_V2(int pageIndex, int pageSize);
        Archive<string, int> GetVolunteerEventTypes(int contributor);
    }
}