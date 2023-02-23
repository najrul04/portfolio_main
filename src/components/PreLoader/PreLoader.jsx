import React, { useEffect } from 'react';
import { Dna } from 'react-loader-spinner';
import { preLoaderAnim } from '../Animation';
import './PreLoader.css';

const PreLoader = () => {

    useEffect(() => {
      preLoaderAnim()
    }, [])
    
    return (
        <div className="preloader">
            <div className="texts-container">
            <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            />
            {/* <img src={Me} alt="AboutPicture" /> */}
            </div>
        </div>
    );
};

export default PreLoader;