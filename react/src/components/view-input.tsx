import { Pen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

const ViewInput = ({ title, value }: { title: string, value: string }) => {

  const [edit, setEdit] = useState(false)
  const [newValue, setNewValue] = useState('')

  useEffect(() => {
    setNewValue(value)
  }, [value])

  return (
    <div
      className='py-2'
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setEdit(false)
        }
      }}>
      <p className='font-bold'>{title}: </p>
      <div className="flex items-center gap-2 ">
        {
          edit ? (
            <>
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="border-0 border-b-2 border-accent-foreground/50"
              />
              <Button
                onClick={() => {
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
              onClick={() => setEdit(true)}
            >
              <span className="!font-light ">{value}</span>
              <span className="text-transparent !font-light group-hover:text-fg/50">|</span><Pen size={16} />
              <span className="hidden !font-light group-hover:block">Edit</span>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ViewInput