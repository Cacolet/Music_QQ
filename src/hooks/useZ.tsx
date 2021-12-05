import {useRef} from 'react'
interface ICurrent {
    fn: any,
    timer: null | NodeJS.Timeout
}

const useThrottle = (fn: any, delay = 500) => {

    const {current} = useRef<ICurrent>({fn, timer: null})
    return function (...args: any[]) {
        // @ts-ignore
        let _this = this
        if (!current.timer) {   //n秒内一直触发，timer一直为null，就不会执行判断语句中的逻辑（关键）
            current.timer = setTimeout(() => {
                // @ts-ignore
                console.log(this)
                // @ts-ignore
                current.fn.apply(_this, args)
                    current.timer = null
            }, delay)
        }
    }
}

export default useThrottle
