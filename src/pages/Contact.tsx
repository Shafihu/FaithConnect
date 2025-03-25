"use client";

import type React from "react";

import { useState } from "react";
import {
  Church,
  Mail,
  Phone,
  Clock,
  Calendar,
  Heart,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/ui/section-heading";
import { toast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    prayerRequest: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description:
          "We've received your message and will get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        prayerRequest: false,
      });
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-faith-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/contact-hero.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-faith-950/90 to-faith-800/70" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 animate-slide-up">
              Get in Touch
            </h1>
            <p className="text-xl text-white/80 animate-fade-in animate-delay-200">
              We'd love to hear from you. Reach out with questions, prayer
              requests, or to learn more about our church community in Kumasi.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Information */}
            <div>
              <SectionHeading
                subtitle="Reach Out"
                title="Contact Information"
                align="left"
              />

              <div className="space-y-8 mt-8">
                <div className="flex gap-4">
                  <div className="bg-faith-100 rounded-full p-3 h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <Church className="h-6 w-6 text-faith-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-faith-900 mb-1">
                      Our Location
                    </h3>
                    <p className="text-faith-600">
                      123 Prempeh II Street, Adum, Kumasi, Ghana
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-faith-100 rounded-full p-3 h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-faith-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-faith-900 mb-1">
                      Email Us
                    </h3>
                    <p className="text-faith-600">
                      <a
                        href="mailto:info@faithconnect-kumasi.com"
                        className="hover:text-faith-700 underline"
                      >
                        info@faithconnect-kumasi.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-faith-100 rounded-full p-3 h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-faith-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-faith-900 mb-1">
                      Call Us
                    </h3>
                    <p className="text-faith-600">
                      <a
                        href="tel:+233302123456"
                        className="hover:text-faith-700 underline"
                      >
                        +233 30 212 3456
                      </a>
                    </p>
                    <p className="text-faith-600 mt-1">
                      <a
                        href="tel:+233244987654"
                        className="hover:text-faith-700 underline"
                      >
                        +233 24 498 7654
                      </a>{" "}
                      (Mobile)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-faith-100 rounded-full p-3 h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-faith-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-faith-900 mb-1">
                      Office Hours
                    </h3>
                    <p className="text-faith-600">
                      Monday - Friday: 8:00 AM - 4:00 PM
                    </p>
                    <p className="text-faith-600">
                      Saturday: 9:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-faith-100 rounded-full p-3 h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-faith-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-faith-900 mb-1">
                      Sunday Services
                    </h3>
                    <p className="text-faith-600">
                      First Service: 7:30 AM - 9:30 AM
                    </p>
                    <p className="text-faith-600">
                      Second Service: 10:00 AM - 12:00 PM
                    </p>
                    <p className="text-faith-600">
                      Youth Service: 2:00 PM - 3:30 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="mt-10 rounded-xl overflow-hidden shadow-lg border border-faith-100 h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31693.32371185347!2d-1.6367024!3d6.6985394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb96f349e85efd%3A0xb8d1e0b88af1f0f5!2sAdum%2C%20Kumasi!5e0!3m2!1sen!2sgh!4v1716644891!5m2!1sen!2sgh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Church location in Kumasi, Ghana"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <SectionHeading
                subtitle="Send a Message"
                title="Get in Touch"
                description="Fill out the form below and we'll get back to you as soon as possible."
                align="left"
              />

              <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-faith-900"
                    >
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Kwame Mensah"
                      required
                      className="border-faith-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-faith-900"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="kwame@example.com"
                      required
                      className="border-faith-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-faith-900"
                    >
                      Phone Number (Optional)
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+233 24 123 4567"
                      className="border-faith-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-faith-900"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                      className="border-faith-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-faith-900"
                  >
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={5}
                    required
                    className="border-faith-200 resize-none"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="prayerRequest"
                    name="prayerRequest"
                    checked={formData.prayerRequest}
                    onChange={handleCheckboxChange}
                    className="mt-1"
                  />
                  <label
                    htmlFor="prayerRequest"
                    className="text-sm text-faith-700"
                  >
                    This is a prayer request. Please keep it confidential.
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-faith-700 hover:bg-faith-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 md:py-24 bg-faith-50">
        <div className="container px-4 md:px-6">
          <SectionHeading
            subtitle="Join Us"
            title="How to Get Involved"
            description="There are many ways to connect with our church community in Kumasi."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl shadow-sm border border-faith-100 p-6 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-faith-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-faith-700" />
              </div>
              <h3 className="text-xl font-medium text-faith-900 mb-2">
                Join a Home Cell
              </h3>
              <p className="text-faith-600 mb-4">
                Connect with others in your neighborhood for fellowship, Bible
                study, and prayer in a more intimate setting.
              </p>
              <Button
                variant="outline"
                className="border-faith-200 text-faith-700 hover:bg-faith-50"
              >
                Find a Home Cell
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-faith-100 p-6 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-faith-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-faith-700" />
              </div>
              <h3 className="text-xl font-medium text-faith-900 mb-2">
                Volunteer
              </h3>
              <p className="text-faith-600 mb-4">
                Serve alongside others in various ministries that fit your
                gifts, talents, and availability to impact our community.
              </p>
              <Button
                variant="outline"
                className="border-faith-200 text-faith-700 hover:bg-faith-50"
              >
                Serve with Us
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-faith-100 p-6 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-faith-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-faith-700" />
              </div>
              <h3 className="text-xl font-medium text-faith-900 mb-2">
                Attend an Event
              </h3>
              <p className="text-faith-600 mb-4">
                Join us for worship services, Bible studies, or special
                community outreach events in Kumasi.
              </p>
              <Button
                variant="outline"
                className="border-faith-200 text-faith-700 hover:bg-faith-50"
              >
                View Calendar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
