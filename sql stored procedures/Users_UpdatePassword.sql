ALTER PROC [dbo].[Users_UpdatePassword]
    @Id INT,
    @PasswordHash NVARCHAR(128)

AS
/*
    DECLARE
	   @_id INT = 1,
	   @_passwordHash NVARCHAR(128) = 'newSamplePassword' -- .Net will hash the password

    SELECT *
    FROM dbo.Users
    WHERE Id = @_id

    EXEC dbo.Users_UpdatePassword
	   @_id,
	   @_passwordHash

    SELECT *
    FROM dbo.Users
    WHERE Id = @_id
*/
BEGIN
    UPDATE 
	   dbo.Users
    SET
	   PasswordHash = @PasswordHash,
	   DateModified = GETUTCDATE()   	   
    WHERE
	   Id = @Id
END