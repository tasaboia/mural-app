export default function TestimonyListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="card animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
              <div className="h-7 w-48 bg-gray-200 rounded mt-2"></div>
            </div>
            <div className="h-6 w-12 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>

          <div className="flex justify-between items-center">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

