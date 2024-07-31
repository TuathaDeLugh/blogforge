import { H1 } from "@/Components/Motion/Motion";
import OneFaQ from "@/Components/Motion/OneFaq";
import getFaQs from "@/controllers/faq";
import Image from "next/image";

export default async function Faq() {
  const faqs = await getFaQs();
  return (
    <section className='px-4 lg:px-8 max-w-[1500px] mx-auto mb-5'>
      <div className="md:relative my-5 md:mt-16">
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute md:-top-14 left-0 text-[70px] text-gray-900 font-bold dark:text-gray-200 opacity-5 md:block hidden"
        >
          Help
        </H1>
        <H1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }} className="pl-2 text-2xl md:text-4xl font-bold border-l-8 border-orange-400 dark:text-white">
          FaQ
        </H1>
      </div>
      <div className="sticky grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="md:sticky md:h-[65dvh] md:top-40 flex justify-center items-center p-11">
          <Image src="/faq.svg" width={400} height={400} alt="Description" className="w-full h-auto" />
        </div>
        <div className="space-y-4">
          {faqs.map((faq:any, index: number) => (
            <OneFaQ key={faq._id} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
