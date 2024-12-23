import React from "react";

const FAQs = () => {
  return (
    <section className="faqs bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((faq) => (
            <details
              key={faq}
              className="collapse collapse-arrow bg-white shadow"
            >
              <summary className="collapse-title text-xl font-medium">
                FAQ Question {faq}
              </summary>
              <div className="collapse-content">
                <p>This is the answer to FAQ {faq}.</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
