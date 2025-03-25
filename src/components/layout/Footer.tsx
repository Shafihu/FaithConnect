import { Link } from "react-router-dom";
import {
  Church,
  Mail,
  Calendar,
  Heart,
  ArrowRight,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-faith-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Church className="h-6 w-6 text-faith-300" />
              <span className="text-xl font-serif text-white">
                Faith<span className="text-faith-300">Connect</span>{" "}
                <span className="text-faith-300 text-sm">Kumasi</span>
              </span>
            </Link>
            <p className="text-faith-200 text-sm">
              Connecting hearts to God, building lives on faith, and growing
              together in Christ's love in the heart of Kumasi.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="text-faith-300 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-faith-300 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-faith-300 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-faith-300 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-faith-300 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-faith-200 hover:text-faith-100 transition-colors text-sm flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/sermons"
                  className="text-faith-200 hover:text-faith-100 transition-colors text-sm flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Sermons
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-faith-200 hover:text-faith-100 transition-colors text-sm flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/calendar"
                  className="text-faith-200 hover:text-faith-100 transition-colors text-sm flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Calendar
                </Link>
              </li>
              <li>
                <Link
                  to="/ministries"
                  className="text-faith-200 hover:text-faith-100 transition-colors text-sm flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Ministries
                </Link>
              </li>
              <li>
                <Link
                  to="/home-cells"
                  className="text-faith-200 hover:text-faith-100 transition-colors text-sm flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Home Cells
                </Link>
              </li>
              <li>
                <Link
                  to="/giving"
                  className="text-faith-200 hover:text-faith-100 transition-colors text-sm flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Giving
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-faith-200 hover:text-faith-100 transition-colors text-sm flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-white">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-faith-200">
                <MapPin className="h-5 w-5 text-faith-300 mt-0.5" />
                <span>123 Prempeh II Street, Adum, Kumasi, Ghana</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-faith-200">
                <Phone className="h-5 w-5 text-faith-300" />
                <div className="flex flex-col">
                  <a
                    href="tel:+233302123456"
                    className="hover:text-faith-100 transition-colors"
                  >
                    +233 30 212 3456
                  </a>
                  <a
                    href="tel:+233244987654"
                    className="hover:text-faith-100 transition-colors"
                  >
                    +233 24 498 7654 (Mobile)
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-faith-200">
                <Mail className="h-5 w-5 text-faith-300" />
                <a
                  href="mailto:info@faithconnect-kumasi.com"
                  className="hover:text-faith-100 transition-colors"
                >
                  info@faithconnect-kumasi.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-faith-200">
                <Calendar className="h-5 w-5 text-faith-300 mt-0.5" />
                <div>
                  <p>First Service: 7:30 AM - 9:30 AM</p>
                  <p>Second Service: 10:00 AM - 12:00 PM</p>
                  <p>Youth Service: 2:00 PM - 3:30 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-faith-200">
                <Heart className="h-5 w-5 text-faith-300" />
                <span>Prayer Meeting: Tuesdays & Thursdays 6 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Newsletter</h3>
            <p className="text-faith-200 text-sm mb-4">
              Subscribe to our newsletter to get the latest updates on events,
              sermons, and outreach programs in Kumasi.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-faith-900 border-faith-800 text-white placeholder:text-faith-400"
              />
              <Button className="w-full bg-faith-700 hover:bg-faith-600">
                Subscribe
              </Button>
            </div>
            <div className="mt-4 text-faith-300 text-xs">
              <p>We also broadcast on:</p>
              <p className="mt-1">Peace FM 104.3 - Sundays 6:00 AM</p>
              <p>Luv FM 99.5 - Wednesdays 8:30 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-faith-800 mt-12 pt-6 text-center text-faith-400 text-sm">
          <p>
            © {new Date().getFullYear()} FaithConnect Kumasi. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
