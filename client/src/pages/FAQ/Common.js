import React from 'react'
const commonFaq = [
    {
        id: 'common_1',
        question: 'How do I track my order?',
        answer: 'Once your order has shipped, you will receive an email with a tracking number and a link to track your package. You can also find tracking information in your order history under "My Account".',
    },
    {
        id: 'common_2',
        question: 'What is your return policy?',
        answer: 'We offer a 7-day return policy for items in their original condition. Please visit our Returns Policy for detailed instructions on how to return or exchange an item.',
    },
    {
        id: 'common_3',
        question: 'How can I cancel my order?',
        answer: 'You can cancel your order untill it is not processed. Please go to "My Orders" in your account to see if the order can still be modified. If it’s beyond the allowed time, please contact our customer service for assistance.',
    },
    {
        id: 'common_4',
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary depending on the destination. Please visit our Shipping Information page for more details.',
    },
    {
        id: 'common_5',
        question: 'How can I make a payment?',
        answer: 'We accept various payment methods including credit/debit cards, PayPal and UPI. All payments are processed securely.',
    },
    {
        id: 'common_6',
        question: 'What should I do if I receive a damaged item?',
        answer: 'If you receive a damaged item, please contact our customer service within 48 hours of delivery with your order number, the item’s name, and photos of the damage. We will arrange for a replacement or refund as quickly as possible.',
    },
    {
        id: 'common_7',
        question: 'How do I create an account?',
        answer: 'You can create an account by clicking on the "Sign Up" link at the top of our homepage. Fill in the required information and follow the steps to complete your registration.',
    },
];
const Common = () => {
    return (
        <div className="accordion" id="accordionExample">
            {
                commonFaq.map((item) => (
                    <div className="accordion-item" key={item.id}>
                        <h2 className="accordion-header" id={`heading${item.id}`}>
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${item.id}`}
                                aria-expanded="false"
                                aria-controls={`collapse${item.id}`}
                            >
                                {item.question}
                            </button>
                        </h2>
                        <div
                            id={`collapse${item.id}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`heading${item.id}`}
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Common