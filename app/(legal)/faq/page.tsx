import { Div, H1 } from '@/Components/Motion/Motion';
import getFaQs from '@/controllers/faq'
import React from 'react'

interface FAQProps {
  faq: {
    _id: string;
    title: string;
    info: string;
  };
}

const OneFaQ: React.FC<FAQProps> = ({ faq }) => {
  return (
    <Div
      className="p-4 mb-4 border border-gray-200 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold">{faq.title}</h3>
      <p className="mt-2 text-gray-700">{faq.info}</p>
    </Div>
  );
};

export default async function Faq() {
  const faqs = await getFaQs()
  return (
    <section className='px-4 lg:px-8 max-w-[1500px] mx-auto mb-5 '>
    <div className="md:relative my-5 md:mt-16">
      <H1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute md:-top-14 left-0 text-[70px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 md:block hidden"
      >
        Admin
      </H1>
      <H1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }} className="pl-2 text-2xl md:text-4xl font-bold border-l-8 border-orange-400 dark:text-white">
        Admin Panal
      </H1>
    </div>
    <div className="space-y-4">
      {faqs.map((faq:any) => (
        <OneFaQ key={faq._id} faq={faq} />
      ))}
    </div>
    </section>

  )
}
