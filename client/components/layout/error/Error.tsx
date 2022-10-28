import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store';
import { errorActions } from '../../../store/slices/errors-slice';
import classes from "./Error.module.css";

const ErrorBar = () => {
    const error:any = useSelector((state:RootState) => state.error);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        if(error.show) {
            setTimeout(() => {
                setHiding(true);
                setTimeout(() => {
                    dispatch(errorActions.HideError());
                    setHiding(false);
                }, 500);
            }, 3000);
        }
    }, [error.show]);

    if(error.show) {
        return (
            <div ref={wrapperRef} className={`${classes.wrapper} ${hiding ? classes.hiding : ''}`}>
                <p>{error.error}</p>
            </div>
        )
    } else return null;
}

export default ErrorBar