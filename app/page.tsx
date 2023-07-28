import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex flex-col justify-center">
        <h1 className="headerText text-center">
          Generate & Manage
        </h1>

        <span className="headerText text-center indigo_gradient">
          Robust Passwords
        </span>

        <div className="flex flex-row justify-center">
          <h3 className="descText text-center">
            Code Vault is a secure and convenient password manager and generator app. 
            It allows you to generate strong passwords, store them safely, and manage all your login credentials in one place.
          </h3>
        </div>

        <Feed/>
    </section>
  )
}

export default Home