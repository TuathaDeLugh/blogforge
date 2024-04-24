export default async function getUserBlog(id:string,page:number|null,filter:string|null) {
    try {
      const api = process.env.API_URL;
      const response = await fetch(`${api}/api/blog/user/${id}?page=${page || 1}&filter=${filter}`, 
      {
        cache: "no-store",
      });
      const userblogs = await response.json();
      return userblogs;
    } catch (error) {
      console.log(error);
    }
  }