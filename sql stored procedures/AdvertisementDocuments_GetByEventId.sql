ALTER PROC [dbo].[AdvertisementDocuments_GetByEventId]
    @EventId INT   
AS
/*
    DECLARE
	   @_eventId INT = 10

    EXEC dbo.AdvertisementDocuments_GetByEventId
	   @_eventId
*/
BEGIN
    SELECT
	   Id,
	   EventId,
	   [Name],
	   DocumentUrl,
	   DateCreated,
	   CreatedBy
    FROM
	   dbo.AdvertisementDocuments
    WHERE
	   EventId = @EventId
END