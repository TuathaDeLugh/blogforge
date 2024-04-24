export default async function getAllBlog(page?:number) {
    try {
      const api = process.env.API_URL;
      
      const apiEndpoint = `${api}api/writer?page=${page || 1}`;
      console.log('API Endpoint:', apiEndpoint);
    const response = await fetch(apiEndpoint, {
      cache: "no-store",
    });
      const blogs = await response.json();
      return blogs;
    } catch (error) {
      console.log(error);
    }
  }