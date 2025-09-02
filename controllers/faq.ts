export default async function getFaQs() {
  try {
    const api = process.env.API_URL;
    const response = await fetch(`${api}/api/faq`, {
      cache: 'no-store',
    });
    const faq = await response.json();
    return faq.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSingleFaQ(id: string) {
  try {
    const api = process.env.API_URL;
    const response = await fetch(`${api}/api/faq/${id}`, {
      cache: 'no-store',
    });
    const faq = await response.json();
    return faq.data;
  } catch (error) {
    console.log(error);
  }
}
