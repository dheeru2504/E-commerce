import React from 'react'
const returnFaq = [
    {
        id: 'return_1',
        question: 'Can I return an item I purchased online?',
        answer: 'Yes, most items purchased from H Square Decor can be returned within 7 days of receipt, provided they are in new, unused condition and include all original packaging and accessories.',
    },
    {
        id: 'return_2',
        question: 'Are there any items that cannot be returned?',
        answer: 'Custom-made or personalized items, items marked as final sale, and items that have been used, altered, or damaged are not eligible for return.',
    },
    {
        id: 'return_3',
        question: 'How do I initiate a return?',
        answer: 'To initiate a return, please contact our customer service team at helpinghendd@gmail.com with your order number and the reason for the return. We will provide you with a return authorization and instructions on how to proceed.',
    },
    {
        id: 'return_4',
        question: 'Who covers the return shipping costs?',
        answer: 'The customer is responsible for return shipping costs unless the return is due to a defect or an error on our part.',
    },
    {
        id: 'return_5',
        question: 'How and when will I receive my refund?',
        answer: 'Refunds will be processed to the original payment method within 7-10 business days after we receive and verify the returned item. Please note that shipping fees are non-refundable unless the return is due to a defect or an error on our part.',
    },
    {
        id: 'return_6',
        question: 'Can I exchange an item?',
        answer: 'If you wish to exchange an item, please return the original item following our return process and place a new order for the item you want.',
    },
    {
        id: 'return_7',
        question: 'What should I do if I receive a damaged or incorrect item?',
        answer: 'If you receive a damaged or incorrect item, please contact us at helpinghendd@gmail.com within 48 hours of delivery with a description and photos of the issue. We will address the problem as quickly as possible.',
    },
    {
        id: 'return_8',
        question: 'Do I need to use a specific shipping method for returns?',
        answer: 'We recommend using a trackable shipping method to ensure your item arrives safely at our facility. Please follow the instructions provided in your return authorization for specific shipping guidelines.',
    },
    {
        id: 'return_9',
        question: 'How can I check the status of my return or refund?',
        answer: 'You can check the status of your return or refund by contacting our customer service team at helpinghendd@gmail.com. Please include your order number for reference.',
    },

];
const Return = () => {
    return (
        <div className="accordion" id="accordionExample">
            {
                returnFaq.map((item) => (
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

export default Return