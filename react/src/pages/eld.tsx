import ViewInput from "@/components/view-input";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Eld = () => {

  const { pid } = useParams();

  const [data, setData] = useState<any>({})

  useEffect(() => {

    const fetchItems = async () => {
      await fetch(`http://localhost:8000/api/edl/${pid}/`)
        .then(res => res.json())
        .then(data => setData(data))
    }

    fetchItems()

  }, [pid])

  if (!data) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="container px-2 py-4">
      <ViewInput title={"Name Of Carrier"} value={data.name_of_carrier} />
      <ViewInput title={"Date"} value={data.date} />

    </div>
  )
}

export default Eld