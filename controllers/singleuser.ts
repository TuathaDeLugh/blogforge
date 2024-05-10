export default async function getSingleUser(id:string) {
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