# APILive Snippets
Snippets of work done on API Live for American Digital Diversity Initiative. Other co-workers content will generally be commented out and noted as so.

## React
- Login.jsx pushes state via react router's props.history.push() to an AppRoutes parent component where it accepts it via getDerivedStateFromProps:<br />
<pre>
static getDerivedStateFromProps(nextProps, prevState) {<br />
    const type = nextProps.location.state ? nextProps.location.state.type : "";<br />
    switch (type) {<br />
      case "login":<br />
        return nextProps.location.state.user.id !== prevState.currentUser.id<br />
          ? {<br />
              currentUser: {<br />
                isLoggedIn: true,<br />
                ...nextProps.location.state.user<br />
              }<br />
            }<br />
          : {};<br />
      default:<br />
        return prevState.currentUser.isLoggedIn<br />
          ? {<br />
              currentUser: {<br />
                ...prevState.currentUser<br />
              }<br />
            }<br />
          : {};<br />
    }<br />
}<br />
</pre>
- Dashboards: every dashboard's Main.jsx relies on the subroute to display the component of interest when its respective button is clicked
- Multi-step event form components located under components/admin/organizationDashboard/event/eventform. Individual step components are imported into EventForm.jsx

## .Net
- BaseApiController created by Project Lead but is provided here for reference
- AdvertisementDocumentService.cs generally standard CRUD
- Login service methods located under UserService.cs
- EventService.cs's Insert method contains handling of the various related table entities that are needed in order to insert an event record. DataTable types are used to handle the user defined table types in SQL

## SQL Stored Procedures
- Users_Insert.sql connects to registration methods in .Net
- Users_GetPaginatedByUserRole.sql contains paginated example combined with separate set for related multiple users' roles
- Events_Insert.sql utilizes transaction to rollback any insertions done due to having to insert various table entities
- Rest are generally standard CRUD stored procedures 
