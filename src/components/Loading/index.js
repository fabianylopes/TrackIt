import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loading({ color }){
    return (
        <Loader type="ThreeDots" color={color} height={50} width={50} />
    );
}
