export default async function getSingleWriter(id:string,pageno:number) {
    try {

      const api = process.env.API_URL;
      const response = await fetch(`${api}/api/writer/${id}?page=${pageno}`, 
      {
        cache: "no-store",
      });
      const userdata = await response.json();
      return userdata;
    } catch (error) {
      console.log(error);
    }
  }