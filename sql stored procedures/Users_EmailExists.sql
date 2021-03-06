ALTER PROC [dbo].[Users_EmailExists]
    @Email NVARCHAR(255) 
AS
/*
    DECLARE
	   @_email NVARCHAR(255) = 'sampleEmail@mailinator.com'

    EXEC dbo.Users_EmailExists
	   @_email

*/
BEGIN
    SELECT 
	   CASE WHEN EXISTS(
		  SELECT
			 Email
		  FROM
			 dbo.Users
		  WHERE
			 Email = @Email
	   )
		  THEN CAST (1 AS BIT)
		  ELSE CAST (0 AS BIT)	
	   END AS EmailExists
END
