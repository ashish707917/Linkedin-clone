'use client'

import { useUser } from '@clerk/nextjs'
import React from 'react'
import ProfilePhoto from './ProfilePhoto'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createCommentAction } from '@/lib/serveractions'

const CommentInput = ({ postId }: { postId: string }) => {
  const { user } = useUser()

  const commentActionHandler = async (formData: FormData) => {
    try {
      if (!user) throw new Error('User not authenticated.')
      await createCommentAction(postId, formData)
    } catch {
      throw new Error('An error occurred')
    }
  }

  if (!user) return null // optionally handle unauthenticated state

  return (
    <form action={(formData) => commentActionHandler(formData)}>
      <div className="flex items-center gap-2">
        <ProfilePhoto src={user.imageUrl || ''} />
        <Input
          type="text"
          name="inputText"
          placeholder="Add a comment"
          className="rounded-full"
        />
        <Button variant="outline" className="rounded-full">
          Send
        </Button>
      </div>
    </form>
  )
}

export default CommentInput
