import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions</title>
      </Head>
      <Header />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Terms and Conditions
          </h1>
          <div className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            <h2 className="font-semibold text-2xl my-4">Introduction</h2>
            <p>
              These Terms and Conditions govern your use of our service and
              constitute a legal agreement between you and My Book Library.
            </p>

            <h2 className="font-semibold text-2xl my-4">Usage Rules</h2>
            <p>
              You may not use the service for any unlawful or prohibited
              activities. You are responsible for your own actions while using
              our service.
            </p>

            <h2 className="font-semibold text-2xl my-4">
              Account Responsibility
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account and password.
            </p>

            <h2 className="font-semibold text-2xl my-4">Termination</h2>
            <p>
              We reserve the right to terminate your account and access to our
              services if we determine that you have violated these terms.
            </p>

            <h2 className="font-semibold text-2xl my-4">
              Limitation of Liability
            </h2>
            <p>
              My Book Library will not be liable for any indirect,
              consequential, or incidental damages arising out of or in
              connection with your use of our service.
            </p>

            <h2 className="font-semibold text-2xl my-4">
              Changes to These Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. It is your
              responsibility to review these terms regularly.
            </p>

            <h2 className="font-semibold text-2xl my-4">Contact Us</h2>
            <p>
              If you have any questions or concerns regarding these Terms and
              Conditions, please contact us.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
