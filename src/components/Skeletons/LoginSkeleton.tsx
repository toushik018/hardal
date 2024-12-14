const LoginSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-pulse">
      <div className="w-full max-w-md">
        {/* Logo Skeleton */}
        <div className="text-center mb-8">
          <div className="h-12 w-32 bg-gray-200 rounded-lg mx-auto mb-4" />
        </div>

        {/* Login Card Skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Header Skeleton */}
          <div className="text-center mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto mb-2" />
            <div className="h-4 w-64 bg-gray-200 rounded-lg mx-auto" />
          </div>

          {/* Form Fields Skeleton */}
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <div className="h-5 w-16 bg-gray-200 rounded mb-2" />
              <div className="h-10 w-full bg-gray-200 rounded-xl" />
            </div>

            {/* Password Field */}
            <div>
              <div className="h-5 w-20 bg-gray-200 rounded mb-2" />
              <div className="h-10 w-full bg-gray-200 rounded-xl" />
            </div>

            {/* Forgot Password Link Skeleton */}
            <div className="flex justify-end">
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>

            {/* Submit Button Skeleton */}
            <div className="h-12 w-full bg-gray-200 rounded-xl" />
          </div>

          {/* Create Account Link Skeleton */}
          <div className="mt-8 text-center flex items-center justify-center gap-2">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSkeleton; 