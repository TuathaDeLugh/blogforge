export async function getSingleUser(id:string) {
    try {
      const api = process.env.API_URL;
      const response = await fetch(`${api}/api/user/${id}`, 
      {
        cache: "no-store",
      });
      const userdata = await response.json();
      return userdata.data;
    } catch (error) {
      console.log(error);
    }
  }

  export async function getUserBlog(id:string,page:number|null,filter:string|null) {
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

export async function getAllUsers(page:number) {
    try {
      const api = process.env.API_URL;
      const response = await fetch(`${api}/api/user/?page=${page || 1}`, {
        cache: "no-store",
      });
      const user = await response.json();
      return user;
    } catch (error) {
      console.log(error);
    }
  }