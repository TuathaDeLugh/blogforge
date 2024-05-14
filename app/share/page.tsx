import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import React from 'react'

type Props = {
    params: {
        blog: string
    }
}


export const generatemetadata = ({params}:Props): Metadata =>{
    return {
        title: params.blog,
    }
}


export default async function SharePage(context : any) {
    const blog = context?.searchParams.blog
    const api = process.env.API_URL;
    if (blog)
        {
            
            const request =  await fetch(`${api}api/share?blog=${blog}`, {
                cache: "no-store",
            }); 
            const blogdata = await request.json();
            redirect(`/blogs/${blogdata._id}`)
            
        }
        
        return (
            <div>page</div>
        )
    }
    