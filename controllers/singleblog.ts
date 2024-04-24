export default async function getSingleblog(id:string) {
    try {
      const api = process.env.API_URL;

      const response = await fetch(`${api}api/blog/${id}`,
      {
        cache: "no-store",
      });
      const oneblog = await response.json();
      return oneblog.data;
    } catch (error) {
      console.log(error);
    }
  }