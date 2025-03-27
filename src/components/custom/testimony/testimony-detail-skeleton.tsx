export default function TestimonyDetailSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 animate-pulse">
      <div className="mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>

        <div className="h-6 w-24 bg-gray-200 rounded-full mb-3"></div>

        <div className="h-10 w-3/4 bg-gray-200 rounded mb-2"></div>

        <div className="flex items-center justify-between">
          <div className="h-5 w-48 bg-gray-200 rounded"></div>
          <div className="h-5 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  )
}

