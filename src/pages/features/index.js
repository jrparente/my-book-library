import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import Head from "next/head";
import Link from "next/link";

export default function Features() {
  return (
    <>
      <Head>
        <title>Features - My Book Library</title>
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-white dark:bg-gray-900">
        <section className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Elevate Your Reading Journey
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Unveil a seamless way to catalog, share, and discover your cherished
            collection of literary gems.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md mb-8 lg:mb-16">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Crafted for Bibliophiles
              </h2>
              <p className="text-gray-500 sm:text-xl dark:text-gray-400">
                Unveil the power of an organized book library. Designed to cater
                to avid readers and collectors like you.
              </p>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
              {/* Feature 1: Manage Your Library */}
              <div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">
                  Manage Your Library
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Effortlessly add, remove, and categorize books in your
                  library. Experience the ease of having a digital index for
                  your expansive collection.
                </p>
              </div>

              {/* Feature 2: Loan Tracking */}
              <div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">
                  Loan Tracking
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Keep tabs on books you&apos;ve loaned to friends and family.
                  Receive reminders and notifications, ensuring you never lose
                  track of a borrowed book again.
                </p>
              </div>

              {/* Feature 3: Wishlist Management */}
              <div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">
                  Wishlist Management
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Curate and prioritize books you aim to read or acquire. Manage
                  wishlists by categories, authors, or themes, paving your way
                  to planned reading adventures.
                </p>
              </div>

              {/* Feature 4: Reading Stats */}
              <div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">
                  Reading Stats{" "}
                  <span className="inline-block px-2 py-1 ml-2 text-xs text-white bg-red-500 rounded">
                    Coming Soon
                  </span>
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get insights into your reading habits with statistics. Track
                  time spent, genres explored, and authors read, all visualized
                  in intuitive charts.
                </p>
              </div>

              {/* Feature 5: Book Recommendations */}
              <div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">
                  Book Recommendations{" "}
                  <span className="inline-block px-2 py-1 ml-2 text-xs text-white bg-red-500 rounded">
                    Coming Soon
                  </span>
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive personalized book suggestions based on your reading
                  history and preferences. Discover hidden gems and expand your
                  literary horizons.
                </p>
              </div>

              {/* Feature 6: Cloud Sync */}
              <div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">
                  Cloud Sync
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Access your library on multiple devices with cloud
                  synchronization. Your catalog travels with you, making it
                  accessible anytime, anywhere.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-900">
          <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
            {/* You can replace the &apos;src&apos; with the actual image URLs */}
            {/* <img
              className="w-full dark:hidden"
              src="/path/to/light-mode-image.svg"
              alt="dashboard image"
            />
            <img
              className="w-full hidden dark:block"
              src="/path/to/dark-mode-image.svg"
              alt="dashboard image"
            /> */}
            <div className="mt-4 md:mt-0">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Transform Your Book Management Experience
              </h2>
              <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                My Book Library enriches your reading journey by providing
                robust tools to catalog, share, and discover books effortlessly.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900"
              >
                Get Started
                {/* SVG icon */}
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
