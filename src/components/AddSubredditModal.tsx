import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface AddSubredditModalProps {
  onAddSubreddit: (name: string, description: string) => void
}

export function AddSubredditModal({ onAddSubreddit }: AddSubredditModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && description) {
      onAddSubreddit(name, description)
      setName("")
      setDescription("")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Subreddit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Subreddit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Subreddit name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button type="submit">Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}