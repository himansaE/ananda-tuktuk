export function Footer() {
  return (
    <footer className="bg-primary dark:bg-inverse-surface w-full py-20 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-[1280px] mx-auto px-6 md:px-16">
        {/* About column */}
        <div className="col-span-1 md:col-span-2 mb-8 md:mb-0 pr-8">
          <span className="font-display text-3xl font-extrabold text-secondary-fixed block mb-6 uppercase tracking-tight">
            Ananda&apos;s Tuk Ride
          </span>
          <p className="font-sans text-lg text-on-primary dark:text-inverse-on-surface opacity-90 max-w-md leading-relaxed">
            Guided by Passion, Driven by Heart. Experience the true essence of Sri Lanka with a local who cares.
          </p>
          <div className="mt-8">
            <p className="font-sans text-sm text-on-primary/70">
              © {new Date().getFullYear()} Ananda&apos;s Tuk Ride. All rights reserved.
            </p>
          </div>
        </div>

        {/* Explore column */}
        <div className="col-span-1">
          <h4 className="font-bold text-lg text-secondary-fixed mb-6 uppercase tracking-wider">Explore</h4>
          <ul className="space-y-4">
            <li>
              <a className="font-sans text-on-primary/80 hover:text-white transition-colors hover:translate-x-2 inline-block duration-300" href="#">
                Local Customs
              </a>
            </li>
            <li>
              <a className="font-sans text-on-primary/80 hover:text-white transition-colors hover:translate-x-2 inline-block duration-300" href="#">
                Safety Guide
              </a>
            </li>
            <li>
              <a className="font-sans text-on-primary/80 hover:text-white transition-colors hover:translate-x-2 inline-block duration-300" href="#">
                Sri Lanka Travel Tips
              </a>
            </li>
            <li>
              <a className="font-sans text-on-primary/80 hover:text-white transition-colors hover:translate-x-2 inline-block duration-300" href="#">
                Ananda&apos;s Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Connect column */}
        <div className="col-span-1">
          <h4 className="font-bold text-lg text-secondary-fixed mb-6 uppercase tracking-wider">Connect</h4>
          <ul className="space-y-4">
            <li>
              <a className="font-sans text-on-primary/80 hover:text-white transition-colors hover:translate-x-2 inline-block duration-300" href="#">
                Contact Us
              </a>
            </li>
            <li>
              <a className="font-sans text-on-primary/80 hover:text-white transition-colors hover:translate-x-2 inline-block duration-300" href="#">
                Book a Ride
              </a>
            </li>
            <li>
              <a className="font-sans text-on-primary/80 hover:text-white transition-colors hover:translate-x-2 inline-block duration-300" href="#">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
