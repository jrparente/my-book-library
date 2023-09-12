import React from "react";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import Head from "next/head";
import Link from "next/link";

const About = () => {
  return (
    <>
      <Head>
        <title>About My Book Library</title>
      </Head>
      <Header />

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Your Journey Through the Pages Starts Here
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Unveil the tale of how My Book Library became the sanctuary for book
            enthusiasts.
          </p>
        </div>
      </section>

      {/* The Quest for Organization Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            The Quest for Organization
          </h2>
          <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
            Remember that time you couldn&apos;t locate your favorite novel
            amidst the labyrinth of your bookshelf? We&apos;ve been there, and
            that&apos;s why My Book Library was born — to end the chaos and
            bring order to your literary universe.
          </p>
        </div>
      </section>

      {/* The Chronicle of Features Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            The Chronicle of Tools
          </h2>
          <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
            From{" "}
            <Link
              href="/features"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
            >
              cataloging your collection
            </Link>{" "}
            to keeping tabs on loaned reads, we provide a suite of tools that
            cater to every bibliophile&apos;s needs.
          </p>
        </div>
      </section>

      {/* Our Covenant Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Covenant
          </h2>
          <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
            At the heart of My Book Library is a pact with our community. We vow
            to continually evolve, ensuring you&apos;re equipped with the finest
            features to celebrate your love for literature. Our{" "}
            <Link
              href="/contact"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
            >
              doors are always open for feedback
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
