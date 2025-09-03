import clsx from "clsx";

export default function SkeletonCard({ isLoading }: { isLoading?: boolean }) {
    return (
        <div
          className={clsx(
            'flex flex-col glass-effect rounded-2xl p-6 text-white',
            {
              'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent':
                isLoading,
            }
          )}
        >
          <div className='relative max-h-72 flex-1 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-purple-900/30 to-pink-900/30' />
          <div className='flex flex-col space-y-2'>
            <div className='h-6 w-3/4 rounded-lg bg-gradient-to-r from-purple-900/30 to-pink-900/30' />
            <div className='flex justify-between items-center'>
              <div className='h-8 w-20 rounded-lg bg-gradient-to-r from-purple-900/30 to-pink-900/30' />
              <div className='w-2 h-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full' />
            </div>
          </div>
        </div>
      );
    }