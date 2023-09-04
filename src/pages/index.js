import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Welcome to My Book Library
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Your one-stop solution for managing, sharing, and discovering books.
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-blue-600"
              href="/signup"
            >
              Sign Up
            </Link>
            <Link
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-blue-600"
              href="/login"
            >
              Sign In
            </Link>
          </div>
        </div>

        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md mb-8 lg:mb-16">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Features
              </h2>
              <p className="text-gray-500 sm:text-xl dark:text-gray-400">
                Your one-stop solution for managing, sharing, and discovering
                books.
              </p>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
              <div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">
                  Manage your book collection
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Easily add, remove, and categorize your books.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">
                  Keep track of loaned books
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Never forget who has your books with our loan tracker.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">
                  Create a wishlist
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Plan your next reading adventure with a wishlist.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
                Start your organizing your library
              </h2>
              <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
                Try My Book Library for free. No credit card required.
              </p>
              <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <Link
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-blue-600"
                  href="/signup"
                >
                  Sign Up
                </Link>
                <Link
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-blue-600"
                  href="/login"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
