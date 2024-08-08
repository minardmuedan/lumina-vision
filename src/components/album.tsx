'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FormEvent, useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import Loader from './loader'
import { createAlbumAction } from '@/action/album'
import { toast } from 'sonner'

export function AddAlbum() {
  const [modalOpen, setModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [values, setValues] = useState({ title: '', description: '' })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    const action = await createAlbumAction(values.title, values.description)
    if (action.type == 'error') toast.error(action.message)
    else setModalOpen(false)

    setIsSubmitting(false)
  }

  return (
    <Dialog defaultOpen={modalOpen} open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setModalOpen(true)}>
          <p>Create Album</p>
          <Image src="/icons/add.svg" alt="icon" height={17} width={17} className="invert" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Album</DialogTitle>
          <DialogDescription>Make a new album to store your favorite moments</DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              name="title"
              required
              placeholder="Input name of the album"
              onChange={(e) => setValues({ ...values, title: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="desciription">Desription</Label>
            <Input
              type="text"
              name="description"
              placeholder="Enter a descriptive name for your album"
              onChange={(e) => setValues({ ...values, description: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full">
            {isSubmitting ? (
              <Loader className="invert" />
            ) : (
              <>
                <p>Create Album</p>
                <Image src="/icons/add.svg" alt="icon" height={17} width={17} className="invert" />
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
