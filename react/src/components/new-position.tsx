

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { MapPin } from "lucide-react"

export const typeDuty = {
  "ON": "On Duty",
  "OFF": "Off Duty",
  "DR": "Driving",
  "SB": "Sleeper Berth"
} as const

const posistionShematic = z.object({
  type: z.enum(["ON", "OFF", "DR", "SB"]),
  from_time: z.string().min(3, "Name of carrier is too short").max(100, "Name of carrier is too long"),
  to_time: z.string().min(3, "Name of carrier is too short").max(100, "Name of carrier is too long"),
  remarks: z.string().optional(),
})

type T_From = z.infer<typeof posistionShematic>

const NewPosition = ({ id, refetch, lastStart = "" }: { id: string | undefined, refetch: () => void, lastStart?: string }) => {

  const form = useForm<T_From>({
    resolver: zodResolver(posistionShematic),
    defaultValues: {
      type: "ON",
      from_time: lastStart,
      to_time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      remarks: "",
    },
  })


  async function onSubmit(values: T_From) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    const data = new FormData()
    if (id)
      data.append("eld_log", id)
    for (const key in values) {
      const value = values[key as keyof T_From]
      data.append(key, value !== null ? String(value) : "")
    }

    await fetch(`${import.meta.env.VITE_BACKEND_API}/timing/`, {
      method: "POST",
      body: data
    });
    form.setValue("from_time", values.to_time)
    form.reset()
    refetch()
    // console.log(res.status)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <MapPin />
          Add Position
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carrier Name</FormLabel>
                      <FormControl>

                        <select {...field} className="w-full p-2 border border-fg rounded-lg">
                          {
                            Object.keys(typeDuty).map((item, index) => (
                              <option key={index} value={item}>{typeDuty[item as keyof typeof typeDuty]}</option>
                            ))
                          }
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="from_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" placeholder="Enter start time..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="to_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" placeholder="Enter end time..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="remarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remark</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter remark..." {...field} />
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
                <DialogClose asChild>
                  <Button type="submit">Submit</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default NewPosition