import React from 'react'
import bgYellow from '../../../public/images/bgYellow.png'
import Image from 'next/image'
import { payment } from '@/data/constant'

const PaymentPage = () => {
  return (
    <div className='w-full h-full bg-[#e3ef53]  pt-28 pb-18 relative mt-24'>
    <Image src={bgYellow} fill className='object-cover' alt=''></Image>
        <div className='max-w-7xl flex justify-center  mx-auto space-x-20'>
            <div className='w-1/4'>
              <div className="py-2 px-4 w-1/3 bg-[#c7d249] text-center font-semibold text-[13px]">ESTIMATE</div>
              <p className='py-8 text-6xl font-semibold'>YOUR <span className='block py-2'>PAYMENT</span> ESTIMATE</p>
            </div>

            <div className='w-3/5'>
              <form action="" className='w-full flex flex-wrap justify-between space-y-4'>
                <div className='w-1/2 '>
                  <label htmlFor="purchasePrice" className="text-sm block pb-2 font-semibold">PURCHASE PRICE :</label>
                  <input type="number" id="purchasePrice" name="purchasePrice" placeholder="Enter Purchase Price" className='border w-11/12  px-2 py-4'/>
                </div>
                <div  className='w-1/2'>
                  <label htmlFor="downPayment" className="text-sm block pb-2 font-semibold">DOWN PAYMENT:</label>
                  <input type="number" id="downPayment" name="downPayment" placeholder="Enter Down Payment"  className='border w-11/12  px-2 py-4'/>
                </div>  
                <div  className='w-1/2 my-4'>
                  <label htmlFor="loantermYear" className="text-sm block pb-2 font-semibold">LOAN TERM YEAR %:</label>
                  <input type="number" id="loantermYear" name="loantermYear" placeholder="Enter Loan Term Year " className='border w-11/12 px-2 py-4'/>
                </div>
                <div  className='w-1/2 my-4'>
                  <label htmlFor="interestRate" className="text-sm block pb-2 font-semibold">INTEREST RATE %:</label>
                  <input type="number" id="interestRate" name="interestRate" placeholder="Enter Interest Rate" className='border w-11/12  px-2 py-4'/>
                </div>
              </form>
              
              <button className='bg-black py-4 px-8 my-10 text-white text-md font-semibold'>Estimate Payment</button>
            </div>

            <div className='w-1/5 bg-white border text-center space-y-10 py-10 h-full'>
            {
              payment.map((payment,index)=>(
              <div key={index}>
                <p className='text-[12px] text-gray-700'>{payment.title}:</p>
                <strong className='text-2xl'>${payment.amount}</strong>
              </div>  
              ))
            }
              
            </div>
        </div>
    </div>
  )
}

export default PaymentPage
