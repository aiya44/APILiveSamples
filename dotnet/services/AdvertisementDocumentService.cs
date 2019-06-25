using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests.AdvertisementDocuments;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Sabio.Services
{
    public class AdvertisementDocumentService : IAdvertisementDocumentService
    {
        private IDataProvider _dataProvider;

        public AdvertisementDocumentService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public AdvertisementDocument Get(int adId)
        {
            AdvertisementDocument model = null;

            _dataProvider.ExecuteCmd(
                "dbo.AdvertisementDocuments_GetById",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", adId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    model = MapAdvertisementDocument(reader);
                }
            );
            return model;
        }

        public List<AdvertisementDocument> GetByEventId(int eventId)
        {
            List<AdvertisementDocument> list = null;

            _dataProvider.ExecuteCmd(
                "dbo.AdvertisementDocuments_GetByEventId",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@EventId", eventId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    AdvertisementDocument model = MapAdvertisementDocument(reader);

                    if (list == null)
                    {
                        list = new List<AdvertisementDocument>();
                    }

                    list.Add(model);
                }
            );
            return list;
        }

        public List<AdvertisementDocument> GetByCreatedBy(int createdBy)
        {
            List<AdvertisementDocument> list = null;

            _dataProvider.ExecuteCmd(
                "dbo.AdvertisementDocuments_GetByCreatedBy",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@CreatedBy", createdBy);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    AdvertisementDocument model = MapAdvertisementDocument(reader);

                    if (list == null)
                    {
                        list = new List<AdvertisementDocument>();
                    }

                    list.Add(model);
                }
            );
            return list;
        }

        public AdvertisementDocument MapAdvertisementDocument(IDataReader reader)
        {
            AdvertisementDocument model = new AdvertisementDocument();
            int index = 0;

            model.Id = reader.GetSafeInt32(index++);
            model.EventId = reader.GetSafeInt32(index++);
            model.Name = reader.GetSafeString(index++);
            model.DocumentUrl = reader.GetSafeUri(index++);
            model.DateCreated = reader.GetSafeDateTime(index++);
            model.CreatedBy = reader.GetSafeInt32(index++);

            return model;
        }

        public int Insert(AdvertisementDocumentAddRequest model, int userId)
        {
            int adId = 0;

            _dataProvider.ExecuteNonQuery(
                "dbo.AdvertisementDocuments_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@EventId", model.EventId);
                    paramCol.AddWithValue("@Name", model.Name);
                    paramCol.AddWithValue("@DocumentUrl", model.DocumentUrl.ToString());
                    paramCol.AddWithValue("@CreatedBy", userId);

                    SqlParameter paramId = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    paramId.Direction = System.Data.ParameterDirection.Output;
                    paramCol.Add(paramId);
                },
                returnParameters: delegate (SqlParameterCollection param)
                {
                    Int32.TryParse(param["@Id"].Value.ToString(), out adId);
                }
            );
            return adId;
        }

        public void Delete(int id)
        {
            _dataProvider.ExecuteNonQuery(
                "dbo.AdvertisementDocuments_Delete",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                }
            );
        }
    }
}
