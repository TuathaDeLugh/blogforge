export default async function getEmails(page: number) {
    try {
      const api = process.env.API_URL;
      const response = await fetch(`${api}/api/email?page=${page || 1}`, {
        cache: "no-store",
      });
      const email = await response.json();
      return email;
    } catch (error) {
      console.log(error);
    }
  }

  export async function getSingleEmail(id:string) {
    try {
      const api = process.env.API_URL;
      const response = await fetch(`${api}/api/email/${id}`, 
      {
        cache: "no-store",
      });
      const email = await response.json();
      return email.data;
    } catch (error) {
      console.log(error);
    }
  }