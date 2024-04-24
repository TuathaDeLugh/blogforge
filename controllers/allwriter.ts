export default async function getAllBlog(page?:number) {
    try {
      const api = process.env.API_URL;
      
      const apiEndpoint = `${api}api/blog?page=${page || 1}`;
      console.log('API Endpoint:', apiEndpoint);
    const response = await fetch(apiEndpoint, {
      cache: "no-store",
    });
      const writers = await response.json();
      return writers;
    } catch (error) {
      console.log(error);
    }
  }