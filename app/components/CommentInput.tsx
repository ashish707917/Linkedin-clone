"use client"
import React from 'react'

import { useUser } from '@clerk/nextjs'

import { createCommentAction } from '@/lib/serveractions'
import { Input } from '@/components/ui/input'
import ProfilePhoto from './ProfilePhoto'
import { Button } from '@/components/ui/button'

const CommentInput = ({ postId }: { postId: string }) => {
    const { user } = useUser();
    const commentActionHandler = async (formData:FormData) => {
        try {
            if(!user) throw new Error('User not authenticated');
            await createCommentAction(postId, formData);
             
        } catch (error) {
            throw error;
        }
    }
    return (
        <form action={(formData)=> commentActionHandler(formData)}>
            <div className='flex items-center gap-2'>
                <ProfilePhoto
                 src={user?.imageUrl!} />
                <Input
                    type="text"
                    name="inputText"
                    placeholder='Add a comment'
                    className='rounded-full'
                />
                <Button type='submit' variant={'outline'} className='rounded-full'>Send</Button>
            </div>
        </form>
    )
}

export default CommentInput