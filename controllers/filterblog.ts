export default async function getFilterBlog(category:string,page?:number) {
    try {
      const api = process.env.API_URL;
      
      const apiEndpoint = `${api}api/blog/filter/?category=${category}&page=${page || 1}`;
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