import { redirect } from 'next/navigation';
import React from 'react';
import type { Metadata } from 'next';

const api = process.env.API_URL;

async function fetchData(id: string, increment: boolean = false) {
  const request = await fetch(
    `${api}api/share?blog=${id}&increment=${increment}`,
    {
      cache: 'no-store',
    }
  );
  return request.json();
}

export async function generateMetadata(context: any): Promise<Metadata> {
  const blog = context?.searchParams.blog;

  const blogdata = await fetchData(blog);

  return {
    title: blogdata.title,
    description: blogdata.info,
    openGraph: {
      images: [blogdata.images[0].link],
    },
  };
}

export default async function SharePage(context: any) {
  const blog = context?.searchParams.blog;
  if (blog) {
    const request = await fetchData(blog, true);
    redirect(`/blogs/${request._id}`);
  }

  return <div>Redirecting...🥸</div>;
}
