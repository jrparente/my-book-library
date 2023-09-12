import React from "react";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import Head from "next/head";

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
            The Story Behind My Book Library
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Connecting bibliophiles with an organized, enriching experience.
          </p>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            What We Offer
          </h2>
          <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
            My Book Library is designed to be your ultimate resource for
            managing your book collection. From cataloging to loan tracking,
            we've got you covered.
          </p>
        </div>
      </section>

      {/* Why We Created This Project Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Why We Created This Project
          </h2>
          <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
            We believe in the power of literature to enrich lives. This project
            is our way of contributing to a community that shares our love for
            books.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
