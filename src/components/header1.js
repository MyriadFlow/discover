"use client"
import React, {useState, useEffect} from 'react'

const Header1 = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="px-10"
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      background: isScrolled ? 'black' : 'transparent',
      transition: 'background 0.3s ease-in-out',
      color: isScrolled ? 'white' : 'black',
        paddingBottom: '10px'
    }}>
        <div className='mt-4'>
            <img src={isScrolled ? "./logo2.png" : "./logo.png"} 
            style={{width:'200px'}}/>
        </div>
        <div style={{display:'flex', gap:'40px', fontSize:'20px'}} className="font-bold mt-10">
<div>Explore</div>
<div>Collections</div>
<div>Brand</div>
<div>Dashboard</div>
        </div>
        <div className="mt-10">
            {/* <button className="px-10 mt-10" style={{paddingTop:'5px', paddingBottom:'5px', borderRadius:'5px',
              background: isScrolled ? 'white' : 'black',
              color: isScrolled ? 'black' : 'white',
            }}>Connect</button> */}
            <w3m-button />
        </div>
    </div>
  )
}

export default Header1