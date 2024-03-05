export default async function getAllBlog(page?:number) {
    try {
      const api = process.env.API_URL;
      
      const apiEndpoint = `${api}api/blog?page=${page || 1}`;
      console.log('API Endpoint:', apiEndpoint);
    const response = await fetch(apiEndpoint, {
      cache: "no-store",
    });
      const reviews = await response.json();
      return reviews;
    } catch (error) {
      console.log(error);
    }
  }