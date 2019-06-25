using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Sabio.Data;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System.Data.SqlClient;
using Sabio.Models;
using Sabio.Data.Providers;
using Sabio.Models.Requests.Events;
using System.Data.SqlTypes;
using Sabio.Models.Requests.AdvertisementDocuments;
using Sabio.Models.Requests.Images;
using Sabio.Models.Requests.Urls;

namespace Sabio.Services
{
    public class EventService : IEventService
    {
        private IDataProvider _dataProvider = null;

        public EventService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        // Other co-workers' content

        public int Insert(EventAddRequest model, int userId)
        {
            int id = 0;

            _dataProvider.ExecuteNonQuery(
                "dbo.Events_Insert",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    SqlParameter parameter = new SqlParameter();
                    parameter.ParameterName = "@Id";
                    parameter.SqlDbType = SqlDbType.Int;
                    parameter.Direction = ParameterDirection.Output;
                    parameterCollection.Add(parameter);

                    parameterCollection.AddWithValue("@OrganizationId", model.OrganizationId);
                    parameterCollection.AddWithValue("@UserId", userId);
                    parameterCollection.AddWithValue("@EventTypeId", model.EventTypeId);
                    parameterCollection.AddWithValue("@Name", model.Name);
                    parameterCollection.AddWithValue("@Summary", model.Summary);
                    parameterCollection.AddWithValue("@Headline", model.Headline ?? SqlString.Null);
                    parameterCollection.AddWithValue("@Description", model.Description);
                    parameterCollection.AddWithValue("@EventStatusId", model.EventStatusId);
                    parameterCollection.AddWithValue("@AllowContributions", model.AllowContributions);

                    // Convert time to UTC
                    DateTime dateStart = TimeZoneInfo.ConvertTimeToUtc(model.DateStart, TimeZoneInfo.Local);
                    DateTime dateEnd = TimeZoneInfo.ConvertTimeToUtc(model.DateEnd, TimeZoneInfo.Local);
                    DateTime setupTime = TimeZoneInfo.ConvertTimeToUtc(model.SetupTime, TimeZoneInfo.Local);
                    parameterCollection.AddWithValue("@DateStart", dateStart);
                    parameterCollection.AddWithValue("@DateEnd", dateEnd);
                    parameterCollection.AddWithValue("@SetupTime", setupTime);

                    // Venue
                    parameterCollection.AddWithValue("@VenueId", model.VenueId);
                    parameterCollection.AddWithValue("@LocationId", model.Venue.LocationId);
                    parameterCollection.AddWithValue("@VenueName", model.Venue.Name);
                    parameterCollection.AddWithValue("@VenueHeadline", model.Venue.Headline);
                    parameterCollection.AddWithValue("@VenueDescription", model.Venue.Description);
                    parameterCollection.AddWithValue("@VenueUrl", model.Venue.Url);
                    parameterCollection.AddWithValue("@VenueIsApproved", model.Venue.IsApproved);

                    // Advertisement Documents
                    DataTable adDocs = null;
                    if (model.AdvertisementDocuments != null)
                    {
                        adDocs = new DataTable();
                        adDocs.Columns.Add("Name", typeof(string));
                        adDocs.Columns.Add("DocumentUrl", typeof(string));
                        foreach (AdvertisementDocumentAddRequest adDoc in model.AdvertisementDocuments)
                        {
                            adDocs.Rows.Add(adDoc.Name, adDoc.DocumentUrl);
                        }
                    }
                    parameterCollection.AddWithValue("@AdvertisementDocuments", adDocs);

                    // Images
                    DataTable images = new DataTable();
                    images.Columns.Add("EntityTypeId", typeof(int));
                    images.Columns.Add("Url", typeof(string));
                    images.Columns.Add("Title", typeof(string));
                    images.Columns.Add("Description", typeof(string));
                    foreach (ImageAddRequest image in model.Images)
                    {
                        images.Rows.Add(image.EntityTypeId, image.Url, image.Title, image.Description);
                    }
                    parameterCollection.AddWithValue("@Images", images);

                    // Contributions
                    DataTable contributionTypes = null;
                    if (model.ContributionTypes != null)
                    {
                        contributionTypes = new DataTable();
                        contributionTypes.Columns.Add("ContributionTypeId", typeof(int));
                        foreach (int contributionTypeId in model.ContributionTypes)
                        {
                            contributionTypes.Rows.Add(contributionTypeId);
                        }
                    }
                    parameterCollection.AddWithValue("@ContributionTypes", contributionTypes);

                    // Urls
                    DataTable urls = null;
                    if (model.Urls != null)
                    {
                        urls = new DataTable();
                        urls.Columns.Add("Url", typeof(string));
                        urls.Columns.Add("UrlTypeId", typeof(int));
                        urls.Columns.Add("EntityTypeId", typeof(int));
                        foreach (UrlAddRequest url in model.Urls)
                        {
                            urls.Rows.Add(url.UrlLink, url.UrlTypeId, url.EntityTypeId);
                        }
                    }
                    parameterCollection.AddWithValue("@Urls", urls);
                },
                returnParameters: delegate (System.Data.SqlClient.SqlParameterCollection parameterCollection)
                {
                    Int32.TryParse(parameterCollection["@Id"].Value.ToString(), out id);
                }
            );
            return id;
        }

        // Other co-workers' content
    }
}

