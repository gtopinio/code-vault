import Feed from "@components/Feed";

const Profile = ({ name, desc, data, handleEdit, handleDelete, handleUpdatePasswords }) => {
  return (
    <section className="w-full">
      <h1 className="headerText text-left">
        <span className="indigoGradient">{name} Profile</span>
      </h1>
      <p className="descText text-left">{desc}</p>

      <Feed
        data={data}
        handleEdit={handleEdit}  
        handleDelete={handleDelete}
        handleUpdatePasswords={handleUpdatePasswords}
      />

    </section>
  )
}

export default Profile