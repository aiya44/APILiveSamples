ALTER PROC [dbo].[Users_GetPaginatedByUserRole]    
    @UserRole NVARCHAR(100),
    @PageIndex INT,
    @PageSize INT
AS
/*
    DECLARE 
	   @_userRole NVARCHAR(100) = 'Admin', -- UserRoleTypes: Admin, Organization Admin, Organization Member, Volunteer, Student
	   @_pageIndex INT = 0,
	   @_pageSize INT = 5

    EXEC dbo.Users_GetPaginatedByUserRole
	   @_userRole,
	   @_pageIndex,
	   @_pageSize
*/
BEGIN
    DECLARE 
	   @Offset INT = @PageSize * @PageIndex,
	   @UserRoleId NVARCHAR(50);
		  (SELECT @UserRoleId = Id
		   FROM dbo.UserRoleTypes
		   WHERE [Name] = @UserRole);
		   	
    -- Select users with matching UserRole
    DECLARE
	   @Users TABLE(UserId INT);
    INSERT INTO
	   @Users (
		  UserId
	   ) (
		  SELECT UR.UserId
		  FROM [dbo].[UsersRoles] AS UR
			 INNER JOIN dbo.UserRoleTypes URT
				ON UR.UserRoleType = URT.Id
		  WHERE UR.UserRoleType = @UserRoleId)
    
    -- Set #0: Select all associated roles for matched @Users
    SELECT
	   UR.UserId,
	   URT.Id AS RoleId,
	   URT.[Name] AS RoleName
    FROM dbo.UsersRoles AS UR
	   INNER JOIN dbo.UserRoleTypes AS URT
		  ON UR.UserRoleType = URT.Id
	   INNER JOIN @Users AS U
		  ON UR.UserId = U.UserId

    -- Set #1: Paginated list of users
    SELECT
	   Main.Id,
	   UP.FirstName,
	   UP.LastName,
	   Main.Email,
	   Main.IsConfirmed,
	   Main.[Status],
	   Main.DateCreated,
	   Main.DateModified,
	   TotalCount = COUNT(0)OVER()
    FROM dbo.Users AS Main
	   INNER JOIN @Users AS U
		  ON Main.Id = U.UserId
	   INNER JOIN dbo.UserProfiles AS UP
		  ON U.UserId = UP.UserId
    ORDER BY 
	   Main.DateCreated DESC
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY
END