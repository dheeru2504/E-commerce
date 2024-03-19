import React from 'react'

const faq = [
    {
        "id": "cancel_1",
        "question": "How can I cancel my order?",
        "answer": "<p>You can cancel your order before it has been processed by the brand/seller. We'll refund the full amount you've paid for such a cancellation. Here's how to cancel your order:</p><ul><li>Log in to your account and go to My Account</li><li>Select the appropriate order from Recent Orders</li><li>Click on ‘Cancel Order’ for the items you want to cancel, individually</li><li>Select the reason and confirm the cancellation</li></ul><p>Once you're done, we'll send you an acknowledgement of the cancellation within 24hr. Remember, you won’t be able to cancel an order after it has been processed by the brand/seller.</p>"
    },

    {
        "id": "cancel_2",
        "question": "When can I cancel my order?",
        "answer": "Make sure you cancel your order before it has been processed by the brand/seller. That's the only way we can refund the full amount you've spent."
    },
    {
        "id": "cancel_3",
        "question": "Can I cancel only part of my order?",
        "answer": "Yes you can. You can individually cancel products in your bag before your order is processed by the brand/seller. Go to Order in the My Account section to cancel products."
    },
    {
        "id": "cancel_4",
        "question": "Why do I see a disabled cancel link?",
        "answer": "That means the products from your order have already been shipped and you can't make any cancellations now."
    },
    {
        "id": "cancel_5",
        "question": "How will I get my refund when I cancel an oder?",
        "answer": "Once your order has been cancelled, it will take 3-4 business days for your refund to be processed and the amount to be transferred back to the source account. In the case of certain public sector banks, it can take up to 10-15 working days."
    },
    {
        "id": "cancel_6",
        "question": "Will I get complete refund for the order I've cancelled?",
        "answer": "Yes. We'll refund the entire amount for a cancelled order."
    },
    {
        "id": "cancel_7",
        "question": "What should I do if I don't get my refund in the promised time?",
        "answer": "Make sure you cancel your order before it has been processed by the brand/seller. That's the only way we can refund the full amount you've spent."
    },
    {

        "id": "cancel_8",
        "question": "When can I cancel my order?",
        "answer": "We work quickly to make sure your refund gets to you on time.On the off-chance that it's been delayed,please goto contact section and mail us the issue with the order id, we will contact you if any issue is there else will refund you"
    },
    {
        "id": "cancel_9",
        "question": "This is not what I ordered. How do I replace it?",
        "answer": "Make sure you cancel your order before it has been processed by the brand/seller. That's the only way we can refund the full amount you've spent."
    },
    {
        "id": "cancel_10",
        "question": "Why my order cancelled by H Square Decor",
        "answer": "Sometimes our sellers cancel orders for various reasons – the product could be out-of-stock, of unacceptable quality, etc. Once an order has been cancelled, the refund will be processed immediately. In all it will take 3-4 business days for your refund to be processed and the amount to be transferred back to the source account. In the case of certain public sector banks, it can take up to 10-15 working days."
    },

]

const Cancellation = () => {
    return (

        <div id='complains'>


            <div className="accordion" id="accordionExample">
                {
                    faq.map((item) => (
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

        </div>
    )
}

export default Cancellation