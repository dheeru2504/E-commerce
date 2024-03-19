import React from 'react'
import Layout from '../components/layouts/Layout'
import Cancellation from './FAQ/Cancellation';
import Common from './FAQ/Common';
import Return from './FAQ/Return';

const Faqs = () => {

    return (
        <Layout title={"Frequently Asked Questions"}>
            <div className='container_section'>
                <h3 className='d-flex justify-content-center pt-2 pb-3' >FAQs</h3>
                <Common />

                <h3 className='pt-5 pb-3'>Cancellation :</h3>
                <Cancellation />

                <h3 className='pt-5 pb-3'>Return & Refunds :</h3>
                <Return />
            </div>
        </Layout>
    )
}

export default Faqs;