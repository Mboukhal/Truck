import { Pen } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'

const ViewInput = ({ title, value, onSave, type = "text", keys, flat = false }: { title: string, value: string, onSave: (body: string) => Promise<void>, type?: string, keys: string, flat?: boolean }) => {

  const [edit, setEdit] = useState(false)
  const [newValue, setNewValue] = useState('')

  // useEffect(() => {
  //   setNewValue(value)
  // }, [value])

  return (
    <div
      className={`py-2 flex ${flat ? "flex-row gap-2 items-center" : " flex-col"}`}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setEdit(false)
        }
      }}>
      <p className='font-bold'>{title}: </p>
      <div className="flex items-center gap-2">
        {
          edit ? (
            <>
              <input
                type={type}
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="border-0 border-b-2 border-accent-foreground/50"
              />
              <Button
                onClick={() => {
                  if (value !== newValue)
                    onSave(JSON.stringify({ [keys]: newValue }))

                  setEdit(false)
                  // update value
                }}
                variant={"secondary"}

              >
                {value === newValue ? "Cancel" : "Save"}
                {/* Done */}
              </Button>
            </>
          ) : (
            <div
              className="flex items-center gap-1 group cursor-pointer group"
              onClick={() => {
                if (newValue === "")
                  setNewValue(value)
                setEdit(true)
              }}
            >
              <span className="!font-light ">{value || "N/A"}</span>
              <span className="text-transparent !font-light group-hover:text-fg/50">|</span><Pen size={16} />
              <span className="hidden !font-light group-hover:block">Edit</span>
            </div>
          )
        }
      </div>
    </div >
  )
}

export default ViewInput