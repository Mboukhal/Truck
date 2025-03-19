

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { ScrollText } from "lucide-react"

const eldShematic = z.object({
  name_of_carrier: z.string().min(3, "Name of carrier is too short").max(100, "Name of carrier is too long"),
  name_of_co_driver: z.string().optional(),
  main_office_address: z.string().optional(),
  date: z.string().optional(),
  total_miles_driving_today: z.number().optional().nullable(),
  vehicle_number: z.number().optional().nullable(),
  trailer_number: z.number().optional().nullable(),
})

type T_From = z.infer<typeof eldShematic>

const CreateEdl = () => {

  const form = useForm<T_From>({
    resolver: zodResolver(eldShematic),
    defaultValues: {
      name_of_carrier: localStorage.getItem("user") || "",
      name_of_co_driver: "",
      main_office_address: "",
      date: new Date().toISOString().split('T')[0],
      total_miles_driving_today: null,
      vehicle_number: null,
      trailer_number: null,
    },
  })

  async function onSubmit(values: T_From) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    const data = new FormData()
    data.append("name_of_carrier", localStorage.getItem("user") || "")

    for (const key in values) {
      const value = values[key as keyof T_From]
      data.append(key, value !== null ? String(value) : "")
    }

    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/eld/`, {
      method: "POST",
      body: data
    });

    console.log(res.status)

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <ScrollText />
          Create Log
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Create EDL</DialogTitle>
          <DialogDescription>
            Add your log details
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="overflow-auto space-y-6">
                <FormField
                  control={form.control}
                  name="name_of_carrier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carrier Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name of carrier..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name_of_co_driver"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Co Driver Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name of co driver..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="main_office_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Office Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the main office address..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Office Address</FormLabel>
                      <FormControl>
                        <Input type="date" placeholder="Enter name of co driver..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="total_miles_driving_today"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Miles Driving</FormLabel>
                      <div className="flex items-center gap-2">

                        <FormControl>
                          <Input placeholder="Enter total miles driving..." {...field}
                            type="number"
                            value={field.value || ""}
                            onChange={(e) => {
                              field.onChange(Number(e.target.value))
                            }}
                          />
                        </FormControl>
                        <span>Mile</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicle_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter vehicle number..." {...field}
                          type="number"
                          value={field.value || ""}
                          onChange={(e) => {
                            field.onChange(Number(e.target.value))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="trailer_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trailer Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter trailer number..." {...field}
                          type="number"
                          value={field.value || ""}
                          onChange={(e) => {
                            field.onChange(Number(e.target.value))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="py-2">
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default CreateEdl