export default async function getSingleblog(id:string) {
    try {
      const api = process.env.API_URL;

      const response = await fetch(`${api}api/blog/${id}`,
      {
        cache: "no-store",
      });
      const review = await response.json();
      return review.data;
    } catch (error) {
      console.log(error);
    }
  }