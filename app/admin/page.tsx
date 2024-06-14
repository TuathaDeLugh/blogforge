'use client'
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SidebarProps {
  sideBar: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({ sideBar, setSideBar }: SidebarProps) {
  return (
    <AnimatePresence>
      {sideBar && (
        <>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-100%",
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bg-indigo-600 text-white shadow-lg top-0 left-0 w-full max-w-sm h-screen p-5 pt-24"
          >
            <button
              onClick={() => setSideBar((sideBar) =>!sideBar)}
              className="bg-white text-black h-8 w-8 block mb-2 rounded-full"
            >
              &times;
            </button>
            <h2 className="text-4xl capitalize leading-loose">hello!</h2>
            <p className="leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            onClick={() => setSideBar((sideBar) =>!sideBar)}
            className="bg-transparent px-5 fixed h-full w-full flex items-center justify-center top-0 left-0"
          />
        </>
      )}
    </AnimatePresence>
  );
}

interface ContentProps {
  sideBar: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Content({ sideBar, setSideBar, modal, setModal }: ContentProps) {
  return (
    <motion.div
      animate={{
        scale: sideBar || modal? 0.8 : 1,
        opacity: sideBar || modal? 0.5 : 1,
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
    >
      <h2 className="text-4xl capitalize">hello there</h2>
      <div className="flex items-center space-x-2">
        <button
          className="bg-indigo-600 my-3 text-white uppercase text-sm px-4 h-10 rounded"
          onClick={() => setSideBar((sideBar) =>!sideBar)}
        >
          {sideBar? "Close menu" : "Show menu"}
        </button>

        <button
          className="bg-indigo-600 my-3 text-white uppercase text-sm px-4 h-10 rounded"
          onClick={() => setModal((modal) =>!modal)}
        >
          {modal? "Close modal" : "Show modal"}
        </button>
      </div>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </motion.div>
  );
}

interface ModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ modal, setModal }: ModalProps) {
  return (
    <AnimatePresence>
      {modal && (
        <div className="px-5 fixed h-full w-full flex items-center justify-center top-0 left-0">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -50,
              opacity: 0,
            }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
            className="absolute z-10 p-5 bg-indigo-600 h-auto w-full max-w-md rounded text-white"
          >
            <button
              onClick={() => setModal((modal) =>!modal)}
              className="absolute top-0 right-0 -mt-4 -mr-4 bg-white text-indigo-600 border border-indigo-600 h-8 w-8 block mb-2 rounded-full"
            >
              &times;
            </button>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            onClick={() => setModal((modal) =>!modal)}
            className="bg-transparent px-5 fixed h-full w-full flex items-center justify-center top-0 left-0"
          />
        </div>
      )}
    </AnimatePresence>
  );
}

interface AppProps {}

function App({}: AppProps) {
  const [sideBar, setSideBar] = useState(false);
  const [modal, setModal] = useState(false);
  return (
    <div className="container mx-auto p-8">
      <Content {...{ sideBar, setSideBar, modal, setModal }} />
      <Sidebar {...{ sideBar, setSideBar }} />
      <Modal {...{ modal, setModal }} />
    </div>
  );
}

export default App;

