import Link from "next/link";
import ContactForm from "@/components/contact-form";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-linear-to-r from-pink-100 to-pink-300 p-8 md:p-14">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-800">
                    Contact Us
                </h1>

                <p className="mt-2 text-gray-600">
                    Have questions or feedback? We&apos;d love to hear from you!
                </p>

                <div className="mt-8 grid grid-cols-1 gap-8 rounded-2xl border-2 bg-white p-6 shadow-lg md:grid-cols-2">
                    {/* Contact Information */}
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold text-black">
                            Contact Info
                        </h2>

                        <div className="flex flex-col gap-4 text-gray-700">
                            <div>
                                <p className="font-bold text-black">Email</p>
                                <Link
                                    href="mailto:contact@example.com"
                                    className="text-blue-600 hover:underline"
                                >
                                    contact@example.com
                                </Link>
                            </div>

                            <div>
                                <p className="font-bold text-black">Phone</p>
                                <Link
                                    href="tel:+910000000000"
                                    className="text-blue-600 hover:underline"
                                >
                                    +91 00000 00000
                                </Link>
                            </div>

                            <div>
                                <p className="font-bold text-black">Address</p>
                                <p>India</p>
                            </div>
                        </div>
                    </section>

                    {/* Message Form */}
                    <section>
                        <h2 className="text-2xl font-bold text-black">
                            Message
                        </h2>

                        <ContactForm />
                    </section>
                </div>
            </div>
        </main>
    );
}