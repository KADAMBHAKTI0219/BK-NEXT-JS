import React from 'react'
import bgYellow from '../../../public/images/bgYellow.png'
import Image from 'next/image'
import { payment } from '@/data/constant'

const PaymentPage = () => {
  return (
    <div className='w-full h-full bg-[#e3ef53] relative top-0 py-36'>
    <Image src={bgYellow} fill className='object-cover' alt=''></Image>
        <div className='max-w-7xl flex justify-content-between content-center  mx-auto'>
            <div className='w-1/3'>
              <div className="py-2 px-4 w-1/2 bg-[#c7d249] text-center">ESTIMATE</div>
              <p className='py-8 text-6xl font-semibold'>YOUR <span className='block py-4'>PAYMENT</span> ESTIMATE</p>
            </div>

            <div className='w-2/3 '>
              <form action="" className='w-full  flex justify-between flex-wrap space-y-4'>
                <div className='w-1/2'>
                  <label htmlFor="purchasePrice" className="text-sm block pb-2 font-semibold">PURCHASE PRICE :</label>
                  <input type="number" id="purchasePrice" name="purchasePrice" placeholder="Enter Purchase Price" className='border-2 w-4/5  px-2 py-4'/>
                </div>
                <div  className='w-1/2'>
                  <label htmlFor="downPayment" className="text-sm block pb-2 font-semibold">DOWN PAYMENT:</label>
                  <input type="number" id="downPayment" name="downPayment" placeholder="Enter Down Payment"  className='border-2 w-4/5  px-2 py-4'/>
                </div>  
                <div  className='w-1/2 my-4'>
                  <label htmlFor="loantermYear" className="text-sm block pb-2 font-semibold">LOAN TERM YEAR %:</label>
                  <input type="number" id="loantermYear" name="loantermYear" placeholder="Enter Loan Term Year " className='border-2 w-4/5  px-2 py-4'/>
                </div>
                <div  className='w-1/2 my-4'>
                  <label htmlFor="interestRate" className="text-sm block pb-2 font-semibold">INTEREST RATE %:</label>
                  <input type="number" id="interestRate" name="interestRate" placeholder="Enter Interest Rate" className='border-2 w-4/5  px-2 py-4'/>
                </div>
                <button className='bg-black py-4 px-8 my-10 text-white text-md font-semibold'>Estimate Payment</button>
              </form>
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
