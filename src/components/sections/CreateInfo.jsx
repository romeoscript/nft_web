import React from 'react'

const CreateInfo = () => {
    return (
        <section className='grid md:grid-cols-3 place-items-center py-[4rem] sm:grid-cols-2 grid-cols-1 '>
            <div className="card w-96 bg-primary-focus text-primary-content" style={{background:'#0F182'}}>
                <div className="card-body">
                    <h2 className="card-title">Card title!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-primary-focus text-primary-content" style={{background:'#0F182'}}>
                <div className="card-body">
                    <h2 className="card-title">Card title!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-primary-focus text-primary-content" style={{background:'#0F182'}}>
                <div className="card-body">
                    <h2 className="card-title">Card title!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn">Buy Now</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateInfo