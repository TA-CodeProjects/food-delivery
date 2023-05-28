import UserList from "./UserList";

function AdminPanel() {
   
    return (
      <>
        <section className="heading">
          <h1>Admin Panel</h1>
        </section>
        <section>
          <UserList />
        </section>
      </>
    );
}

export default AdminPanel;