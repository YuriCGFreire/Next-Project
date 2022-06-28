import Layout from "../components/layout";

export default function Home() {
  return (
    <div className={`
      flex
      justify-center
      h-screen
      items-center
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout titulo={"Cadastro Simpless"}/>
    </div>
  )
}
