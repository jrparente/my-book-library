import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <Header />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <div className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            <h2 className="font-semibold text-2xl my-4">Introduction</h2>
            <p>
              We take your privacy very seriously and are committed to
              protecting it. This Privacy Policy outlines what information we
              collect, how we use it, and the steps we take to safeguard it.
            </p>

            <h2 className="font-semibold text-2xl my-4">
              What Data We Collect
            </h2>
            <p>
              We collect information that you provide directly to us, such as
              your name, email address, and any other information you choose to
              provide.
            </p>

            <h2 className="font-semibold text-2xl my-4">
              How We Use Your Data
            </h2>
            <p>
              We use the information we collect to operate, maintain, and
              improve our services. We do not share your information with third
              parties without your explicit consent.
            </p>

            <h2 className="font-semibold text-2xl my-4">Cookies</h2>
            <p>
              We use cookies to improve user experience. You have the option to
              disable cookies in your browser settings.
            </p>

            <h2 className="font-semibold text-2xl my-4">Security</h2>
            <p>
              We take reasonable measures to protect your information. However,
              no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="font-semibold text-2xl my-4">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page.
            </p>

            <h2 className="font-semibold text-2xl my-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
