export default async function getUserBlog(id:string,page:number|null,filter:string|null) {
    try {
      const api = process.env.API_URL;
      const response = await fetch(`/api/blog/user/${id}?page=${page || 1}&filter=${filter}`, 
      {
        cache: "no-store",
      });
      const reviews = await response.json();
      return reviews;
    } catch (error) {
      console.log(error);
    }
  }