import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:grid-cols-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Next<span className="text-blue-500">Commerce</span>
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Modern eCommerce platform powered by Next.js, Sanity CMS and
              Stripe.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Shop</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>Products</li>
              <li>Categories</li>
              <li>New Arrivals</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Support</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>Contact</li>
              <li>FAQs</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Newsletter</h3>
            <p className="mt-3 text-sm text-gray-600">
              Get updates about our latest products.
            </p>
            <div className="flex items-center gap-4 mt-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaGithub size={22} />
            </a>

            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition"
            >
              <MdEmail size={22} />
            </a>
          </div>
          
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">
          © 2026 NexCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
