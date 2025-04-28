import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaShare } from "react-icons/fa";
import { IoHeartCircleOutline } from "react-icons/io5";
import { MdDescription } from "react-icons/md";
import { Div } from "./Motion/Motion";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getHomeData, getRecommendedData } from "@/controllers/blog";
import DefaultUserProfile from "./layout/DefaultUserProfile";

interface BlogPost {
  _id: string;
  title: string;
  category: string[];
  images: { name: string; link: string }[];
  info: string;
  usersave: number;
  share: number;
  creator: {
    _id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Writer {
  _id: string;
  username: string;
  name: string;
  avatar: string;
  totalBlogs: number;
  totalUsersave: number;
  totalShare: number;
  score: number;
}

interface HomePageProps {
  data: {
    recent: BlogPost[];
    popular: BlogPost[];
    trending: BlogPost[];
    category: BlogPost[];
    mostShared: BlogPost[];
    mostSaved: BlogPost[];
    topWriters: Writer[];
  };
  recommended?: BlogPost[];
}

export default async function Homepage() {
  const blogs = await getHomeData();
  const session = await getServerSession(authOptions);
  const userId = session?.user?.dbid || "";

  const recommended = await getRecommendedData(userId);

  if (blogs) {
    return <HomePageContent data={blogs} recommended={recommended} />;
  } else {
    return <div>loading</div>;
  }
}

const BlogCard: React.FC<{ blog: BlogPost }> = ({ blog }) => (
  <Link
    href={`/blogs/${blog._id}`}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-slate-100 dark:border-transparent  overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row hover:ring-2 hover:ring-orange-500"
  >
    <div className="sm:w-1/3 h-48 sm:h-auto">
      <Image
        height={400}
        width={400}
        src={blog.images[0].link}
        alt={blog.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4 sm:w-2/3 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg mb-2 truncate text-orange-500 dark:text-orange-400">
          {blog.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {typeof blog.category === "string" ? (
            <span className="bg-slate-200 dark:bg-slate-600/70 px-3 py-1 rounded-full text-xs">
              {blog.category}
            </span>
          ) : (
            blog.category.map((category) => (
              <span
                key={category}
                className="bg-slate-200 dark:bg-slate-600/70 px-3 py-1 rounded-full text-xs"
              >
                {category}
              </span>
            ))
          )}
        </div>
        <p className="text-gray-600 dark:text-slate-300 mb-2 line-clamp-2 h-12">
          {blog.info.substring(0, 100) + (blog.info.length > 100 ? "..." : "")}
        </p>
      </div>
      <div className=" flex items-center gap-2">
        {blog.creator.avatar.length > 0 ? (
          <Image
            src={blog.creator.avatar}
            width={50}
            height={50}
            className="rounded-full h-10 w-10"
            alt="image hai"
          />
        ) : (
          <DefaultUserProfile
            username={blog.creator.username}
            size={40}
            random
          />
        )}
        <div className="flex flex-col">
          <p className="text-gray-600 dark:text-slate-300 ">
            {blog.creator.username}
          </p>
          {blog.createdAt && (
            <p className="text-gray-600 dark:text-slate-300 text-xs ">
              {new Date(blog.createdAt).toLocaleString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "Asia/Kolkata",
              }) + " IST"}
            </p>
          )}
        </div>
      </div>

      {blog.usersave !== undefined && blog.usersave >= 0 && blog.share ? (
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-slate-300 mt-2">
          <span>Saves: {blog.usersave}</span>
          <span>Shares: {blog.share}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  </Link>
);

const HomePageContent: React.FC<HomePageProps> = ({ data, recommended }) => {
  const categories = Array.from(
    new Set(data.category.flatMap((blog) => blog.category))
  );

  return (
    <>
      <div className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <section className="mb-12">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-orange-500 dark:border-orange-400 font-bold   ">
                  Recent Blogs
                </h2>
                <Link
                  className=" underline text-sm hover:text-orange-600"
                  href={"/blogs"}
                >
                  Read all
                </Link>
              </div>
              <div className="space-y-6">
                {data.recent.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-orange-500 dark:border-orange-400  font-bold mb-4">
                Explore By Categories
              </h2>
              <div className="flex flex-wrap gap-2 items-center justify-center">
                {categories.map((category) => (
                  <Link
                    href={`blogs/filter/${category}`}
                    key={category}
                    className="bg-orange-300 dark:bg-orange-500/40 px-3 py-1 rounded-full"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </section>
          </Div>

          <Div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-orange-500 dark:border-orange-400  font-bold mb-6">
                Popular Blogs
              </h2>
              <div className="space-y-6">
                {data.popular.map((blog) => (
                  <Link
                    href={`/blogs/${blog._id}`}
                    key={blog._id}
                    className="bg-white dark:bg-gray-800 border border-slate-100 dark:border-transparent rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row hover:ring-2 hover:ring-orange-500"
                  >
                    <div className="sm:w-1/3 h-48 sm:h-auto">
                      <Image
                        height={400}
                        width={400}
                        src={blog.images[0].link}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 sm:w-2/3 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-2 truncate text-orange-500 dark:text-orange-400">
                          {blog.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {blog?.category.map((category) => (
                            <span
                              key={category}
                              className="bg-slate-200 dark:bg-slate-600/70 px-3 py-1 rounded-full text-xs"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className=" flex items-center gap-2">
                        {blog.creator.avatar.length > 0 ? (
                          <Image
                            src={blog.creator.avatar}
                            width={50}
                            height={50}
                            className="rounded-full h-10 w-10"
                            alt="image hai"
                          />
                        ) : (
                          <DefaultUserProfile
                            username={blog.creator.username}
                            size={40}
                            random
                          />
                        )}
                        <div className="flex flex-col">
                          <p className="text-gray-600 dark:text-slate-300 ">
                            {blog.creator.username}
                          </p>
                          <p className="text-gray-600 dark:text-slate-300 text-xs ">
                            {new Date(blog.createdAt).toLocaleString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              timeZone: "Asia/Kolkata",
                            }) + " IST"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-orange-500 dark:border-orange-400 font-bold   ">
                  Top Writers
                </h2>
                <Link
                  className=" underline text-sm hover:text-orange-600"
                  href={"/writer"}
                >
                  View all
                </Link>
              </div>
              <div className=" grid grid-cols-2 gap-4">
                {data.topWriters.map((writer) => (
                  <Link
                    href={`/writer/${writer.username}`}
                    key={writer._id}
                    className="flex flex-col  items-center bg-white dark:bg-gray-600/50 p-4 rounded-lg shadow hover:ring-2 hover:ring-orange-500"
                  >
                    {writer?.avatar?.length > 0 ? (
                      <Image
                        src={writer.avatar}
                        width={100}
                        height={100}
                        className="rounded-full h-12 w-12"
                        alt="image hai"
                      />
                    ) : (
                      <DefaultUserProfile username={writer.username} size={48} />
                    )}
                    <h3 className="font-semibold text-orange-500 dark:text-orange-400">
                      @{writer.username}
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                        <MdDescription />
                        {writer.totalBlogs}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                        <FaShare />
                        {writer.totalShare}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                        <IoHeartCircleOutline />
                        {writer.totalUsersave}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </Div>
        </div>
        {recommended && recommended.length > 0 && (
          <Div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-orange-500 dark:border-orange-400  font-bold mb-6 ">
                You May Like
              </h2>
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
                {recommended?.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            </section>
          </Div>
        )}
        <Div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-orange-500 dark:border-orange-400  font-bold mb-6 ">
              Popular In Category
            </h2>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
              {data.category?.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          </section>
        </Div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <section>
              <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-orange-500 dark:border-orange-400  font-bold mb-4">
                Most Shared Blogs
              </h2>
              <div className="space-y-6">
                {data.mostShared.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            </section>
          </Div>
          <Div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <section>
              <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-orange-500 dark:border-orange-400  font-bold mb-4">
                Most Saved Blogs
              </h2>
              <div className="space-y-6">
                {data.mostSaved.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            </section>
          </Div>
        </div>
      </div>
    </>
  );
};
