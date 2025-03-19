import NewPosition, { typeDuty } from "@/components/new-position";
import ViewInput from "@/components/view-input";
import { useQuery } from '@tanstack/react-query';
// import { useState } from "react";
// import { useEffect } from "react";
import { useParams } from "react-router";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { dateFormater, formatTimeString } from "@/lib/utils";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Eld = () => {

  const { pid } = useParams();

  // const [data, setData] = useState<any>({})


  const query = useQuery({
    queryKey: [`eld-${pid}`], queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/eld/${pid}/`)
      return res.json()
    }
  })



  const timing = useQuery({
    queryKey: [`timing-${pid}`], queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/timing/${pid}/`)
      return res.json()
    }
  })

  if (query.isLoading) return <h3 className="w-full text-center py-10">Loading...</h3>
  if (query.isError) return <h3 className="w-full text-center py-10">Fail To Load</h3>

  const onSaveHandler = async (body: string) => {

    await fetch(`${import.meta.env.VITE_BACKEND_API}/eld/${pid}/`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
    query.refetch()
  }



  return (
    <>
      <div className="py-6 px-2 space-y-4">
        <div className=" border p-4 rounded-md bg-bg/50 shadow-md">
          <div className="container flex w-full justify-between items-center">

            <ViewInput title={"Date"} value={query.data.date} flat type="date" keys="date" onSave={onSaveHandler} />
            <NewPosition id={pid} refetch={timing.refetch}
              lastStart={
                timing.data && timing.data.length > 0 && timing.data[timing.data.length - 1].to_time
              }
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1  gap-4 border p-4 rounded-md bg-bg/50 shadow-md">
          <ViewInput title={"Name Of Carrier"} value={query.data.name_of_carrier}
            keys="name_of_carrier" onSave={onSaveHandler}
          />
          <ViewInput title={"Vehicle Number"} value={query.data.vehicle_number} type="number"
            keys="vehicle_number" onSave={onSaveHandler}
          />
          <ViewInput title={"Trailer Number"} value={query.data.trailer_number} type="number"
            keys="trailer_number" onSave={onSaveHandler}
          />
          <ViewInput title={"Total Miles Driving Today"} value={query.data.total_miles_driving_today} type="number" keys="total_miles_driving_today" onSave={onSaveHandler} />
          <ViewInput title={"Total Miles Driving For The Week"} value={query.data.total_miles_driving_today} type="number" onSave={onSaveHandler} keys="total_miles_driving_today" />
          <ViewInput title={"Shipping Document Number"} value={query.data.shipping_document} type="number" onSave={onSaveHandler} keys="shipping_document" />
        </div>

        <div className="w-full !rounded-md border !shadow-md overflow-hidden">
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow className="bg-accent-foreground/20">
                <TableHead className="w-[100px]">State</TableHead>
                <TableHead>Start time</TableHead>
                <TableHead>End time</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead className="text-end">Created At</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-bg/50">
              {timing.data ? timing.data.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{typeDuty[item.type as keyof typeof typeDuty]}</TableCell>
                  <TableCell className="font-medium">{formatTimeString(item.from_time)}</TableCell>
                  <TableCell>{formatTimeString(item.to_time)}</TableCell>
                  <TableCell>{item.remarks || "N/A"}</TableCell>
                  <TableCell className="text-right">{dateFormater(item.created_at)}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="outline" className="hover:bg-destructive/30 group"
                      onClick={async () => {

                        await fetch(`${import.meta.env.VITE_BACKEND_API}/timing/${item.id}/`, {
                          method: "DELETE"
                        })
                        timing.refetch()

                      }}
                    >
                      <Trash2 className="group-hover:scale-125 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
                : (<TableRow>
                  <TableCell colSpan={5} className="text-center">No Data</TableCell>
                </TableRow>)
              }
            </TableBody>
          </Table>
        </div>

        <div className="overflow-x-auto rounded-md border shadow-md aspect-w-16 aspect-h-9">
          <img src="/edl.png" alt="time-line" className=" object-fill" />
        </div>
      </div>
    </>
  )
}

export default Eld