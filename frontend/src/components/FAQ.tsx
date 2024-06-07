/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
    faq: any;
    index: any;
    toggleFAQ: any;
  }

const FAQ = ({ faq, index, toggleFAQ }:Props) => {
  return (
    <div
      className={"faq " + (faq.open ? "open" : "")}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className="faq-question">{faq.question}</div>
      <div className="faq-answer">{faq.answer}</div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;
