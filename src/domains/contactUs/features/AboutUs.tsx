import React from "react";

export const AboutUs = () => {
  return (
    <div className="py-10 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          About Us - <span className="text-indigo-600">Barchinet</span>
        </h1>
        <p className="text-lg leading-relaxed text-gray-700">
          At Barchinet, architecture goes beyond creating buildings—it&apos;s the art
          of weaving stories into spaces, connecting people, cultures, and ideas
          in harmonious unity. As the leading global platform uniting architects
          and clients, we offer a fully online ecosystem where projects
          transcend limitations and take form, from initial vision to final
          realization, no matter their scale or complexity.
        </p>

        {/* Mission Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            Barchinet is on a mission to revolutionize architectural design by
            empowering architects and unlocking access to sophisticated,
            world-class design solutions for clients everywhere. We foster
            innovation, nurture collaboration, and inspire creativity across
            borders and beyond boundaries.
          </p>
        </section>

        {/* Who We Are Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">Who We Are</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            Barchinet was born from the minds of architects and technology
            innovators whose expertise in digital platforms and design solutions
            shaped the foundation of the platform. Our platform is a bridge—
            connecting visionary architects with clients seeking bold,
            custom-tailored designs. Whether breathing new life into homes or
            shaping cutting-edge commercial spaces, Barchinet simplifies the
            journey, ensuring flawless communication, exceptional quality, and
            unparalleled client satisfaction.
          </p>
        </section>

        {/* Why Choose Barchinet */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">Why Choose Barchinet?</h2>
          <ul className="mt-6 space-y-6">
            <li className="flex items-start">
              <span className="text-indigo-600 text-xl font-bold mr-4">•</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Global Vision, Local Expertise
                </h3>
                <p className="mt-2 text-gray-700">
                  Partner with architects who blend international design trends
                  with local regulations and draw on cultural insights to create
                  designs that harmonize global aesthetics with the unique essence
                  of each location.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 text-xl font-bold mr-4">•</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Bespoke Design Pathways
                </h3>
                <p className="mt-2 text-gray-700">
                  Explore rich portfolios, engage directly with architects, and
                  select the perfect fit for your aesthetic and financial
                  framework.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 text-xl font-bold mr-4">•</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Effortless Project Flow
                </h3>
                <p className="mt-2 text-gray-700">
                  Our platform guarantees transparency and efficiency with
                  digital contracts that clearly outline project milestones,
                  responsibilities, and timelines.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 text-xl font-bold mr-4">•</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Unmatched Support
                </h3>
                <p className="mt-2 text-gray-700">
                  Gain access to 24/7 expert assistance, real-time project
                  updates, and personalized guidance every step of the way.
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* Our Values */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
          <ul className="mt-6 space-y-6">
            <li className="flex items-start">
              <span className="text-indigo-600 text-xl font-bold mr-4">•</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Pioneering Creativity
                </h3>
                <p className="mt-2 text-gray-700">
                  We celebrate bold visions and innovative design that reshapes
                  the architectural landscape.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 text-xl font-bold mr-4">•</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Excellence and Trust
                </h3>
                <p className="mt-2 text-gray-700">
                  Our architects undergo meticulous vetting to ensure they
                  exemplify the highest standards of skill, professionalism, and
                  integrity.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 text-xl font-bold mr-4">•</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Client-Centered Craftsmanship
                </h3>
                <p className="mt-2 text-gray-700">
                  We prioritize the unique essence of every project, delivering
                  personalized experiences that bring our clients&apos; dreams to life.
                </p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
