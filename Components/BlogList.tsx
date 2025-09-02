import Image from 'next/image';
import React from 'react';

interface Blog {
  _id: string;
  title: string;
  category: string[];
  images: { _id: string; name: string; link: string }[];
  info: string;
  createdAt: string;
  updatedAt: string;
  usersave: number;
  share: number;
  creator: string;
}

interface BlogListProps {
  blogs: Blog[];
}

interface BlogCardProps {
  title: string;
  info: string;
  category: string[];
  images: { name: string; link: string }[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} {...blog} />
      ))}
    </div>
  );
};

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  info,
  category,
  images,
}) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image
            width={400}
            height={400}
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={images[0]?.link}
            alt={images[0]?.name}
          />
        </div>
        <div className="p-8">
          <h3 className="block mt-1 text-lg leading-tight font-medium text-black">
            {title}
          </h3>
          <p className="mt-2 text-gray-500">{info}</p>
          <div className="mt-4">
            {category.map((cat) => (
              <span
                key={cat}
                className="text-sm bg-blue-200 rounded-full px-2 py-1 mr-1"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
