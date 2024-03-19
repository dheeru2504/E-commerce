import React from 'react'
import Layout from '../components/layouts/Layout'

const ReturnPolicy = () => {
    return (
        <Layout title={"Return Policy"}>
            <div className="container_section align-items-center justify-content-center">
                <div class="row  contactus ">

                    <h1 className="text-center"> Return Policy</h1>
                    <p>At H Square Decor, your satisfaction is our top priority. We understand that sometimes an item may not meet your expectations, and we want to ensure a smooth and hassle-free return process.</p>
                    <p className='fw-bold'>Return Eligibility</p>
                    <p>Most items purchased from H Square Decor can be returned within 7 days of receipt, provided they are in new and unused condition, with all original packaging, tags, and accessories included.</p>
                    <p>The following items are not eligible for return:</p>
                    <ul>
                        <li>Custom-made or personalized items</li>
                        <li>Items marked as final sale or non-returnable</li>
                        <li>Items that have been used, altered, or damaged</li>
                    </ul>
                    <p className='fw-bold'>How to Return</p>
                    <p>To initiate a return, please follow these steps:</p>
                    <ol>
                        <li>Contact our customer service team at hsqauredecor@gmail.com to request a return authorization. Please include your order number and the reason for the return.</li>
                        <li>Once your return is authorized, you will receive instructions on how to ship the item back to us. Please note that you are responsible for the return shipping costs unless the return is due to a defect or an error on our part.</li>
                        <li>Pack the item securely in its original packaging and include a copy of the return authorization email.</li>
                        <li>Ship the item using a trackable shipping method to the address provided by our customer service team.</li>
                    </ol>
                    <p className='fw-bold'>Refunds</p>
                    <p>Once we receive your returned item and verify its condition, we will process your refund. Refunds will be credited to the original payment method within 7-10 business days. Please note that shipping fees are non-refundable unless the return is due to a defect or an error on our part.</p>
                    <p className='fw-bold'>Exchanges</p>
                    <p>If you wish to exchange an item, please follow the return process to return the original item and place a new order for the item you would like instead.</p>
                    <p className='fw-bold'>Damaged or Incorrect Items</p>
                    <p>If you receive a damaged or incorrect item, please contact us at hsqauredecor@gmail.com within 48 hours of delivery with a description and photos of the issue. We will work with you to resolve the issue as quickly as possible.</p>
                    <p className='fw-bold'>Contact Us</p>
                    <p>If you have any questions or concerns about our return policy or need assistance with a return, please contact us at hsqauredecor@gmail.com. We are here to help!</p>


                </div>
            </div>
        </Layout>
    )
}

export default ReturnPolicy