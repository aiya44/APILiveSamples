ALTER PROC [dbo].[AdvertisementDocuments_Delete]
    @Id INT
AS
/*
    DECLARE
	   @_id INT = 6
	   
    SELECT * 
    FROM dbo.AdvertisementDocuments 
    WHERE Id = @_id

    EXEC dbo.AdvertisementDocuments_Delete
	   @_id

    SELECT * 
    FROM dbo.AdvertisementDocuments 
    WHERE Id = @_id
*/
BEGIN
    DELETE
	   dbo.AdvertisementDocuments
    WHERE
	   Id = @Id
END