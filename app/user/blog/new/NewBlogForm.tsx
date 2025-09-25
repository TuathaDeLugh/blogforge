'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { RxCross1 } from 'react-icons/rx';
import { IoAdd } from 'react-icons/io5';
import { uploadFilesToBucket } from '@/util/bucket';
import Image from 'next/image';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { NewBlogSchema } from '@/yupSchema';
import { Div } from '@/Components/Motion/Motion';
import RichTextEditor from '@/Components/layout/RichTextEditor';
import { useSession } from 'next-auth/react';
import { category } from '@/Components/Logic/Category';
import DefaultUserProfile from '@/Components/layout/DefaultUserProfile';

interface Image {
  _id: string;
  name: string;
  link: string;
}

interface BlogFormValues {
  title: string;
  category: string[];
  info: string;
  images: File[];
  detail: string;
  status: string;
  keywords: string[];
}

interface BanStatus {
  isBanned: boolean;
  commentBanned: boolean;
  banExpiry?: string;
  commentBanExpiry?: string;
  banReason?: string;
  commentBanReason?: string;
}

const NewBlogForm: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  const [banStatus, setBanStatus] = useState<BanStatus | null>(null);

  useEffect(() => {
    if (session?.user?.dbid) {
      checkBanStatus();
    }
  }, [session]);

  const checkBanStatus = async () => {
    try {
      const response = await fetch(
        `/api/user/ban-status?userId=${session?.user?.dbid}`
      );
      if (response.ok) {
        const data = await response.json();
        setBanStatus(data);
      }
    } catch (error) {
      console.error('Error checking ban status:', error);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik<BlogFormValues>({
    initialValues: {
      title: '',
      category: [],
      info: '',
      images: [],
      detail: '',
      status: 'Select',
      keywords: [],
    },
    validationSchema: NewBlogSchema,

    onSubmit: async (values, action) => {
      setDisabled(true);

      const postapi = async () => {
        try {
          // Upload images to Bucket API
          const uploadedFiles = await uploadFilesToBucket(values.images);
          const uploadedImageUrls = uploadedFiles.map((file) => ({
            _id: Math.floor(Math.random() * 1000000).toString(),
            name: file.name,
            link: file.link,
          }));

          // Now that all images are uploaded, construct the data for the POST request
          const data = {
            title: values.title,
            category: values.category,
            info: values.info,
            images: uploadedImageUrls,
            detail: values.detail,
            status: values.status,
            keywords: values.keywords,
            creator: user?.dbid,
          };

          // Make the POST request
          await fetch(`/api/blog`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          router.refresh();
          setImageUrls([]);
          setDisabled(false);
          action.resetForm();
          router.back();
        } catch (error) {
          console.error('Error posting data:', error);
          setDisabled(false);

          // Handle error as needed
        }
      };

      toast.promise(postapi(), {
        loading: 'Posting Blog',
        success: 'Blog Posted Successfully',
        error: ' Failed Post',
      });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFieldValue('images', [...values.images, ...files]);

    // Display image previews
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageUrls([...imageUrls, ...urls]);
  };

  const handleImageDelete = (index: number) => {
    const updatedFiles = [...values.images];
    updatedFiles.splice(index, 1);

    setFieldValue('images', updatedFiles);

    const updatedUrls = [...imageUrls];
    updatedUrls.splice(index, 1);
    setImageUrls(updatedUrls);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files || []);
    setFieldValue('images', [...values.images, ...files]);

    // Display image previews
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageUrls([...imageUrls, ...urls]);
  };

  const categoryOptions = category;

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordInput(e.target.value);
  };

  const handleKeywordAdd = () => {
    if (keywordInput.trim() !== '') {
      setKeywordInput('');
      setFieldValue('keywords', [...values.keywords, keywordInput.trim()]);
    }
  };

  const handleDeleteKeyword = (index: number) => {
    const updatedKeywords = [...values.keywords];
    updatedKeywords.splice(index, 1);
    setFieldValue('keywords', updatedKeywords);
  };

  // If user is banned, show disabled form
  if (banStatus?.isBanned) {
    return (
      <Div
        className="h-full flex items-center relative mb-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mx-auto mt-8 w-full">
          <div className="mx-auto p-4 md:p-7 rounded-lg border shadow bg-gray-100 dark:bg-gray-800 dark:border-slate-500 dark:shadow-slate-600 opacity-50">
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <h3 className="font-bold text-lg mb-2">Account Banned</h3>
              <p>
                Your account has been banned. You cannot create or edit blogs.
              </p>
              {banStatus.banExpiry && (
                <p className="text-sm mt-1">
                  Ban expires:{' '}
                  {new Date(banStatus.banExpiry).toLocaleDateString()}
                </p>
              )}
              {banStatus.banReason && (
                <p className="text-sm mt-1">Reason: {banStatus.banReason}</p>
              )}
            </div>

            <div className="w-full inline-block">
              <input
                type="text"
                placeholder="Title"
                disabled
                className="w-full rounded-md py-3 px-4 bg-gray-200 dark:bg-gray-600 text-sm cursor-not-allowed"
              />
              <p className="mb-6" />
            </div>

            <div className="inline-block w-full">
              <div className="border border-transparent rounded bg-gray-200 dark:bg-gray-600 px-[14px] py-3">
                <label className="text-gray-400 block font-medium mr-2">
                  Category:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 grow">
                  {categoryOptions.slice(0, 5).map((option) => (
                    <div key={option} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        disabled
                        className="mr-2 accent-gray-400 cursor-not-allowed"
                      />
                      <label className="text-gray-500">{option}</label>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mb-6" />
            </div>

            <div className="w-full inline-block">
              <textarea
                rows={3}
                placeholder="One Line Information"
                disabled
                className="w-full rounded-md py-3 px-4 bg-gray-200 dark:bg-gray-600 text-sm cursor-not-allowed resize-none"
              />
              <p className="mb-6" />
            </div>

            <div className="w-full inline-block">
              <div className="relative p-4 border-dashed border-2 border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-600 rounded-md cursor-not-allowed">
                <div className="flex flex-col items-center space-y-4">
                  <label className="text-sm text-gray-500 cursor-not-allowed">
                    Blog creation disabled
                  </label>
                </div>
              </div>
              <p className="mb-6" />
            </div>

            <button
              disabled
              type="button"
              className="bg-gray-400 text-gray-600 w-36 h-10 rounded cursor-not-allowed flex justify-center items-center gap-2"
            >
              Post Blog
            </button>
          </div>
        </div>
      </Div>
    );
  }

  return (
    <Div
      className="h-full flex items-center relative mb-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="mx-auto mt-8 w-full">
        <form
          onSubmit={handleSubmit}
          className="mx-auto p-4 md:p-7 rounded-lg border shadow bg-white dark:bg-gray-900 dark:border-slate-500 dark:shadow-slate-600"
        >
          <div className="w-full inline-block">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`outline ${
                errors.title && touched.title
                  ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50'
                  : ' outline-transparent '
              } w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
            />
            {errors.title && touched.title ? (
              <p className=" text-red-500 text-sm mb-1">* {errors.title}</p>
            ) : (
              <p className=" mb-6" />
            )}
          </div>

          <div className="inline-block w-full">
            <div
              className={`border ${
                errors.category && touched.category
                  ? '  border-red-400 dark:border-red-600 placeholder-red-600/50'
                  : ' border-transparent '
              } rounded bg-gray-100 dark:bg-gray-700 px-[14px] py-3`}
            >
              <label
                htmlFor="category"
                className={`${
                  errors.category && touched.category
                    ? 'text-red-400 dark:text-red-600 '
                    : ' text-gray-400  '
                } block font-medium mr-2`}
              >
                Category:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 grow">
                {categoryOptions.map((option) => (
                  <div key={option} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={option}
                      name="category"
                      value={option}
                      checked={values.category.includes(option)}
                      onChange={handleChange}
                      className="mr-2 accent-orange-600"
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
            {errors.category && touched.category ? (
              <p className=" text-red-600 dark:text-red-500 text-sm mb-1">
                * {errors.category}
              </p>
            ) : (
              <p className="mb-6" />
            )}
          </div>
          <div className="w-full inline-block">
            <textarea
              rows={3}
              name="info"
              placeholder="One Line Information"
              value={values.info}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`outline  resize-none ${
                errors.info && touched.info
                  ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50'
                  : ' outline-transparent '
              } w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
            ></textarea>
            {errors.info && touched.info ? (
              <p className=" text-red-600 dark:text-red-500 text-sm mb-1">
                * {errors.info}
              </p>
            ) : (
              <p className="mb-6" />
            )}
          </div>
          <div className="w-full inline-block">
            {/* Multiple Image Upload with Drag & Drop */}
            <div
              className={`relative p-4 border-dashed  border-2 ${
                isDragging
                  ? 'border-orange-400 bg-orange-400/10'
                  : errors.images && touched.images
                    ? 'border-red-600 dark:border-red-500 bg-gray-100 dark:bg-gray-700 '
                    : 'border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-700'
              } rounded-md cursor-pointer`}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="flex flex-col items-center space-y-4">
                <label
                  htmlFor="images"
                  className={`text-sm ${
                    isDragging
                      ? 'text-orange-400'
                      : errors.images && touched.images
                        ? 'text-red-600 dark:text-red-500'
                        : 'text-gray-600 dark:text-gray-200'
                  } cursor-pointer`}
                >
                  {isDragging
                    ? 'Drop your images here'
                    : 'Click / Drag & Drop to add images'}
                </label>
                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
                    {imageUrls.map((url, index) => (
                      <div
                        key={index}
                        className="border dark:border-gray-500 p-1 rounded-md flex items-center space-x-2 relative"
                      >
                        <Image
                          width={128}
                          height={80}
                          src={url}
                          alt={`Preview ${index}`}
                          className=" h-20 w-32 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleImageDelete(index)}
                          className=" absolute top-1 right-1 backdrop-blur-sm rounded-bl-xl rounded-tr text-red-500 p-2 hover:bg-red-600 hover:text-white focus:outline-none focus:shadow-outline-red active:bg-red-800"
                        >
                          <RxCross1 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {errors.images && touched.images ? (
              <p className="text-red-600 dark:text-red-500 text-sm mb-1">
                *{' '}
                {Array.isArray(errors.images)
                  ? errors.images.join(', ')
                  : errors.images}
              </p>
            ) : (
              <p className="mb-6" />
            )}
          </div>
          <div className="w-full inline-block">
            <div
              className={`outline ${
                errors.keywords && touched.keywords
                  ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50'
                  : ' outline-transparent '
              } w-full rounded-md bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
            >
              <div className="relative">
                <input
                  type="text"
                  id="keywords"
                  name="keywords"
                  value={keywordInput}
                  onChange={handleKeywordChange}
                  placeholder="Keywords"
                  className={`outline ${
                    errors.keywords && touched.keywords
                      ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50'
                      : ' outline-transparent '
                  } w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
                />
                <button
                  type="button"
                  className="absolute right-2 text-white top-2 p-1 bg-orange-400 rounded-full"
                  onClick={handleKeywordAdd}
                >
                  <IoAdd size={20} />
                </button>
              </div>

              {values.keywords.length > 0 ? (
                <div className="flex flex-wrap gap-2 p-2 border-t border-gray-300 dark:border-gray-500 max-h-80 overflow-y-auto">
                  {values.keywords.map((keyword: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center bg-orange-400/50 dark:bg-orange-400/50 p-2 rounded"
                    >
                      <div className="mr-2">{keyword}</div>
                      <button
                        type="button"
                        onClick={() => handleDeleteKeyword(index)}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        <RxCross1 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            {errors.keywords && touched.keywords ? (
              <p className=" text-red-600 dark:text-red-500 text-sm mb-1">
                * {errors.keywords}
              </p>
            ) : (
              <p className="mb-6" />
            )}
          </div>

          <div className="w-full inline-block">
            <div
              className={`outline ${
                errors.detail && touched.detail
                  ? ' outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50'
                  : ' outline-transparent '
              } w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
            >
              <label
                htmlFor="detail"
                className={`${
                  errors.detail && touched.detail
                    ? 'text-red-400 dark:text-red-600 '
                    : ' text-gray-400  '
                } block font-medium text-base mr-2`}
              >
                Detail:
              </label>
              <RichTextEditor
                value={values.detail}
                onChange={(value) => setFieldValue('detail', value)}
              />
            </div>
            {errors.detail && touched.detail ? (
              <p className=" text-red-600 dark:text-red-500 text-sm mb-1">
                * {errors.detail}
              </p>
            ) : (
              <p className="mb-6" />
            )}
          </div>

          <div className="w-full inline-block">
            <div
              className={`outline ${
                errors.status && touched.status
                  ? 'outline-1 outline-red-400 dark:outline-red-600 placeholder-red-600/50'
                  : 'outline-transparent'
              } flex items-center gap-2 w-full rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 ring-orange-500 focus:outline-none`}
            >
              <label
                htmlFor="ststus"
                className={`${
                  errors.status && touched.status
                    ? 'text-red-400 dark:text-red-600 '
                    : ' text-gray-400  '
                } block font-medium mr-2`}
              >
                Status:
              </label>

              <select
                id="status"
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`outline-transparent w-full bg-gray-100 dark:bg-gray-700 text-base focus:outline-none`}
              >
                <option value="select">select</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">archived</option>
              </select>
            </div>
            {errors.status && touched.status ? (
              <p className="text-red-600 dark:text-red-500 text-sm mb-1">
                * {errors.status}
              </p>
            ) : (
              <p className="mb-6" />
            )}
          </div>

          <span className="flex items-center text-base font-semibold  text-orange-500 dark:text-orange-400/70 mx-5 mb-6">
            Blog will be Post by :{' '}
            {user?.avatar ? (
              <Image
                width={50}
                height={50}
                src={user?.avatar}
                alt={user?.username || 'user image'}
                className="ml-3 mr-1 w-7 h-7 rounded-full border border-orange-500"
              />
            ) : (
              <DefaultUserProfile
                username={user?.username}
                size={28}
                className="ml-3 mr-1 w-7 h-7 rounded-full border border-orange-500"
              />
            )}{' '}
            {user?.username}
          </span>

          <button
            disabled={disabled}
            type="submit"
            className="bg-orange-500 text-white w-36 h-10 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline-green active:bg-orange-800 disabled:opacity-30 flex justify-center items-center gap-2"
          >
            {disabled ? (
              <>
                Posting Blog
                <AiOutlineLoading3Quarters size={20} className="animate-spin" />
              </>
            ) : (
              <>Post Blog</>
            )}
          </button>
        </form>
      </div>
    </Div>
  );
};

export default NewBlogForm;
