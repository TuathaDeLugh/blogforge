export default async function getEmails(page: string) {
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