import CreateEdl from "@/components/create-edl"
import { Calendar } from "lucide-react"
import { useEffect, useState } from "react"

const Home = () => {


  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    const fetchItems = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/eld/`)
      if (res.ok) {
        // console.log(res.statusText)
        const data = await res.json()

        // console.log(res.ok)
        setItems(data)
      }
      setLoading(false)
    }

    fetchItems()

  }, [])


  return (
    <div className='py-6 px-2 space-y-4'>

      <div className="container flex flex-row justify-between  py-2 px-4 rounded-lg shadow-md border bg-bg/10">
        <h3>
          EDL Logs
        </h3>
        <CreateEdl />
      </div >

      <div className="container rounded-xl py-2 px-0 grid gap-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        {
          loading ? <h1>Loading...</h1> : (
            items.length && items.map((item: any, index) => (
              <a href={`/eld/${item.id}`} className="!no-underline group" key={index}>
                <div className={`flex flex-col justify-center gap-0 p-0 rounded-lg group-hover:shadow-lg transition duration-200 ease-in-out group-hover:bg-accent-foreground/5 border-accent-foreground/20 bg-bg shadow-lg ${new Date(item.date).getDate() === new Date().getDate() ? "border-2 border-destructive" : ""}`}>
                  <div className="relative w-full h-32 flex flex-col items-center flex-grow">

                    <Calendar className=" absolute text-destructive/50 inset-0 p-1 size-full z-10 group-hover:scale-110 transition duration-200 ease-in-out " />
                    <span className=" absolute bottom-[21px] z-20 text-5xl pt-4 font-bold">{new Date(item.date).getDate()}</span>

                  </div>
                  <div className="flex flex-col border-t mx-2 p-2">
                    <p className="text-lg">{item.name_of_carrier}</p>
                    {/* <p className="text-lg">{item.trailer_number}</p> */}
                  </div>
                </div>
              </a>
            )))
        }

      </div>

    </div >
  )
}

export default Home