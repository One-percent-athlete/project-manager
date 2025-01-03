import React, { FC } from 'react'

type Props = {
    isVisible: boolean
}

const Modal: FC<Props> = props => {

    const { isVisible } = props

    const modalJsx = (
        <div className="fixed place-content-center top-0 z-50 w-screen h-screen p-4 bg-[rgba(0,0,0,0.80)]"></div>
    )

  return isVisible ? modalJsx: <></>
}

export default Modal