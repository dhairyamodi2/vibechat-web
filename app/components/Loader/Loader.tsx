'use client'
import {ThreeCircles} from "react-loader-spinner";

export const Loader = function() {

    return <div className='loader'><ThreeCircles
        height="100"
        width="100"
        color={'purple'}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
    /></div>
}