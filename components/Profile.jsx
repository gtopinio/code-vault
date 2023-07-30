import PasswordCard from "./PasswordCard"

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="headerText text-left">
        <span className="indigoGradient">{name} Profile</span>
      </h1>
      <p className="descText text-left">{desc}</p>

      <div className="mt-10 passwordLayout max-md:flex max-md:flex-col max-md:justify-center max-md:items-center ">
      {data.map((password) => (
        <PasswordCard
          key={password._id}
          password={password}
          handleEdit={()=>{handleEdit(password)}}  
          handleDelete={() => handleDelete(password)}     
        />
      ))}
    </div>

    </section>
  )
}

export default Profile