const SkeletonItem: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-slate-100 dark:border-transparent overflow-hidden animate-pulse duration-300 flex flex-col sm:flex-row">
    <div className=" min-h-48 min-w-56 bg-gray-300 dark:bg-gray-700"></div>
    <div className="p-4 sm:w-2/3 flex flex-col justify-between">
      <div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 mb-2 w-3/4 rounded-full"></div>
        <div className="flex flex-wrap gap-2 mb-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded-full text-xs w-1/4 h-6"></div>
          ))}
        </div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2 w-full rounded-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2 w-5/6 rounded-full"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-full h-10 w-10 bg-gray-300 dark:bg-gray-700"></div>
        <div className="flex flex-col w-2/3">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2 w-1/2 rounded-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 w-full rounded-full"></div>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-slate-300 mt-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/4 rounded-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/4 rounded-full"></div>
      </div>
    </div>
  </div>
  );
  
  const HomePageSkeletonLoader: React.FC = () => {
    return (
      <div className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-12">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-gray-300 dark:border-gray-700 font-bold">Recent Blogs</h2>
              </div>
              <div className="space-y-6">
                {[...Array(5)].map((_, index) => (
                  <SkeletonItem key={index} />
                ))}
              </div>
            </section>
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-gray-300 dark:border-gray-700 font-bold mb-4">Explore By Categories</h2>
              <div className="flex flex-wrap gap-2 items-center justify-center">
                {[...Array(11)].map((_, index) => (
                  <div key={index} className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded-full text-xs h-6 w-24"></div>
                ))}
              </div>
            </section>
          </div>
          <div>
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-gray-300 dark:border-gray-700 font-bold mb-6">Popular Blogs</h2>
              <div className="space-y-6">
                {[...Array(4)].map((_, index) => (
                  <SkeletonItem key={index} />
                ))}
              </div>
            </section>
            <section className="mb-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-gray-300 dark:border-gray-700 font-bold">Top Writers</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex flex-col items-center bg-white dark:bg-gray-600/50 p-4 rounded-lg shadow animate-pulse ">
                    <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2 w-1/2 rounded-full"></div>
                    <div className="grid grid-cols-3 gap-2 w-full">
                      {[...Array(3)].map((_, idx) => (
                        <div key={idx} className="h-4 bg-gray-300 dark:bg-gray-700 w-1/3 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-gray-300 dark:border-gray-700 font-bold mb-6">Popular In Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(6)].map((_, index) => (
              <div key={index}>
                <div className="text-lg font-semibold mb-3 text-center h-6 bg-gray-300 dark:bg-gray-700 w-1/2 mx-auto rounded-full"></div>
                <SkeletonItem />
              </div>
            ))}
          </div>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <section>
            <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-gray-300 dark:border-gray-700 font-bold mb-4">Most Shared Blogs</h2>
            <div className="space-y-6">
              {[...Array(5)].map((_, index) => (
                <SkeletonItem key={index} />
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-3xl md:text-4xl px-2 border-l-8 border-gray-300 dark:border-gray-700 font-bold mb-4">Most Saved Blogs</h2>
            <div className="space-y-6">
              {[...Array(5)].map((_, index) => (
                <SkeletonItem key={index} />
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  };
  
  export default HomePageSkeletonLoader;
  