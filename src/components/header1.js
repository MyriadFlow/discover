import React from 'react'

const Header1 = () => {
  return (
    <div className="px-10" style={{display:'flex', justifyContent: 'space-between'}}>
        <div className='mt-4'>
            <img src="./logo.png" style={{width:'200px'}}/>
        </div>
        <div style={{display:'flex', gap:'40px', fontSize:'20px'}} className="font-bold mt-10">
<div>Explore</div>
<div>Collections</div>
<div>Brand</div>
<div>Dashboard</div>
        </div>
        <div>
            <button className="bg-black px-10 mt-10" style={{color: "white", paddingTop:'5px', paddingBottom:'5px', borderRadius:'5px'}}>Connect</button>
        </div>
    </div>
  )
}

export default Header1